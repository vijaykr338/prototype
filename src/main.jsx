import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './components/AccountManage/SignIn.jsx';
import SignUp from './components/AccountManage/SignUp.jsx';
import Home from './components/Home/Home.jsx';
import MapSearcher from './components/MapPage/MapSearcher.jsx';
import Forgot from './components/AccountManage/Forgot.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <SignIn></SignIn>
  },
  {
    path : "/home",
    element: (
   
    <Home> </Home>
   
    )
  },
  {
    path: "/search-for-parking",
    element: <MapSearcher/>
  },
  {
    path: "/forgot-password",
    element: <Forgot/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
    <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
)
