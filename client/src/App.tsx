import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Error,
  HomeLayout,
  Landing,
  Register,
  Login,
  Dashboard,
  AddAccount,
  UserspaceLayout,
} from './presentation/pages';
import { ToastContainer } from 'react-toastify';
import { Container } from './infrastructure/Container';

// actions
import { registerAction } from './presentation/pages/Register';
import { loginAction } from './presentation/pages/Login';
import { addAccountAction } from './presentation/pages/AddAccount';

// loaders
import { userspaceLayoutLoader } from './presentation/pages/UserspaceLayout';
import { dashboardLoader } from './presentation/pages/Dashboard';
import { addAccountLoader } from './presentation/pages/AddAccount';

const container = Container.getInstance();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'register', element: <Register />, action: registerAction(container) },
      { path: 'login', element: <Login />, action: loginAction(container) },
      {
        path: 'userspace',
        element: <UserspaceLayout />,
        loader: userspaceLayoutLoader(container),
        children: [
          { index: true, element: <Dashboard />, loader: dashboardLoader(container) },
          {
            path: 'add-account',
            element: <AddAccount />,
            loader: addAccountLoader(container),
            action: addAccountAction(container),
          },
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
