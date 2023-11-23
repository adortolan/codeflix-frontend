import { render } from '@testing-library/react';
import { appTheme } from './Theme';
import { ThemeProvider } from '@mui/material';

describe('ThemeProvider', () => {
  it('should be render', () => {
    render(<ThemeProvider theme={appTheme} />);
  });
});
