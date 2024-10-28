import React, {useRef, useState,useEffect } from "react";
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
import EmbeddedMap from "../EmbeddedMap/EmbeddedMap";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const MapSearcher = () => {
  const [parkingData, setParkingData] = useState([]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen);
  const selectedSpot = useParkingStore((state) => state.selectedSpot);
  const setSelectedSpot = useParkingStore((state) => state.setSelectedSpot);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null); // Ref to hold map instance
  const selectedParkingID = useParkingStore((state)=> state.selectedParkingID);
  

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     setMap(mapRef.current);
  //   }
  // }, [mapRef.current]);


  // async function getCurrentPosition() {
  //   if (navigator.geolocation) {
  //     try {
  //       const position = await new Promise((resolve, reject) => {
  //         navigator.geolocation.getCurrentPosition(resolve, reject);
  //       });
  //       const Lat = position.coords.latitude;
  //       const Lng = position.coords.longitude;
  //       console.log("Latitude: " + Lat + ", Longitude: " + Lng);
  //       return { Lat, Lng };
  //     } catch (error) {
  //       console.error("Error getting position:", error);
  //       return null;
  //     }
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //     return null;
  //   }
  // }
  
  
  
  return (
    <APIProvider
      apiKey={API_KEY}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <div className="relative h-screen overflow-hidden">
        <div className="absolute top-0 h-full">
          <Map
            style={{ width: "100vw", height: "100vh" }}
            mapId={"e43f831b5ad9c238"}
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            
           onTilesLoaded={
            function(event){
            console.log("on tiles loaded executed");
              // console.log(event.detail);
              // console.log(event.map);
              mapRef.current = event.map;
           }
          }
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

        <div
          className={`flex ${
            isInfoWindowOpen ? "w-2/3" : "w-1/3"
          } absolute top-0 left-0 h-full z-10`}
        >
          <div className="w-[600px]">
            <SideWindow
              onPlaceSelect={setSelectedSpot}
              parkingData={parkingData}
            />
          </div>

          {isInfoWindowOpen && (
            <div className="w-[600px] bg-white h-screen">
              <InformationWindow />
            </div>
          )}
        </div>
      </div>
    </APIProvider>
  );
};

export default MapSearcher;
