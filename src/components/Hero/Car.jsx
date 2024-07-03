import React from 'react'
import car from '../Hero/car3.gif'
import {motion} from 'framer-motion'

const Car = () => {
  return (
    <div className='overflow-hidden'>
        <motion.div
         animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 5, 
            repeat: Infinity, 
            repeatType: "loop", 
            ease: "linear" 
          }}
        >
        <img src={car} className='h-48 ' />
        </motion.div>
      <hr className='h-1 bg-black relative bottom-12' />
    </div>
  )
}

export default Car
