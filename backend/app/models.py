from sqlalchemy import Column, Integer, String, DateTime, JSON, Text
from sqlalchemy.sql import func
from .database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    raw_text = Column(Text, nullable=True)
    
    contact_info = Column(JSON, nullable=True)
    summary = Column(Text, nullable=True)
    work_experience = Column(JSON, nullable=True)
    education = Column(JSON, nullable=True)
    skills = Column(JSON, nullable=True)
    projects = Column(JSON, nullable=True)
    certifications = Column(JSON, nullable=True)
    awards = Column(JSON, nullable=True)
    
    llm_analysis = Column(JSON, nullable=True)

    def __repr__(self):
        return f"<Resume(id={self.id}, filename='{self.filename}')>"