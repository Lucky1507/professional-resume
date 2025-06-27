# Professional Resume Project

A modern resume application with React frontend and FastAPI backend.

## Project Structure
```resume-editor/
│
├── backend/
│ ├── pycache/ [PYTHON CACHE]
│ ├── venv/ [PYTHON VENV]
│ └── main.py [PYTHON]
│
├── frontend/
│ ├── node_modules/ [NODE]
│ ├── public/ [STATIC ASSETS]
│ └── src/
│ ├── components/
│ │ ├── Backdrop.js [REACT]
│ │ ├── DownloadMenu.js [REACT]
│ │ ├── FileUpload.js [REACT]
│ │ └── ResumeForm.js [REACT]
│ │
│ ├── pages/
│ │ └── Editor.js [REACT]
│ │
│ ├── utils/
│ │ ├── docsGenerator.js [JS]
│ │ ├── pdfGenerator.js [JS]
│ │ └── api.js [JS]
│ │
│ ├── App.css [CSS]
│ ├── App.js [REACT]
│ ├── App.test.js [JEST]
│ ├── index.css [CSS]
│ ├── index.js [REACT]
│ ├── logo.svg [SVG]
│ ├── reportWebVitals.js [JS]
│ └── setupTests.js [JEST]
│
├── .gitignore [GIT]
├── jsconfig.json [JS CONFIG]
├── package-lock.json[NPM]
└── package.json [NPM]
```

## Setup Instructions

### Frontend (React)
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
4. The app will be available at `http://localhost:3000`

### Backend (FastAPI)
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
5. The API will be available at `http://localhost:8000`



