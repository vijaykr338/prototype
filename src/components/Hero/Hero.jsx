import React from 'react'
import group from '../Hero/Group.svg'
import SearchPlace from '../SearchPlace'

const Hero = () => {
  return (
    <div className='sm:flex justify-between items-center overflow-hidden'>
      <div className='image'>
        <img src={group} className='responsive-image' />
      </div>

      <div className='header sm:px-20 sm:mx-28 sm:my-16 text-center sm:w-3/6'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto font-bold'>
            In a Hurry?
          </h1>
          <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto font-bold'>
            Park It Up!
          </h1>
        </div>
        <SearchPlace />
      </div>
    </div>
  )
}

export default Hero