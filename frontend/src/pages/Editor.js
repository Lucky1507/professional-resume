import React, { useState } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import FileUpload from '../components/FileUpload';
import ResumeForm from '../components/ResumeForm';
import DownloadMenu from '../components/DownloadMenu';
import { saveResume } from '../api';

const initialResumeData = {
  basicInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
};

const Editor = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileUpload = (parsedData) => {
    setResumeData(parsedData);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveResume(resumeData);
      alert('Resume saved successfully!');
    } catch (error) {
      alert('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Resume Editor</Typography>
      
      <FileUpload onFileUpload={handleFileUpload} />
      
      <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />

      {/* Hidden preview for PDF generation */}
      <div id="resume-preview" style={{ display: 'none', padding: '20px' }}>
        <Typography variant="h3">{resumeData.basicInfo.name}</Typography>
        <Typography paragraph>
          {resumeData.basicInfo.email} | {resumeData.basicInfo.phone} | {resumeData.basicInfo.address}
        </Typography>
        
        <Typography variant="h5" mt={2}>Summary</Typography>
        <Typography paragraph>{resumeData.basicInfo.summary}</Typography>
        
        <Typography variant="h5" mt={2}>Experience</Typography>
        {resumeData.experience.map((exp, index) => (
          <Box key={index} mb={2}>
            <Typography variant="h6">
              {exp.position} at {exp.company}
            </Typography>
            <Typography color="textSecondary" fontStyle="italic">
              {exp.duration}
            </Typography>
            <Typography paragraph>{exp.description}</Typography>
          </Box>
        ))}
        
        <Typography variant="h5" mt={2}>Education</Typography>
        {resumeData.education.map((edu, index) => (
          <Box key={index} mb={2}>
            <Typography variant="h6">
              {edu.degree} at {edu.institution}
            </Typography>
            <Typography color="textSecondary">
              {edu.year}
            </Typography>
          </Box>
        ))}
        
        <Typography variant="h5" mt={2}>Skills</Typography>
        <Box component="ul" pl={2}>
          {resumeData.skills.map((skill, index) => (
            <Typography component="li" key={index}>
              {skill.name}: {skill.level}
            </Typography>
          ))}
        </Box>
      </div>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Resume'}
        </Button>
        
        <DownloadMenu resumeData={resumeData} />
      </Box>
    </Container>
  );
};

export default Editor;