import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import UncontrolledForm from './pages/UncontrolledForm.tsx';
import ControlledForm from './pages/ControlledForm.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import CardList from './pages/CardList.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <CardList />,
      },
      {
        path: '/uncontrolled',
        element: <UncontrolledForm />,
      },
      {
        path: '/controlled',
        element: <ControlledForm />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
