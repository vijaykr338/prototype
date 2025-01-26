import React, { useRef, useState ,useEffect} from 'react'
import car from "./caro2.png"
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import { GoogleProvider, auth } from '../../config/firebaseconfig';
import {signInWithEmailAndPassword,signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailId: '',
    yourPassword: '',
    loggedIn: false
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home');  // Redirect authenticated users to dashboard
      }
    });

    return () => unsubscribe();  // Cleanup function to avoid memory leaks
  }, []);


  const handleChange = (e) => {
    
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      //basically if its checkbox, it will go to checked othervise value
      [name]: type==='checkbox' ? checked : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
   
    // You can add form submission logic here
    try{
      await signInWithEmailAndPassword(auth,formData.emailId,formData.yourPassword);
      navigate("/home")
    
    }
    catch(e){
      console.log("error signing in",e);
    }
  };

  const SignInWithGoogle = async(e)=>{
    e.preventDefault();
    console.log('Form data submitted:', formData);
    
   
    // You can add form submission logic here
    try{
      await signInWithPopup(auth,GoogleProvider);
      navigate("/home")
    
    }
    catch(e){
      console.log("error signing in",e);
    }
  }

  const passwordRef = useRef()

  //this part basically just hides the pass
  const [ShowOrHide, setShowOrHide] = useState('hide')

  const showPassword = () => {

    if (ShowOrHide === 'show') {
      setShowOrHide('hide')
      passwordRef.current.type = "password"
    } else {
      setShowOrHide('show')
      passwordRef.current.type = "text"
    }
  }

  return (
    <>
    
      <section className="flex md:flex-row flex-col items-center justify-around">
      
        <div className="w-full max-w-md justify-center">
          <form className="px-10 py-5" onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold mb-1">Sign in</h2>
            <p className='text-gray-400 mb-4'>Please login to continue to your account.</p>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="emailId">
                Email
              </label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                required
                placeholder="jonas_kahnwald@gmail.com" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="yourPassword">
                Password
              </label>
              <div className="relative w-full px-3 py-2 border rounded-md">
                <input
                  ref={passwordRef}
                  type="password"
                  id="yourPassword"
                  name="yourPassword"
                  value={formData.yourPassword}
                  onChange={handleChange}
                  required
                  className='focus:outline-none' />
                <span onClick={showPassword} className='absolute right-2 top-2'>
                  {ShowOrHide === 'show' && <BiShow className='text-2xl' />}
                  {ShowOrHide === 'hide' && <BiHide className='text-2xl' />}
                </span>
              </div>
            </div>
            <div className='flex py-2'>
              <input
                type="checkbox"
                name="loggedIn"
                id="loggedIn"
                value={formData.loggedIn}
                onChange={handleChange} />
              <p className='mx-2'>Keep me logged in</p>
            </div>
            <div className="flex items-center justify-end">
              <button type="submit" onClick={handleSubmit}
                className="w-full font-semibold bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-indigo-200">
                Sign in
              </button>
            </div>
          </form>
          <hr />
          <div className='px-10 py-5'>
            <a onClick={SignInWithGoogle} className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 hover:border-white hover:ring hover:ring-blue-200">
              <p className='font-semibold px-2'>Sign in with Google</p>
              <FcGoogle className='text-2xl' />
            </a>
            
            <p className='flex justify-center my-5 '>
              <span>Need an account? </span>
              <Link to="/sign-up" className='px-2 text-blue-500 font-semibold underline'>Create one</Link>
            </p>

            <p className='flex justify-center my-5 '>
              <Link to="/forgot-password" className='px-2 text-blue-500 font-semibold underline'>Forgot Password</Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-7 items-center max-w-5xl">
          <img src={car}  className="responsive-image" />
        </div>
      </section>
    </>
  )
}

export default SignIn