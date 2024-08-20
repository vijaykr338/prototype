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
import { useNavigate } from "react-router-dom";



const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");
    const setSelectedSpot = useParkingStore((state)=> state.setSelectedSpot)
    const navigate = useNavigate()

    useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address"],
      };

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
    useEffect(() => {
      if (!placeAutocomplete) return;

      placeAutocomplete.addListener("place_changed", () => {
        const place = placeAutocomplete.getPlace();
        onPlaceSelect(place);
        console.log(place, "have you heard of the high elves")
        setSelectedSpot(place)
        navigate("/search-for-parking")
        
        
      });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
      <div className="autocomplete-container">
        <input
          placeholder="Type Address, Venue, City or Place"
          className="placeholder-slate-600 w-full h-14 px-6 border rounded-full"
          ref={inputRef}
        />
        {/* <CiSearch className="absolute right-10 size-7" /> */}
      </div>
    );
  };

export default PlaceAutocomplete
