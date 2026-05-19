import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from '@/layouts/Dashboard/Dashboard';
import '@/scss/base.scss';
import '@fontsource/plus-jakarta-sans/300.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
);
