import NavBar from './components/Nav/NavBar'
import Hero from './components/Hero/Hero'
import Car from './components/Hero/Car'
import Features from './components/Features/Features'
import SocialMedia from './components/Footer/SocialMedia'
import Footer from './components/Footer/Footer'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useEffect } from 'react'
import MapSearcher from './components/MapPage/MapSearcher'
import EmbeddedMap from './components/EmbeddedMap/EmbeddedMap'

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
    {/* <MapSearcher></MapSearcher> */}
    {/* <EmbeddedMap origin={22,23} destination={25,26} /> */}
  </APIProvider>
    
   </div>
  
  )
}

export default App
