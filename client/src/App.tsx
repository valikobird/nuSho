import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  UserspaceLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
  Dashboard,
} from './pages';
import { ToastContainer } from 'react-toastify';

// actions
import { registerAction } from './pages/Register';
import { loginAction } from './pages/Login';

// loaders
import { userspaceLayoutLoader } from './pages/UserspaceLayout';
import { dashboardLoader } from './pages/Dashboard';

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
        path: 'userspace',
        element: <UserspaceLayout />,
        loader: userspaceLayoutLoader,
        children: [
          { index: true, element: <Dashboard />, loader: dashboardLoader },
        ],
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
