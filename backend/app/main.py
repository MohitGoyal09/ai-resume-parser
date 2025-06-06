import logging
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints import resume as resume_v1_router

# Configure basic logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


app = FastAPI(
    title="DeepKlarity Resume Analyzer API",
    version="0.1.1",
    description="API to upload resumes, extract information using LLM, store, and get analysis.",
)

# CORS (Cross-Origin Resource Sharing)

origins = [
    "http://localhost:3000",  
    "http://localhost:3001",
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    
    error_details = []
    for error in exc.errors():
        field = " -> ".join(str(loc) for loc in error['loc'])
        error_details.append({"location": field, "message": error['msg'], "type": error['type']})
    
    logger.warning(f"Request validation error: {error_details} for request: {request.method} {request.url}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Validation Error", "errors": error_details},
    )


app.include_router(resume_v1_router.router, prefix="/api/v1/resumes", tags=["Resumes API V1"])

@app.get("/", tags=["Root"], summary="Root endpoint for API health check or welcome message")
async def read_root():
    logger.info("Root endpoint accessed.")
    return {"message": "Welcome to the DeepKlarity Resume Analyzer API. Visit /docs for API documentation."}

@app.get("/health", tags=["Health Check"], summary="Performs a basic health check of the API")
async def health_check():
    logger.info("Health check endpoint accessed.")
    return {"status": "ok", "message": "API is running"}

