import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdLocationPin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useParkingStore from "./parkingStoreContext";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const PlaceAutocomplete = ({ onPlaceSelect, className }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");
  const setSelectedSpot = useParkingStore((state) => state.setSelectedSpot);
  const navigate = useNavigate();

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
      setSelectedSpot(place);
      navigate("/search-for-parking");
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className={`relative ${className}`}>
      <div className={`
        flex items-center 
        bg-white 
        rounded-lg
        overflow-hidden
        transition-all duration-300 ease-in-out
        ${isFocused ? 'shadow-lg ring-2 ring-blue-400' : 'shadow-md hover:shadow-lg'}
      `}>
        <div className="pl-4">
          <CiSearch className={`
            w-5 h-5 
            transition-colors duration-300
            ${isFocused ? 'text-blue-500' : 'text-gray-400'}
          `}/>
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search for parking near..."
          className="
            w-full 
            py-3 px-3
            text-gray-700 
            placeholder-gray-400
            focus:outline-none
            transition-all
            duration-300
          "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

      </div>

      {/* Add custom styles for Google Autocomplete dropdown */}
      <style jsx>{`
        .pac-container {
          border-radius: 8px;
          margin-top: 8px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          border: none;
          font-family: inherit;
        }
        .pac-item {
          padding: 8px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .pac-item:hover {
          background-color: #f8fafc;
        }
        .pac-item-query {
          font-size: 14px;
          color: #1e293b;
        }
      `}</style>
    </div>
  );
};

export default PlaceAutocomplete;
