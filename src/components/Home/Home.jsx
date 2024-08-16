import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';


const Home = () => {
  const {logout}= useAuth0();
 
  

  
  return ( 
    
    <>
    <h1>This is home where only authenticated users shall enter</h1>
    <button onClick={()=>{logout()}}>Logout</button>
    </>
  
  )
}

export default Home;
