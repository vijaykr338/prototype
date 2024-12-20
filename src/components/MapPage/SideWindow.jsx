import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { InfoWindow } from "@vis.gl/react-google-maps";
import InformationWindow from "./InformationWindow";
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
import ParkingSpots from "./ParkingSpots";
import useParkingStore from "./parkingStoreContext";
import PlaceAutocomplete from "./PlaceAutocomplete";
// Adjust the import path if necessary

const SideWindow = ({ onPlaceSelect, parkingData, setParkingID }) => {
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if (isMobile) {
    return null;
  }

  return (
    
    <div className="h-screen bg-white space-x-4 px-5 py-4">
      <div className="h-full overflow-scroll ">
        <h1 className="font-inter font-bold text-3xl">Book Parking Near</h1>
        <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
        <ParkingSpots parkingData={parkingData} />
      </div>
    
  </div>
  );
};

export default SideWindow;
