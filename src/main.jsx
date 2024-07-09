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
import { Auth0Provider } from '@auth0/auth0-react';
import AuthenticationGuard from './components/AuthGuard.jsx';
import { auth0Domain,auth0ClientId,auth0RedirectUri } from '../env.js';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/sign-up",
    element: <SignUp></SignUp>,
  },
  {
    path: "/sign-in",
    element: <SignIn></SignIn>
  },
  {
    path : "/home",
    element: (
    <AuthenticationGuard>
    <Home> </Home>
    </AuthenticationGuard>
    )
  }
]);
dotenv.config();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    
    domain="dev-myfhp3irrim5f5ad.us.auth0.com"
    clientId="Qe2JNOfnnpA458lB58mIL1TUGELx2Jg0"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/home",
    }}
  >
    <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
)
