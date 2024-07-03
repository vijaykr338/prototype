import React from 'react'
import logo from './file.png'

const NavBar = () => {
  return (
    <div className='flex justify-around items-center mx-4 mt-4'>
      <div className='flex items-center'>
        <img src={logo} className='h-28 '/>
         <div className='text-5xl'>PARK it Up</div>
         </div>
     

      <div>
        <ul className='flex text-2xl py-4 space-x-24'>
            <li className='text-blue-600'>Home</li>
            <li>Company</li>
            <li>Pricing</li>
            <li>Contact</li>
        </ul>
      </div>

      <div className='flex space-x-8 '>
        <button className='text-2xl px-12 py-4 rounded-full text-white font-extrabold' style={{backgroundColor:'#000A62'}}>SIGN UP</button>
        <button className='text-2xl px-12 py-4 rounded-full font-extrabold border-black border-2 border-solid' style={{color: '000A62'}}>LOGIN</button>
       
      </div>


    </div>
  )
}

export default NavBar
