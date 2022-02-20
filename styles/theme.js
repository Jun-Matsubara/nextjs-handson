import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { orange, main } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: { main: '#212121' },
  },
});

export default theme;
