import { Grid } from '@mui/material';
import { styled } from '@mui/system';

const AppointmentsGrid = styled(Grid)({
  maxHeight: '11vh',
  minHeight: '11vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f6f6f6',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888', 
    borderRadius: '5px',
    border: '2px solid #f1f1f1',
  }
});

export default AppointmentsGrid;