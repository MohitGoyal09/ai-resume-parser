#  Resume Analyzer

A modern web application for analyzing and managing resumes with AI-powered insights.

![image](https://github.com/user-attachments/assets/4729d54b-71f8-4cf8-a246-5c4f38ab3743)
![WhatsApp Image 2025-06-06 at 17 17 09_a2008e29](https://github.com/user-attachments/assets/ecae5861-021c-4c45-a4cd-0b10cdd8d4e6)



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
├── sample/    
└── README.md        
```
## Demo 
![image](https://github.com/user-attachments/assets/51e62ad9-05ff-413c-a80e-bbc002ea9d3b)
![image](https://github.com/user-attachments/assets/ae91684e-4b61-4955-93ff-124718bb471a)
![image](https://github.com/user-attachments/assets/30a6ac58-0118-4e13-a292-5b2491c92043)
![image](https://github.com/user-attachments/assets/33ecf16a-3e9a-4ca4-a614-5280e4c3d1cb)
![image](https://github.com/user-attachments/assets/118f763d-926b-4d8a-935d-f3e2fb14c85a)






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


