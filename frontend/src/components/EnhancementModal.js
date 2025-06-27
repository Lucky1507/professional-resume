import { Button, Box, Typography, Paper } from '@mui/material';

export default function EnhancementModal({ preview, onClose, onAccept }) {
  return (
    <Paper elevation={24} sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      p: 4,
      width: '80%',
      maxWidth: '700px',
      zIndex: 1300
    }}>
      <Typography variant="h6" gutterBottom>Review Enhancement</Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
        <Box>
          <Typography variant="subtitle1" color="text.secondary">Original</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {preview.original || "[Empty]"}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" color="primary">Enhanced</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {preview.enhanced}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={() => {
            onAccept(preview.field, preview.enhanced);
            onClose();
          }}
        >
          Use Enhanced Version
        </Button>
      </Box>
    </Paper>
  );
}