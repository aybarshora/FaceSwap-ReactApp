import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main/Main';
import ThankYou from './pages/ThankYou/ThankYou';
import {
  createBrowserRouter,
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
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
 
  <React.StrictMode>
    <head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' http: https:" />

    </head>

    <RouterProvider router={router} />

  </React.StrictMode>

);
