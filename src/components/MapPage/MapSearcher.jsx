import React, { useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import InformationWindow from "./InformationWindow";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useAdvancedMarkerRef,
  
} from "@vis.gl/react-google-maps";
import SideWindow from "./SideWindow";
import useParkingStore from "./parkingStoreContext";
import MapHandler from "./MapHandler";
import NearbyPlaces from "./NearbyPlaces";
import Directions from "../Directions/Directions";
import { AnimatePresence, motion } from "motion/react"


const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const MapSearcher = () => {
  const [parkingData, setParkingData] = useState([]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen);
  const selectedSpot = useParkingStore((state) => state.selectedSpot);
  const setSelectedSpot = useParkingStore((state) => state.setSelectedSpot);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null); // Ref to hold map instance
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);

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
     <div className="relative w-screen h-screen overflow-hidden">
     <div className="w-full h-full">
          <Map
            style={{ width: "100vw", height: "100vh" }}
            mapId={"e43f831b5ad9c238"}
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            onTilesLoaded={function (event) {
              // console.log("on tiles loaded executed");
              // // console.log(event.detail);
              // // console.log(event.map);
              mapRef.current = event.map;
            }}
          >
            <AdvancedMarker ref={markerRef} position={null} />
            {selectedSpot && (
              <AdvancedMarker
                position={selectedSpot.geometry?.location}
                title="Selected Location"
                options={{
                  icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // URL for red marker
                    scaledSize: new google.maps.Size(32, 32), // Resize if necessary
                  },
                }}
              />
            )}

            {selectedSpot && (
              <NearbyPlaces
                place={selectedSpot}
                marker={marker}
                setParkingData={setParkingData}
              />
            )}

            {/* Directions component */}

            {selectedParkingID && (
              <>
                <Directions
                  map={mapRef.current}
                  origin={currentLocation}
                  destination={selectedParkingID}
                ></Directions>
              </>
            )}
          </Map>

          <MapHandler place={selectedSpot} marker={marker} />
        </div>

        <motion.div
    className="flex absolute top-0 left-0 h-full z-10"
    animate={{ width: isInfoWindowOpen ? "66.666667%" : "33.333333%" }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    <motion.div
      initial={{ x: -600 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-[600px]"
    >
      <SideWindow
        onPlaceSelect={setSelectedSpot}
        parkingData={parkingData}
      />
    </motion.div>

    <AnimatePresence>
      {isInfoWindowOpen && (
        <motion.div
          initial={{ x: -600 }}
          animate={{ x: 0 }}
          exit={{ x: -600 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="w-[600px] bg-white h-screen"
        >
          <InformationWindow />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
      </div>
    </APIProvider>
  );
};

export default MapSearcher;
