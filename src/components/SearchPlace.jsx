import React from 'react'
import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
  } from "@vis.gl/react-google-maps";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';  
import useParkingStore from './MapPage/parkingStoreContext';
import PlaceAutocomplete from './MapPage/PlaceAutocomplete';


const SearchPlace = ({onPlaceSelect}) => {
  const setSelectedSpot = useParkingStore((state) => state.setSelectedSpot);

  
  return (
    <div className='border-2 border-solid border-black rounded-full'>
    <PlaceAutocomplete onPlaceSelect={setSelectedSpot} />     
    </div>
  )
}

export default SearchPlace
