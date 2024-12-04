import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import boiler from './default.jpg'
import InformationWindow from './InformationWindow';
import useParkingStore from './parkingStoreContext';


const ParkingSpots = ({parkingData}) => {

  const setSelectedParkingID = useParkingStore((state)=> state.setSelectedParkingID)
  const setInfoWindowOpen = useParkingStore((state)=> state.setInfoWindowOpen)
  const isInfoWindowOpen = useParkingStore((state)=> state.isInfoWindowOpen)
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);

  const ParkingSpotClickHandler = (place_id) => {
    if(selectedParkingID !== place_id){
        setSelectedParkingID(place_id);
        setInfoWindowOpen(true);
    }
    else{
        setInfoWindowOpen(!isInfoWindowOpen);
    }
   
    // console.log(place_id)
  }
  
       
  return (
    <div className='bg-white space-y-3 h-screen overflow-y-auto '>

      {
        parkingData && parkingData.map((parking)=> {
          return(
              <div
              onClick={()=> ParkingSpotClickHandler(parking.place_id)}
              key={parking.place_id}
              className='flex sm:flex-row justify-between cursor-pointer border border-gray-300 rounded-lg p-3'>
        <div className='flex-1'>
        <h1 className='font-bold text-xl sm:text-2xl'>{parking.name}</h1>
        <span className='flex items-center text-sm sm:text-lg'><FaStar className='text-yellow-400'/>{parking.rating}</span>
        <span className='flex items-center text-sm sm:text-lg'><FaWalking /> 15 mins</span>
        <div className='text-2xl sm:text-3xl font-bold items-center'>90 ₹ <span className='text-lg sm:text-xl text-gray-500'>/hour</span> </div>
        </div>

    <img src={parking.photos ? parking.photos.map(photo => photo.getUrl({maxHeight: 300})): boiler} className='h-24 w-24 sm:h-36 sm:w-36 object-cover object-center rounded-lg mt-2 sm:mt-0' alt="boiler" />
      </div>
          )
        })
      }

    </div>
  )
}

export default ParkingSpots