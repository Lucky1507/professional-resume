import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const enhanceWithAI = async (section, content) => {
  try {
    const response = await API.post('/ai-enhance', {
      section,
      content,
    });
    return response.data.enhanced_content;
  } catch (error) {
    console.error('AI enhancement failed:', error);
    return content; // Return original if enhancement fails
  }
};

export const saveResume = async (resumeData) => {
  try {
    const response = await API.post('/save-resume', resumeData);
    return response.data;
  } catch (error) {
    console.error('Save failed:', error);
    throw error;
  }
};