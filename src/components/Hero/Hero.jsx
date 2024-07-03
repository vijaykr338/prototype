import React from 'react'
import group from '../Hero/Group.svg'
import { FaSearch } from "react-icons/fa";

const Hero = () => {

   

    return (
        <div className='flex justify-between'>

            <div className='header px-20 mx-28 my-16 text-center w-3/6'>
                <div className='text-7xl font-bold'>   <p>In a Hurry? <br />
                PARK It Up!</p>
                </div>

                <div className='flex items-center relative left-9'>
                    <input className='text-2xl px-8 rounded-full my-10 border-2 h-16 w-full border-black' type="text" placeholder='Search for a spot right now!' />
                    <FaSearch style={{backgroundColor: '#0000FF'}} className='cursor-pointer relative right-20 rounded-full text-white px-4 py-4 h-12 w-20' />
                </div>
                <button className='bg-blue-700 text-white text-3xl px-8 py-4 font-bold rounded-full' style={{backgroundColor: '#0000FF'}}>SEARCH NEAR ME</button>
            </div>

            <div className='image'>
                <img src={group} />
            </div>
        </div>
    )
}

export default Hero
