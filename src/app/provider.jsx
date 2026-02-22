'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from 'next-themes';

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <ReduxProvider>{children}</ReduxProvider>
    </ThemeProvider>
  );
}
