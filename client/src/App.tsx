import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
} from './pages';
import { ToastContainer } from 'react-toastify';

// actions
import { registerAction } from './pages/Register';
import { loginAction } from './pages/Login';

// loaders
import { dashboardLayoutLoader } from './pages/DashboardLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'register', element: <Register />, action: registerAction },
      { path: 'login', element: <Login />, action: loginAction },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLayoutLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
