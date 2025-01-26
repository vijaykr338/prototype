import React from 'react'
import group from '../Hero/Group.svg'
import SearchPlace from '../SearchPlace'

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
            <SearchPlace />
            </div>

        </div>
    )
}

export default Hero
