import { useState,useEffect } from 'react'
import NavBar from './components/Nav/NavBar'
import Hero from './components/Hero/Hero'
import Car from './components/Hero/Car'
import Features from './components/Features/Features'
import SocialMedia from './components/Footer/SocialMedia'
import Footer from './components/Footer/Footer'
import Callback from './components/Callback/Callback'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Home from './components/Home/Home'
import { Auth0Provider,useAuth0 } from '@auth0/auth0-react';


function App() {
  
   const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  
  useEffect(()=>{
    document.title="Park It Up"
    if (isAuthenticated) {
        navigate("/home");
      }
  }, [isAuthenticated, user, navigate]);

  return (
    
    <div>
  
    <NavBar></NavBar>
    <Hero></Hero>
    <Car></Car>
    <Features></Features>
    <SocialMedia></SocialMedia>
    <Footer></Footer> 

   </div>
  
  )
}

export default App
