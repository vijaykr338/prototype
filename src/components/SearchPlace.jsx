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


const SearchPlace = () => {
    const navigate = useNavigate()
    const [searchedLocation, setSearchedLocation] = useState(null)

  const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
      if (!places || !inputRef.current) return;

      const options = {
        fields: ["geometry", "name", "formatted_address", "place_id"],
      };

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);
    useEffect(() => {
      if (!placeAutocomplete) return;

      placeAutocomplete.addListener("place_changed", () => {
        const place = placeAutocomplete.getPlace()
        onPlaceSelect(place);
       
        setSearchedLocation(place);
        
        navigate('/search-for-parking')
      });
    }, [onPlaceSelect, placeAutocomplete, navigate]);
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




  return (
    <div>
     <PlaceAutocomplete onPlaceSelect={(place) => console.log(place)}/>
      
    </div>
  )
}

export default SearchPlace
