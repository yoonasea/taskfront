import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f4f8', // Light grey-blue background
    },
    text: {
      primary: '#333333', // Dark grey text
      secondary: '#555555', // Medium grey text
    },
    primary: {
      main: '#4caf50', // Soothing green for primary actions
    },
    secondary: {
      main: '#81c784', // Light green for secondary actions
    },
  },
});

export default theme;
