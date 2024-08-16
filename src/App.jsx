import NavBar from './components/Nav/NavBar'
import Hero from './components/Hero/Hero'
import Car from './components/Hero/Car'
import Features from './components/Features/Features'
import SocialMedia from './components/Footer/SocialMedia'
import Footer from './components/Footer/Footer'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useEffect } from 'react'


const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

function App() {

 

  return (
    
    <div>
  <APIProvider apiKey={API_KEY} solutionChannel="GMP_devsite_samples_v3_rgmautocomplete">
    
    <NavBar></NavBar>
    <Hero></Hero>
    <Car></Car>
    <Features></Features>
    <SocialMedia></SocialMedia>
    <Footer></Footer> 

  </APIProvider>
    
   </div>
  
  )
}

export default App
