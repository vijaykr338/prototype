import React, { useState } from 'react';
import logo from './file.png';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({
      screen_hint: 'signup',
    });
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  if (!isAuthenticated) {
    return (
      <div className='sticky flex justify-between items-center sm:mx-4 sm:my-2 rounded-lg'>
        <div className='flex items-center'>
          <img src={logo} className='h-28' />
        </div>

        <div className='sm:hidden flex items-center mr-10' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className='space-y-2'>
            <span className='block w-8 h-0.5 bg-black'></span>
            <span className='block w-8 h-0.5 bg-black'></span>
            <span className='block w-8 h-0.5 bg-black'></span>
          </div>
        </div>

        <div className={`absolute top-full left-0 w-full bg-white shadow-md py-5 px-6 ${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <ul className='flex flex-col space-y-4'>
            <li>Company</li>
            <li>Contact</li>
            <li><button className='w-full text-xl py-2 rounded-full text-white font-extrabold' style={{ backgroundColor: '#000A62' }} onClick={handleSignUp}>SIGN UP</button></li>
            <li><button className='w-full text-xl py-2 rounded-full font-extrabold border-black border-2 border-solid' style={{ color: '#000A62' }} onClick={handleLogin}>LOGIN</button></li>
          </ul>
        </div>

        <div className='hidden sm:flex space-x-8'>
          <ul className='flex text-2xl py-4 space-x-14 mr-7'>
            <li>Company</li>
            <li>Contact</li>
          </ul>

          <button className='text-xl px-12 py-4 rounded-full text-white font-extrabold' style={{ backgroundColor: '#000A62' }} onClick={handleSignUp}>SIGN UP</button>
          <button className='text-xl px-12 py-4 rounded-full font-extrabold border-black border-2 border-solid' style={{ color: '#000A62' }} onClick={handleLogin}>LOGIN</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='sticky flex justify-between items-center sm:mx-4 sm:my-2 rounded-lg'>
        <div className='flex items-center'>
          <img src={logo} className='h-28' />
        </div>

        <div className='sm:hidden flex items-center mr-10' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className='space-y-2'>
            <span className='block w-8 h-0.5 bg-black'></span>
            <span className='block w-8 h-0.5 bg-black'></span>
            <span className='block w-8 h-0.5 bg-black'></span>
          </div>
        </div>

        <div className={`absolute top-full left-0 w-full bg-white shadow-md py-5 px-6 ${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <ul className='flex flex-col space-y-4'>
            <li>Company</li>
            <li>Contact</li>
            <li><button className='w-full text-xl py-2 rounded-full text-white font-extrabold' style={{ backgroundColor: '#000A62' }} onClick={logout}>Logout</button></li>
          </ul>
        </div>

        <div className='hidden sm:flex space-x-8'>
          <ul className='flex text-2xl py-4 space-x-14 mr-7'>
            <li>Company</li>
            <li>Contact</li>
          </ul>

          <button className='text-xl px-12 py-4 rounded-full text-white font-extrabold' style={{ backgroundColor: '#000A62' }} onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
};

export default NavBar;