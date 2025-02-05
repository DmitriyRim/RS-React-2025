import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import DetailsCard from './components/DetailsCard/DetailsCard.tsx';

import { detailsLoader, rootLoader } from './services/api.ts';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: rootLoader,
    children: [
      {
        path: '/:id',
        element: <DetailsCard />,
        loader: detailsLoader,
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
