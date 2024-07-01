import React from 'react'


const NavBar = () => {
  return (
    <div className='flex justify-around mx-4 my-6'>
      <div className='text-5xl'>PARK it Up</div>

      <div>
        <ul className='flex text-2xl py-4 space-x-24'>
            <li className='text-blue-600'>Home</li>
            <li>Company</li>
            <li>Pricing</li>
            <li>Contact</li>
        </ul>
      </div>

      <div className='flex text-LG space-x-8 '>
        <button className=' px-14 py-4 rounded-full text-white font-extrabold' style={{backgroundColor:'#000A62'}}>SIGN UP</button>
        <button className=' px-14 py-4 rounded-full font-extrabold border-black border-2 border-solid' style={{color: '000A62'}}>LOGIN</button>
       
      </div>


    </div>
  )
}

export default NavBar
