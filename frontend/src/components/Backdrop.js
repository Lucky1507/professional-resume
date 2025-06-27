import { Box } from '@mui/material';
   
export default function Backdrop({ open, onClick }) {
  return open ? (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1200
    }} onClick={onClick} />
  ) : null;
}