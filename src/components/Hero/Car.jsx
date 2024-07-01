import React from 'react'
import car from '../Hero/car.png'
import {motion} from 'framer-motion'

const Car = () => {
  return (
    <div>
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
        <img src={car} className='' />
        </motion.div>
      <hr className='h-1 bg-black relative bottom-24' />
    </div>
  )
}

export default Car
