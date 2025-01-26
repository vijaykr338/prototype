
import { useState } from 'react';
import { GoogleProvider, auth } from '../../config/firebaseconfig';
import {sendPasswordResetEmail} from "firebase/auth"

const Forgot = () => {
  const [email,SetEmail]= useState('');

    const handleChange=(e)=>{
        SetEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await sendPasswordResetEmail(auth, email);
          alert("Password reset email sent! Check your inbox.");
        } catch (error) {
          console.error("Error sending password reset email:", error);
          alert("Failed to send password reset email. Please try again.");
        }
      };
      
  return (
    <div>
   <h1>Reset Passord</h1>
   <form>
   <input type="email" placeholder='enter email' onChange={handleChange}></input>
   <button type="submit" onClick={handleSubmit}>Submit</button>
   </form>
    </div>
  )
}

export default Forgot