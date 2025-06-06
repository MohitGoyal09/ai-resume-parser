from . import schemas
from sqlalchemy.orm import Session
from . import models
from typing import Optional, List
import logging

logger = logging.getLogger(__name__)

# Get a resume by its ID
def get_resume_by_id(db: Session, resume_id: int) -> Optional[models.Resume]:
    try:
        return db.query(models.Resume).filter(models.Resume.id == resume_id).first()
    except Exception as e:
        logger.error(f"Error fetching resume by ID {resume_id}: {e}", exc_info=True)
        return None

# Get all resumes, ordered by upload date
def get_all_resumes(db: Session, skip: int = 0, limit: int = 100) -> List[models.Resume]:
    try:
        return db.query(models.Resume).order_by(models.Resume.uploaded_at.desc()).offset(skip).limit(limit).all()
    except Exception as e:
        logger.error(f"Error fetching all resumes: {e}", exc_info=True)
        return []

# Create a new resume entry
def create_resume_entry(
    db: Session,
    filename: str,
    raw_text: str,
    extracted_data: Optional[schemas.ResumeExtractedData],
    llm_analysis_data: Optional[schemas.LLMAnalysisSchema]
) -> Optional[models.Resume]:
    try:
        db_resume = models.Resume(
            filename=filename,
            raw_text=raw_text,
            contact_info=extracted_data.contact_info.model_dump(exclude_none=True) if extracted_data and extracted_data.contact_info else None,
            summary=extracted_data.summary if extracted_data else None,
            work_experience=[exp.model_dump(exclude_none=True) for exp in extracted_data.work_experience] if extracted_data and extracted_data.work_experience else [],
            education=[edu.model_dump(exclude_none=True) for edu in extracted_data.education] if extracted_data and extracted_data.education else [],
            skills=extracted_data.skills.model_dump(exclude_none=True) if extracted_data and extracted_data.skills else None,
            projects=[proj.model_dump(exclude_none=True) for proj in extracted_data.projects] if extracted_data and extracted_data.projects else [],
            certifications=[cert.model_dump(exclude_none=True) for cert in extracted_data.certifications] if extracted_data and extracted_data.certifications else [],
            awards=[award.model_dump(exclude_none=True) for award in extracted_data.awards] if extracted_data and extracted_data.awards else [],
            llm_analysis=llm_analysis_data.model_dump(exclude_none=True) if llm_analysis_data else None
        )
        db.add(db_resume)
        db.commit()
        db.refresh(db_resume)
        return db_resume
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating resume entry for {filename}: {e}", exc_info=True)
        return None