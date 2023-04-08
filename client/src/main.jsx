import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CaseDetails from './components/CaseDetails';
import AddEvidence from './components/AddEvidence';
import ErrorPage from './components/ErrorPage';
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login  />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard  />,
    errorElement: <ErrorPage />,
  },
  {
    path: "casedetails/:caseid",
    element: <CaseDetails  />,
    errorElement: <ErrorPage />,
  },
  {
    path: "addevidence",
    element: <AddEvidence  />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);