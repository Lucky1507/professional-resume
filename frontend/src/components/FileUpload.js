import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Mock parsing - in a real app, you'd send to backend for parsing
      setTimeout(() => {
        const mockResumeData = {
          basicInfo: {
            name: "John Doe",
            email: "john@example.com",
            phone: "(123) 456-7890",
            summary: "Experienced software developer with 5+ years in web development."
          },
          experience: [
            {
              company: "Tech Corp",
              position: "Senior Developer",
              duration: "2020-Present",
              description: "Led team of developers in building web applications."
            }
          ],
          education: [],
          skills: []
        };
        onFileUpload(mockResumeData);
      }, 1500);
    }
  };

  return (
    <Box sx={{ p: 3, border: '1px dashed grey', textAlign: 'center' }}>
      <input
        accept=".pdf,.docx"
        style={{ display: 'none' }}
        id="resume-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="resume-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Resume
        </Button>
      </label>
      {file && (
        <Typography sx={{ mt: 2 }}>
          Uploaded: {file.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;