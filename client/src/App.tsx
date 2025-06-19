import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error, HomeLayout, Landing, Register } from './pages';
import { ToastContainer } from 'react-toastify';

// actions
import { registerAction } from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  );
};

export default App;
