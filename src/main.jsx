import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // FIXED
import Navigation from './pages/navigation.jsx';
import Chefstart from './pages/Chefstart.jsx';
import Bmeter from './pages/bmeter2.jsx';
import Cookbuddy from './pages/Cookbuddy.jsx';
import Bmeter2 from './pages/bmeter3.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: (
      <div>
        <h1>404 not found!</h1>
      </div>
    ),
  },
  {
    path: '/navigation',
    element: <Navigation />,
  },

   {
    path: '/foodology',
    element: <Cookbuddy />,
  },

   {
    path: '/chefstart',
    element: <Chefstart />,
  },

   {
    path: '/bmeter',
    element: <Bmeter />,
  },
  {
    path:'/bmeter2',
    element:<Bmeter2/>
  }
  // Future route example:
  // {
  //   path: '/profile/:id',
  //   element: <ProfilePage />,
  // },
]);

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
);
