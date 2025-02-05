import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { rootLoader } from './services/api.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: rootLoader,
    children: [
      {
        path: '/:id',
        element: 'DetailsCard',
      },
    ],
  },
]);

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
