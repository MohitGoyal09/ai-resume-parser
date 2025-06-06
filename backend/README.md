#  Resume Analyzer - Backend

The backend API for Resume Analyzer built with FastAPI, Python, and AI integration.



## 🚀 Overview

The backend provides a robust API for the  Resume Analyzer. It handles resume uploads, information extraction, AI-powered analysis, and data storage. Built with FastAPI, it offers high performance, automatic OpenAPI documentation, and strong typing through Pydantic.

## ✨ Features

- **Resume Processing**: Extract structured information from PDF and DOCX resumes
- **AI Analysis**: Generate insights, feedback, and recommendations using LLM integration
- **RESTful API**: Clean, consistent API endpoints following REST principles
- **Data Persistence**: Store and retrieve resume data efficiently
- **Automatic Documentation**: Interactive API documentation with Swagger UI
- **Type Safety**: Strong typing with Pydantic models
- **Async Support**: High-performance asynchronous request handling
- **Error Handling**: Comprehensive error responses and status codes

## 🛠️ Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs with Python
- **Pydantic**: Data validation and settings management
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping
- **Alembic**: Database migration tool
- **PyPDF2/docx2txt**: PDF and DOCX parsing libraries
- **LangChain**: AI integration for resume analysis
- **Uvicorn**: ASGI server for running the application
- **Python 3.9+**: Modern Python features



## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- pip
- Virtual environment (recommended)

### Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv\Scripts\activate 
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Set up environment variables (create a `.env` file):

```
DATABASE_URL=sqlite:///./app.db
GEMINI_API_KEY=your_api_key
```

5. Run database migrations:

```bash
alembic upgrade head
```

6. Start the development server:

```bash
uvicorn app.main:app --reload
```

7. Access the API documentation at `http://127.0.0.1:8000/docs`

## 📋 API Endpoints

### Resumes

- **POST /api/v1/resumes/upload**
  - Upload and process a resume
  - Accepts PDF or DOCX files
  - Returns extracted information and AI analysis

- **GET /api/v1/resumes/**
  - List all resumes
  - Supports pagination and filtering

- **GET /api/v1/resumes/{resume_id}**
  - Get detailed information about a specific resume

## 🧠 AI Integration

The backend integrates with language models to provide:

1. **Resume Rating**: Overall score based on resume quality
2. **Strength Analysis**: Identification of key strengths
3. **Improvement Suggestions**: Areas that could be enhanced
4. **Role Matching**: Potential job roles that match the resume
5. **Skill Gap Analysis**: Recommendations for skill development

## 📦 Dependencies

Major dependencies include:

- **fastapi**: ^0.95.0
- **pydantic**: ^1.10.7
- **sqlalchemy**: ^2.0.9
- **alembic**: ^1.10.3
- **python-multipart**: For handling file uploads
- **pypdf2**: For PDF parsing
- **docx2txt**: For DOCX parsing
- **langchain**: For AI integration
- **Gemini**: For accessing  Google Gemini API

For a complete list, see `requirements.txt`.


