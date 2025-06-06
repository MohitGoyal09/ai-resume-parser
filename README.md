#  Resume Analyzer

A modern web application for analyzing and managing resumes with AI-powered insights.

![Resume Analyzer](https://via.placeholder.com/800x400?text=Resume+Analyzer)

## 🚀 Overview

Resume Analyzer is a comprehensive tool designed to streamline the resume review process. The application allows users to upload resumes, automatically extracts key information, and provides AI-powered analysis and insights. With a clean, modern interface, users can easily manage and review multiple resumes.

### Key Features

- **Resume Upload & Processing**: Upload PDF or DOCX resumes for automatic information extraction
- **AI-Powered Analysis**: Get detailed feedback, strengths, improvement areas, and potential role matches
- **Resume Management**: View, search, and manage all previously uploaded resumes
- **Detailed Resume Visualization**: Clean, organized display of resume information with interactive elements
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🏗️ Architecture

The project follows a modern client-server architecture:

- **Frontend**: Next.js React application with TypeScript
- **Backend**: FastAPI Python application
- **Database**: SQL database for resume storage and retrieval

```
ai-resume-parser/
├── backend/         
├── frontend/        
└── README.md        
```

## 🛠️ Tech Stack

### Frontend

- **Next.js**: React framework for server-side rendering and static generation
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Framer Motion**: Animation library for React
- **Axios**: HTTP client for API requests

### Backend

- **FastAPI**: Modern, fast web framework for building APIs with Python
- **Pydantic**: Data validation and settings management
- **SQLAlchemy**: SQL toolkit and ORM
- **PyPDF2/docx2txt**: PDF and DOCX parsing libraries
- **LLM Integration**: AI-powered resume analysis

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- npm or yarn
- pip

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MohitGoyal09/ai-resume-parser
cd ai-resume-parser
```

2. Set up the frontend (see [Frontend README](./frontend/README.md) for detailed instructions):

```bash
cd frontend
npm install
npm run dev
```

3. Set up the backend (see [Backend README](./backend/README.md) for detailed instructions):

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

4. Open your browser and navigate to `http://localhost:3000`

## 📋 API Documentation

The API documentation is available at `http://127.0.0.1:8000/docs` when the backend server is running.

### Key Endpoints

- `POST /api/v1/resumes/upload`: Upload and process a resume
- `GET /api/v1/resumes/`: List all resumes
- `GET /api/v1/resumes/{resume_id}`: Get details of a specific resume

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


