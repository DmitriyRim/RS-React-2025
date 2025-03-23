import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router';
import DetailsCard from './components/DetailsCard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:name',
    element: <DetailsCard />,
    loader: ({ params }) => params.name,
  },
]);

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
