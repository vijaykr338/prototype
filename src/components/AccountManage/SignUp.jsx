import React, { useRef, useState } from 'react'
import car2 from "./caro.png"
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    emailId: '',
    yourPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can add form submission logic here
  };

  const passwordRef = useRef()
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
        <div className="flex flex-col mt-7 items-center">
          <p className='font-extrabold md:text-4xl text-2xl'>NEVER WORRY ABOUT </p>
          <p className='font-extrabold md:text-4xl text-2xl'>PARKING AGAIN</p>
          <img src={car2} alt="" className="responsive-image" />
        </div>
        <div className="w-full max-w-md justify-center">
          <form className="px-10 py-5" onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold mb-4">Sign up</h2>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="fullName">
                Your Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
            </div>
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
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
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
            <div className="flex items-center justify-end">
              <button type="submit"
                className="w-full font-semibold bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-indigo-200">
                Sign up
              </button>
            </div>
          </form>
          <hr />
          <div className='px-10 py-5'>
            <a href="" className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 hover:border-white hover:ring hover:ring-blue-200">
              <p className='font-semibold px-2'>Continue with Google</p>
              <FcGoogle className='text-2xl' />
            </a>

            <p className='flex justify-center my-5 '>
              <span>Already have an account? </span>
              <a href="" className='px-2 text-blue-500 font-semibold underline'>Sign in</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp