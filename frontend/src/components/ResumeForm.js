import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import EnhancementModal from './EnhancementModal';

const API_BASE_URL = 'http://localhost:8000';

const ResumeSection = ({ title, fields, data, onUpdate, onAdd, onRemove }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementPreview, setEnhancementPreview] = useState(null);

  const handleEnhance = async (fieldName) => {
    if (!data[fieldName]?.trim()) {
      alert("Please enter some text to enhance");
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ai-enhance`,
        {
          section: fieldName,
          content: data[fieldName].trim()
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );

      if (!response.data?.enhanced_content) {
        throw new Error("Invalid response format from server");
      }

      setEnhancementPreview({
        original: data[fieldName],
        enhanced: response.data.enhanced_content,
        field: fieldName
      });
      
    } catch (error) {
      console.error("Enhancement error:", {
        error: error.response?.data || error.message,
        request: error.config
      });
      alert(`Enhancement failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        {fields.map((field) => (
          <Box key={field.name} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                label={field.label}
                value={data[field.name] || ''}
                onChange={(e) => onUpdate({ ...data, [field.name]: e.target.value })}
                multiline={field.multiline}
                rows={field.rows || 1}
              />
              <Button 
                onClick={() => handleEnhance(field.name)}
                disabled={isEnhancing}
                sx={{ ml: 1 }}
                startIcon={isEnhancing ? <CircularProgress size={20} /> : null}
              >
                {isEnhancing ? 'Enhancing...' : 'Enhance'}
              </Button>
            </Box>
          </Box>
        ))}
        {onAdd && (
          <Button onClick={onAdd} startIcon={<AddIcon />}>
            Add {title.slice(0, -1)}
          </Button>
        )}
      </Paper>

      {enhancementPreview && (
        <EnhancementModal
          preview={enhancementPreview}
          onClose={() => setEnhancementPreview(null)}
          onAccept={(field, enhancedText) => {
            onUpdate({ ...data, [field]: enhancedText });
          }}
        />
      )}
    </>
  );
};

const ResumeForm = ({ resumeData, setResumeData }) => {
  const handleBasicInfoUpdate = (newData) => {
    setResumeData({ ...resumeData, basicInfo: newData });
  };

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: '',
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };

  const handleUpdateExperience = (index, newData) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = newData;
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      year: '',
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };

  const handleUpdateEducation = (index, newData) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = newData;
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      level: '',
    };
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });
  };

  const handleUpdateSkill = (index, newData) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = newData;
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  return (
    <Box>
      <ResumeSection
        title="Basic Information"
        fields={[
          { name: 'name', label: 'Full Name' },
          { name: 'email', label: 'Email' },
          { name: 'phone', label: 'Phone' },
          { name: 'address', label: 'Address' },
          { name: 'summary', label: 'Professional Summary', multiline: true, rows: 4 },
        ]}
        data={resumeData.basicInfo}
        onUpdate={handleBasicInfoUpdate}
      />

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Experience</Typography>
        {resumeData.experience.map((exp, index) => (
          <Paper key={exp.id} elevation={1} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Experience #{index + 1}</Typography>
              <IconButton onClick={() => handleRemoveExperience(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <ResumeSection
              title=""
              fields={[
                { name: 'company', label: 'Company' },
                { name: 'position', label: 'Position' },
                { name: 'duration', label: 'Duration' },
                { name: 'description', label: 'Description', multiline: true, rows: 3 },
              ]}
              data={exp}
              onUpdate={(newData) => handleUpdateExperience(index, newData)}
            />
          </Paper>
        ))}
        <Button onClick={handleAddExperience} startIcon={<AddIcon />}>
          Add Experience
        </Button>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Education</Typography>
        {resumeData.education.map((edu, index) => (
          <Paper key={edu.id} elevation={1} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Education #{index + 1}</Typography>
              <IconButton onClick={() => handleRemoveEducation(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <ResumeSection
              title=""
              fields={[
                { name: 'institution', label: 'Institution' },
                { name: 'degree', label: 'Degree' },
                { name: 'year', label: 'Year' },
              ]}
              data={edu}
              onUpdate={(newData) => handleUpdateEducation(index, newData)}
            />
          </Paper>
        ))}
        <Button onClick={handleAddEducation} startIcon={<AddIcon />}>
          Add Education
        </Button>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Skills</Typography>
        {resumeData.skills.map((skill, index) => (
          <Paper key={skill.id} elevation={1} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Skill #{index + 1}</Typography>
              <IconButton onClick={() => handleRemoveSkill(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <ResumeSection
              title=""
              fields={[
                { name: 'name', label: 'Skill Name' },
                { name: 'level', label: 'Proficiency Level' },
              ]}
              data={skill}
              onUpdate={(newData) => handleUpdateSkill(index, newData)}
            />
          </Paper>
        ))}
        <Button onClick={handleAddSkill} startIcon={<AddIcon />}>
          Add Skill
        </Button>
      </Paper>
    </Box>
  );
};

export default ResumeForm;