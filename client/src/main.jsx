import { React, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CaseDetails from './components/CaseDetails';
import ErrorPage from './components/ErrorPage';
import './index.css';
import { evidences, cases } from "./data";


// const main = () => {
//  const [evidences, setEvidences] = useState([
//   {
//     id: 1,
//     name: '',
//     custodian: '',
//     timestamp: '',
//     hash: '',
//     verified: false
//   },
//   {
//     id: 2,
//     name: '',
//     custodian: '',
//     timestamp: '',
//     hash: '',
//     verified: false
//   },
//   {
//     id: 3,
//     name: '',
//     custodian: '',
//     timestamp: '',
//     hash: '',
//     verified: false
//   },
//   {
//     id: 1,
//     name: '',
//     custodian: '',
//     timestamp: '',
//     hash: '',
//     verified: false
//   },
//   {
//     id: 1,
//     name: '',
//     custodian: '',
//     timestamp: '',
//     hash: '',
//     verified: false
//   },
//   {
//     id: 1,
//     name: '',
//     custodian: '',
//     timestamp: '',
//     hash: '',
//     verified: false
//   }
// ]);

// const [cases, setCases] = useState([
//   {
//     id: 1,
//     name: '',
//     filer: '',
//     evidences: [],
//     status: '',
//   }
// ])

  

// }

const router = createBrowserRouter([

  {
    path: "/",
    element: <Login  />,
    errorElement: <ErrorPage />,
      
  },
  {
    path: "dashboard",
    element: <Dashboard  evidences={evidences} cases={cases}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "casedetails/:caseid",
    element: <CaseDetails evidences={evidences} cases={cases} />,
    errorElement: <ErrorPage />,
  },

]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);