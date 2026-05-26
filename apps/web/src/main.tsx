import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/scss/base.scss';
import '@fontsource/plus-jakarta-sans/300.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/router';
import { Provider } from 'react-redux';
import { appStore } from '@/app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>,
);
