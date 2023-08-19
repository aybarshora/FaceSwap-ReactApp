import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main/Main';
import ThankYou from './pages/ThankYou/ThankYou';
import Forms from './pages/Forms/Forms';
import { GlobalProvider } from './components/GlobalVariable/GlobalProvider';

import {
  createBrowserRouter,
  Form,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
  },
  {
    path: "/form",
    element: <Forms />
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
 
  <React.StrictMode>
    <GlobalProvider>
    
    <RouterProvider router={router} />

    </GlobalProvider>

  </React.StrictMode>

);
