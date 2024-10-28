import React, { useEffect } from 'react'
import { auth } from '../../config/firebaseconfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handlelogout = async()=>{
    try{
      await signOut(auth);
      navigate("/");
    }
    catch(e){
      console.log("some error loging out",e);
    }
  }  
  return ( 
    
    <>
    <h1>This is home where only authenticated users shall enter</h1>
    <button onClick={handlelogout}>Logout</button>
    </>
  
  )
}

export default Home;
