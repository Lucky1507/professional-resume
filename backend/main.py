from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
    expose_headers=["*"]
)

class EnhancementRequest(BaseModel):
    section: str
    content: str

class EnhancementResponse(BaseModel):
    enhanced_content: str
    status: str = "success"

resumes_db = {}

@app.post("/ai-enhance", response_model=EnhancementResponse)
async def ai_enhance(request: EnhancementRequest):
    try:
        section = request.section.lower()
        content = request.content.strip()
        
        if not content:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Content cannot be empty"
            )

        enhancement_rules = {
            "summary": [
                (r"(?i)i (?:work|am working) at ([\w]+)", "Experienced professional at \\1 with expertise in"),
                (r"(?i)good at", "Highly skilled in"),
                (r"(?i)made", "Developed and implemented"),
                (r"(?i)did", "Successfully executed")
            ],
            "experience": [
                (r"(?i)worked on", "Led development of"),
                (r"(?i)responsible for", "Spearheaded"),
                (r"(?i)helped with", "Collaborated on"),
                (r"(?i)made", "Designed and implemented")
            ],
            "skills": [
                (r"(?i)know", "Certified in"),
                (r"(?i)basic", "Advanced"),
                (r"(?i)good", "Expert-level"),
                (r"(?i)familiar", "Proficient in")
            ]
        }

        enhanced = content
        enhanced = re.sub(r"\bi\b", "I", enhanced)  # Fix capitalization
        enhanced = re.sub(r"\b(i|me|my)\b", "my professional", enhanced, flags=re.IGNORECASE)


        for pattern, replacement in enhancement_rules.get(section, []):
            enhanced = re.sub(pattern, replacement, enhanced, flags=re.IGNORECASE)
        
        if section == "summary":
            enhanced += ". Bringing measurable results through innovative solutions."
        elif section == "experience":
            enhanced += ", achieving significant improvements in efficiency and productivity."
        elif section == "skills":
            enhanced += ", with demonstrated success in real-world applications."

        # Ensure proper capitalization
        enhanced = enhanced[0].upper() + enhanced[1:] if enhanced else enhanced
        
        return {"enhanced_content": enhanced}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.post("/save-resume")
async def save_resume(resume_data: Dict[str, Any]):
    resume_id = str(len(resumes_db) + 1)
    resumes_db[resume_id] = resume_data
    return {"status": "success", "resume_id": resume_id}

@app.get("/get-resume/{resume_id}")
async def get_resume(resume_id: str):
    if resume_id not in resumes_db:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resumes_db[resume_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)