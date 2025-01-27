import NavBar from './components/Nav/NavBar'
import Hero from './components/Hero/Hero'
import Car from './components/Hero/Car'
import SocialMedia from './components/Footer/SocialMedia'
import Footer from './components/Footer/Footer'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useEffect } from 'react'
import MapSearcher from './components/MapPage/MapSearcher'
import EmbeddedMap from './components/EmbeddedMap/EmbeddedMap'

import WhyChoose from './components/LandingPage/WhyChoose'
import HowItWorks from './components/LandingPage/HowItWorks'
import Features from './components/LandingPage/Features'
// import Testimonials from './components/LandingPage/Testimonials'
import FAQ from './components/LandingPage/FAQ'

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

function App() {
  
  return (

    <div>
      <APIProvider apiKey={API_KEY} solutionChannel="GMP_devsite_samples_v3_rgmautocomplete">

        <NavBar></NavBar>
        <Hero></Hero>
        <Car></Car>
        <WhyChoose />
        <HowItWorks />
        <Features></Features>
        {/* <Testimonials /> */}
        <FAQ />
        <SocialMedia></SocialMedia>
        <Footer></Footer>
        {/* <MapSearcher></MapSearcher> */}
        {/* <EmbeddedMap origin={22,23} destination={25,26} /> */}
      </APIProvider>

    </div>

  )
}

export default App
