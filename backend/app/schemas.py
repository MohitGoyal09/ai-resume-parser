
from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    validator,
    HttpUrl as PydanticHttpUrl
)
from typing import List, Optional, Dict, Any
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# --- URL Normalization Helper Function ---
def _normalize_url_field(v: Optional[str], field_name: str) -> Optional[str]:
    """
    Attempts to normalize a string into a valid URL or returns None if not possible
    or if it's a recognized placeholder.
    """
    if v is None:
        return None

    original_value = v
    v = v.strip()
    v_lower = v.lower()

    # Common placeholders that are definitely not URLs
    non_url_placeholders = [
        "live", "github", "n/a", "none", "", "see project", "view live", 
        "view github", "live demo", "source code", "repository", "live site"
    ]
    if v_lower in non_url_placeholders:
        logger.debug(f"Field '{field_name}': Value '{original_value}' recognized as non-URL placeholder, converting to None.")
        return None

    # If it already has a scheme, try to validate it as is
    if v.startswith(('http://', 'https://')):
        try:
            PydanticHttpUrl(v)
            return v
        except ValueError:
            logger.warning(f"Field '{field_name}': Value '{original_value}' starts with scheme but is not a valid HttpUrl, converting to None.")
            return None # Invalid full URL

    # If no scheme, but contains a dot (common for domains/paths)
    if '.' in v:
        if ' ' in v or len(v) < 4 or v.count('.') > 5 :
             logger.debug(f"Field '{field_name}': Value '{original_value}' contains '.' but seems like non-URL content, keeping as string or converting to None if strict.")
             pass # Let it fall through to HttpUrl check below after prepending

        potential_url = f"https://{v}"
        try:
            PydanticHttpUrl(potential_url) 
            logger.debug(f"Field '{field_name}': Value '{original_value}' prepended with https:// to form '{potential_url}'.")
            return potential_url
        except ValueError:
            logger.warning(f"Field '{field_name}': Value '{original_value}' (tried as '{potential_url}') is not a valid HttpUrl, converting to None.")
            return None 

    # If it doesn't look like a URL at all (no scheme, no dot, or failed previous checks)
    logger.debug(f"Field '{field_name}': Value '{original_value}' does not appear to be a URL, converting to None.")
    return None


# --- Nested Schemas for Structured Data Extraction ---
class ContactInfoSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio_url: Optional[str] = None
    address: Optional[str] = None

    @validator('linkedin', pre=True, always=True)
    def normalize_linkedin_url(cls, v: Optional[str]) -> Optional[str]:
        return _normalize_url_field(v, 'linkedin')

    @validator('github', pre=True, always=True)
    def normalize_github_url(cls, v: Optional[str]) -> Optional[str]:
        return _normalize_url_field(v, 'github')

    @validator('portfolio_url', pre=True, always=True)
    def normalize_portfolio_url(cls, v: Optional[str]) -> Optional[str]:
        return _normalize_url_field(v, 'portfolio_url')

class ProjectItemSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    technologies_used: List[str] = Field(default_factory=list)
    link: Optional[str] = None
    repo_link: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

    @validator('link', pre=True, always=True)
    def normalize_project_link_url(cls, v: Optional[str]) -> Optional[str]:
        return _normalize_url_field(v, 'project link')

    @validator('repo_link', pre=True, always=True)
    def normalize_project_repo_link_url(cls, v: Optional[str]) -> Optional[str]:
        return _normalize_url_field(v, 'project repo_link')


class SkillItemSchema(BaseModel):
    name: str
    proficiency: Optional[str] = None

class SkillSetSchema(BaseModel):
    technical: List[SkillItemSchema] = Field(default_factory=list)
    soft: List[str] = Field(default_factory=list)
    tools: List[SkillItemSchema] = Field(default_factory=list)
    languages: List[Dict[str, str]] = Field(default_factory=list)

class EducationItemSchema(BaseModel):
    institution: Optional[str] = None
    degree: Optional[str] = None
    major: Optional[str] = None
    graduation_date: Optional[str] = None
    gpa: Optional[str] = None
    location: Optional[str] = None
    relevant_coursework: List[str] = Field(default_factory=list)

class WorkExperienceItemSchema(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    duration_months: Optional[int] = None
    responsibilities: List[str] = Field(default_factory=list)
    achievements: List[str] = Field(default_factory=list)

class CertificationItemSchema(BaseModel):
    name: Optional[str] = None
    issuing_organization: Optional[str] = None
    issue_date: Optional[str] = None
    expiration_date: Optional[str] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None

    @validator('credential_url', pre=True, always=True)
    def normalize_credential_url(cls, v: Optional[str]) -> Optional[str]:
        return _normalize_url_field(v, 'credential_url')


class AwardItemSchema(BaseModel):
    name: Optional[str] = None
    issuer: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None


# --- LLM Analysis Schemas ---
class UpskillSuggestionItemSchema(BaseModel):
    skill: str
    reason: str
    resources: List[str] = Field(default_factory=list)

class LLMAnalysisSchema(BaseModel):
    resume_rating: Optional[float] = Field(None, ge=1, le=10)
    overall_feedback: Optional[str] = None
    strength_areas: List[str] = Field(default_factory=list)
    improvement_areas: List[str] = Field(default_factory=list)
    upskill_suggestions: List[UpskillSuggestionItemSchema] = Field(default_factory=list)
    suggested_keywords_for_ats: List[str] = Field(default_factory=list)
    potential_roles: List[str] = Field(default_factory=list)

# --- Main Resume Schema for data parsed by LLM ---
class ResumeExtractedData(BaseModel):
    contact_info: Optional[ContactInfoSchema] = None
    summary: Optional[str] = None
    work_experience: List[WorkExperienceItemSchema] = Field(default_factory=list)
    education: List[EducationItemSchema] = Field(default_factory=list)
    skills: Optional[SkillSetSchema] = None
    projects: List[ProjectItemSchema] = Field(default_factory=list)
    certifications: List[CertificationItemSchema] = Field(default_factory=list)
    awards: List[AwardItemSchema] = Field(default_factory=list)

# --- API Response Schemas ---
class ResumeReadSchema(BaseModel):
    id: int
    filename: str
    uploaded_at: datetime
    raw_text: Optional[str] = None

    contact_info: Optional[ContactInfoSchema] = None
    summary: Optional[str] = None
    work_experience: List[WorkExperienceItemSchema] = Field(default_factory=list)
    education: List[EducationItemSchema] = Field(default_factory=list)
    skills: Optional[SkillSetSchema] = None
    projects: List[ProjectItemSchema] = Field(default_factory=list)
    certifications: List[CertificationItemSchema] = Field(default_factory=list)
    awards: List[AwardItemSchema] = Field(default_factory=list)
    llm_analysis: Optional[LLMAnalysisSchema] = None

    class Config:
        from_attributes = True

class ResumeListDetailSchema(BaseModel):
    id: int
    filename: str
    uploaded_at: datetime
    name: Optional[str] = None
    email: Optional[EmailStr] = None

    class Config:
        from_attributes = True