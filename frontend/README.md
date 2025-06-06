#  Resume Analyzer - Frontend

The frontend for  Resume Analyzer built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Overview

The frontend provides a modern, responsive user interface for the  Resume Analyzer. It allows users to upload resumes, view AI-powered analysis, and manage previously uploaded resumes through an intuitive interface.

## ✨ Features

- **Two-Tab Interface**: Upload new resumes or browse previously uploaded ones
- **Resume Upload**: Simple drag-and-drop or file selection interface
- **AI Analysis Visualization**: Clean display of AI-generated insights including strengths, improvement areas, and potential roles
- **Resume Details View**: Organized sections for education, work experience, skills, projects, certifications, and awards
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Animated UI Elements**: Smooth transitions and animations for better user experience
- **Error Handling**: Comprehensive error states and loading indicators

## 🛠️ Tech Stack

- **Next.js**: React framework for server-side rendering and static generation
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Framer Motion**: Animation library for React
- **Axios**: HTTP client for API requests
- **Lucide Icons**: Beautiful, consistent icon set

## 📁 Project Structure

```
frontend/
├── components/           # React components
│   ├── ui/               # UI components from shadcn/ui
│   ├── display.tsx       # Main display component with tabs
│   └── ResumeDetails.tsx # Resume details visualization
├── types/                # TypeScript type definitions
│   └── resume.ts         # Resume-related type definitions
├── public/               # Static files
├── styles/               # Global styles
├── pages/                # Next.js pages
├── lib/                  # Utility functions
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📝 Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## 🧩 Key Components

### Display Component (`display.tsx`)
The main component that handles the tab interface, resume uploads, and history view.

### ResumeDetails Component (`ResumeDetails.tsx`)
A reusable component for displaying detailed resume information with animations and organized sections.

## 📦 Dependencies

Major dependencies include:

- **next**: ^13.4.0
- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **typescript**: ^5.0.4
- **tailwindcss**: ^3.3.2
- **axios**: ^1.4.0
- **framer-motion**: ^10.12.8
- **lucide-react**: ^0.244.0
- **@radix-ui/react-***: Various Radix UI components

For a complete list, see `package.json`.

## 🧪 Testing

Run tests with:

```bash
npm run test
# or
yarn test
```

## 🔍 Code Quality

Maintain code quality with ESLint and Prettier:

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

## 🚀 Deployment

Build the production version:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm run start
# or
yarn start
```
