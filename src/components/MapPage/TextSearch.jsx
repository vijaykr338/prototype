import React, { useState, useEffect, useRef, Fragment } from "react";
import { createRoot } from "react-dom/client";
import InformationWindow from "./InformationWindow";
import { InfoWindow } from "@vis.gl/react-google-maps";

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
import SideWindow from "./SideWindow";
import useParkingStore from "./parkingStoreContext";
import { useNavigate } from "react-router-dom";

const TextSearch = ({onPlaceSelect}) => {
  const map = useMap();
  const navigate = useNavigate()
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const placesLib = useMapsLibrary("places");
  const setSelectedSpot = useParkingStore((state)=> state.setSelectedSpot)
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue)
  const setParkingPlaces = useParkingStore((state)=> state.setParkingPlaces);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);

  const handleChange = (e) => {
    e.preventDefault()
    setDebouncedValue("parking near" + inputValue)
  };

  useEffect(()=> {
    if (!placesLib || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new placesLib.Autocomplete(inputRef.current, options));
  }, [placesLib]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      setDebouncedValue("parking near" + place.name)
      navigate("/search-for-parking")
      console.log(place.name, "have you heard of the high elves")
    });
  }, [placeAutocomplete, debouncedValue]);
  
  useEffect(() => {
    if (!placesLib || !map) return;
    const service = new placesLib.PlacesService(map);
    const request = {
      query: debouncedValue,
      fields: ["displayName", "location", "businessStatus"],
      includedType: "parking",
      locationBias: { lat: 37.4161493, lng: -122.0812166 },
      language: "en-US",
      useStrictTypeFiltering: false,
    };

    service.textSearch(request, (results, status) => {
      if (status === placesLib.PlacesServiceStatus.OK) {
        console.log(results); 
        setParkingPlaces(results)

        const PhotoOptions = {
          maxHeight: 300,
        };
        const markers = results.map((result) => ({
          position: result.geometry.location,
          name: result.name,
          address: result.vicinity,
          placeId: result.place_id,
          photos: result.photos
            ? result.photos.map((photo) => photo.getUrl(PhotoOptions))
            : [], // extract photo URLs
        }));

        
        if(map){

          map.panTo(markers[0].position)
          map.setZoom(15)
        }
        setNearbyMarkers(markers)
      } else {
        console.error("Text Search Failed: ", status);
      }
    });
  }, [placesLib, map, debouncedValue]);

  return (
    <Fragment>

    <form onSubmit={handleChange}>
         <input
      placeholder="type something"
      className="autocomplete-container rounded-full px-6 py-4 border-2 w-full my-3"
      value={inputValue}
      onChange={(e)=> setInputValue(e.target.value)}
      ref={inputRef}
    />
    </form>

    {nearbyMarkers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={marker.position}
            title={marker.name}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}


    </Fragment>
   
  );
};

export default TextSearch;
