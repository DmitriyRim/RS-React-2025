import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/uncontrolled',
        element: <h1>uncontrolled</h1>,
      },
      {
        path: '/controlled',
        element: <h1>controlled</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
