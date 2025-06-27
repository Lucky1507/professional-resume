import { useState } from 'react';
import { Menu, MenuItem, Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { generateDOCX } from 'utils/docsGenerator';
import { generatePDF } from 'utils/pdfGenerator';

export default function DownloadMenu({ resumeData }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'resume.json');
    link.click();
  };

  const handleDownloadDOCX = async () => {
    try {
      const blob = await generateDOCX(resumeData);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.docx';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('DOCX generation failed:', error);
      alert('Failed to generate DOCX file');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF('resume-preview');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF file');
    }
  };

  return (
    <Box>
      <Button 
        variant="contained" 
        startIcon={<DownloadIcon />}
        onClick={handleClick}
        aria-controls="download-menu"
      >
        Download Resume
      </Button>
      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleDownloadJSON(); handleClose(); }}>
          Download as JSON
        </MenuItem>
        <MenuItem onClick={() => { handleDownloadDOCX(); handleClose(); }}>
          Download as DOCX
        </MenuItem>
        <MenuItem onClick={() => { handleDownloadPDF(); handleClose(); }}>
          Download as PDF
        </MenuItem>
      </Menu>
    </Box>
  );
}