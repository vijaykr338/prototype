import React from 'react'
import group from '../Hero/Group.svg'
import { FaSearch } from "react-icons/fa";

const Hero = () => {

   

    return (
        <div className='sm:flex justify-between overflow-hidden'>

            <div className='image'>
                <img src={group} />
            </div>

            <div className='header sm:px-20 sm:mx-28 sm:my-16 text-center sm:w-3/6'>
                <div className='sm:text-7xl text-4xl font-roboto font-bold'>   <p>In a Hurry? <br />
                PARK It Up!</p>
                </div>

                <div className='flex items-center relative sm:left-9 left-7'>
                    <input className='sm:text-2xl  sm:px-8 px-4 rounded-full my-10 border-2 sm:h-16 h-14 w-full border-black' type="text" placeholder='Search for a spot right now!' />
                    <FaSearch style={{backgroundColor: '#0000FF'}} className='cursor-pointer relative sm:right-20 right-14 rounded-full text-white sm:px-4 sm:py-4 px-2 py-2 sm:h-12 sm:w-20 h-10 w-14' />
                </div>
                <button className='bg-blue-700 text-white sm:text-3xl sm:px-8 px-6 py-4 sm:py-4 font-bold rounded-full' style={{backgroundColor: '#0000FF'}}>SEARCH NEAR ME</button>
            </div>

        </div>
    )
}

export default Hero
