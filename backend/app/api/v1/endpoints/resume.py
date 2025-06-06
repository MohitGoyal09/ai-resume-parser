from app import crud, llm_services, resume_parser
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from app import schemas
from app.database import get_db

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/upload", response_model=schemas.ResumeReadSchema, status_code=status.HTTP_201_CREATED)
async def upload_and_process_resume(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file uploaded or filename missing.")
    
    if not llm_services.llm:
        logger.error("LLM service accessed but not available (GEMINI_API_KEY missing or init failed).")
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="LLM service is not available. Please check configuration.")

    logger.info(f"Processing uploaded file: {file.filename}, content type: {file.content_type}")
    contents = await file.read()
    
    try:
        raw_text = resume_parser.extract_text_from_resume(file.filename, contents)
        if not raw_text or len(raw_text.strip()) < 30: # Check for meaningful text
             logger.warning(f"Could not extract sufficient text from resume: {file.filename}. Text length: {len(raw_text.strip())}")
             # Still try to save raw text if possible
             crud.create_resume_entry(db, filename=file.filename, raw_text=raw_text or "Extraction failed or empty", extracted_data=None, llm_analysis_data=None)
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not extract sufficient text. File might be empty, image-only, or password-protected.")
    except ValueError as e: # From unsupported file type or encoding
        logger.warning(f"Unsupported file type or encoding for {file.filename}: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error during text extraction for {file.filename}: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error processing resume file during text extraction.")

    logger.info(f"Extracted raw text (first 200 chars) for {file.filename}: {raw_text[:200]}...")
    
    extracted_data: Optional[schemas.ResumeExtractedData] = await llm_services.extract_structured_data_from_text(raw_text)
    if not extracted_data:
        logger.error(f"LLM failed to extract structured data for {file.filename}.")
        # Save raw text even if extraction fails
        crud.create_resume_entry(db, filename=file.filename, raw_text=raw_text, extracted_data=None, llm_analysis_data=None)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="LLM failed to extract structured data. Raw text has been saved.")
    
    logger.info(f"Successfully extracted structured data for {file.filename}.")
    
    llm_analysis: Optional[schemas.LLMAnalysisSchema] = await llm_services.analyze_resume_with_llm(extracted_data)
    if not llm_analysis:
        logger.warning(f"LLM analysis failed for {file.filename}, but structured data was extracted.")
        # Proceed with saving, llm_analysis will be null

    db_resume = crud.create_resume_entry(
        db=db, 
        filename=file.filename,
        raw_text=raw_text,
        extracted_data=extracted_data,
        llm_analysis_data=llm_analysis
    )
    
    if not db_resume:
        logger.error(f"Failed to save processed resume data to database for {file.filename}.")
        # db.rollback() is handled in crud if an exception occurred there
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save processed resume data to database.")
            
    logger.info(f"Resume {file.filename} (ID: {db_resume.id}) processed and saved successfully.")
    return schemas.ResumeReadSchema.model_validate(db_resume)


@router.get("/", response_model=List[schemas.ResumeListDetailSchema])
async def list_resumes(
    skip: int = 0, limit: int = 20, 
    db: Session = Depends(get_db)
):
    resumes_db = crud.get_all_resumes(db, skip=skip, limit=limit)
    if resumes_db is None: 
        return []
        
    results = []
    for r_db in resumes_db:
        name = r_db.contact_info.get("name") if isinstance(r_db.contact_info, dict) else None
        email = r_db.contact_info.get("email") if isinstance(r_db.contact_info, dict) else None
        results.append(schemas.ResumeListDetailSchema(
            id=r_db.id,
            filename=r_db.filename,
            uploaded_at=r_db.uploaded_at,
            name=name,
            email=email,
        ))
    return results


@router.get("/{resume_id}", response_model=schemas.ResumeReadSchema)
async def get_resume_details(
    resume_id: int, 
    db: Session = Depends(get_db)
):
    db_resume = crud.get_resume_by_id(db, resume_id=resume_id)
    if db_resume is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found")
    
    # Use model_validate for SQLAlchemy ORM instance to Pydantic model conversion
    return schemas.ResumeReadSchema.model_validate(db_resume)