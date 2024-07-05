import React from 'react'
import logo from './file.png'

const NavBar = () => {
  return (
    <div className='sticky  flex justify-around items-center mx-4 my-2 rounded-lg'>
      <div className='flex items-center'>
        <img src={logo} className='h-28'/>
        
      </div>

      <div>
        
      </div>

      <div className='flex space-x-14'>
      <ul className='flex text-2xl py-4 space-x-16'>
          <li>Company</li>
          <li>Contact</li>
        </ul>
        <button className='text-xl px-12 py-4 rounded-full text-white font-extrabold' style={{backgroundColor:'#000A62'}}>SIGN UP</button>
        <button className='text-xl px-12 py-4 rounded-full font-extrabold border-black border-2 border-solid' style={{color: '#000A62'}}>LOGIN</button>
      </div>
    </div>
  )
}

export default NavBar
