'use client';
import { createTheme, } from '@mui/material/styles';
import { colorSchemes, typography, shadows, shape } from './theme/themePrimitives';
import { inputsCustomizations } from './theme/inputs';
import { dataDisplayCustomizations } from './theme/dataDisplay';
import { feedbackCustomizations } from './theme/feedback';
import { navigationCustomizations } from './theme/navigation';
import { surfacesCustomizations } from './theme/surfaces';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    ...inputsCustomizations,
    ...surfacesCustomizations,
    ...navigationCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations
  },
  colorSchemes, 
  shape
});

export default theme;
