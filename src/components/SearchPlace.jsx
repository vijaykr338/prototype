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
import TextSearch from './MapPage/TextSearch';

const SearchPlace = ({onPlaceSelect}) => {
  const setSelectedSpot = useParkingStore((state) => state.setSelectedSpot);

  
  return (
    <div>
    <TextSearch onPlaceSelect={setSelectedSpot} />
      
    </div>
  )
}

export default SearchPlace
