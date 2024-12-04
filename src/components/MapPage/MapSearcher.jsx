import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import InformationWindow from "./InformationWindow";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import SideWindow from "./SideWindow";
import useParkingStore from "./parkingStoreContext";
import MapHandler from "./MapHandler";
import NearbyPlaces from "./NearbyPlaces";
import Directions from "../Directions/Directions";
import { useLocation } from "react-router-dom";
import SearchPlace from "../SearchPlace";
import { IoClose } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import ParkingSpots from "./ParkingSpots";
import EmbeddedMap from "../EmbeddedMap/EmbeddedMap";
import PlaceAutocomplete from "./PlaceAutocomplete";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const MapSearcher = () => {
  const [parkingData, setParkingData] = useState([]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const parkingResults = useParkingStore((data) => data.parkingResults);
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen);
  const selectedSpot = useParkingStore((state) => state.selectedSpot);
  const setSelectedSpot = useParkingStore((state) => state.setSelectedSpot);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null); // Ref to hold map instance
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);

  const [{ y }, api] = useSpring(() => ({ y: window.innerHeight - 100, display: 'block' }));

  const bind = useDrag(({ down, movement: [, my] }) => {
    if (down) {
      api.start({ y: my < 0 ? 0 : my });
    } else {
      api.start({
        y: my < window.innerHeight / 2 ? 0 : window.innerHeight - 100,
      });
    }
  });

  const closeDiv = () => {
    api.start({ y: window.innerHeight - 100, display: 'none' });
  };

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <APIProvider
      apiKey={API_KEY}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <div className="relative h-screen overflow-hidden">
        <div className="absolute top-0 w-full h-full">
          <Map
            style={{ width: "100vw", height: "100vh" }}
            mapId={"e43f831b5ad9c238"}
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            className=""
          >
            <AdvancedMarker ref={markerRef} position={null} />
            {selectedSpot && (
              <AdvancedMarker
                position={selectedSpot.geometry?.location}
                title="Selected Location"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
              </AdvancedMarker>
            )}
            {selectedSpot && (
              <NearbyPlaces
                place={selectedSpot}
                marker={marker}
                setParkingData={setParkingData}
              />
            )}

            {selectedParkingID && (
              <>
                <Directions
                  map={mapRef.current}
                  origin={currentLocation}
                  destination={selectedParkingID}
                />
              </>
            )}
          </Map>

          <MapHandler place={selectedSpot} marker={marker} />
        </div>

        <div className="absolute top-0 w-full p-4 z-20 md:hidden">
          <SearchPlace />
        </div>

        <animated.div
          {...bind()}
          style={{ y }}
          className="absolute bottom-0 w-full p-4 z-50 bg-white rounded-t-xl h-full md:h-[40%] overflow-y-auto shadow-lg"
        >
          <div className="mt-4 px-4 rounded-xl bg-white">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h1 className="font-raleway text-lg font-medium text-gray-800">
                Parking Near Your Searched Place
              </h1>
              <button
                onClick={closeDiv}
                className="text-gray-600 font-bold hover:text-gray-800 transition"
              >
                <IoClose size={40}/>
              </button>
            </div>
            <ParkingSpots parkingData={parkingResults} />
          </div>
        </animated.div>

       

        <div className={`flex ${isInfoWindowOpen ? "w-2/3" : "w-1/3"} absolute top-0 left-0 h-full md:z-10 z-60`}>
          <div className="w-[600px]">
            <SideWindow onPlaceSelect={setSelectedSpot} parkingData={parkingData} />
          </div>

          {isInfoWindowOpen && (
            <div className="w-full md:w-2/3 h-full">
              <InformationWindow />
            </div>
          )}
        </div>
      </div>
    </APIProvider>
  );
};

export default MapSearcher;
