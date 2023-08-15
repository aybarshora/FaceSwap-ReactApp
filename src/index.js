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
    
    <RouterProvider router={router} />

  </React.StrictMode>

);
