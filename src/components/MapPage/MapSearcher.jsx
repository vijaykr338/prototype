import React, { useState, useEffect, useRef } from "react";
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
import MapHandler from "./MapHandler";
import NearbyPlaces from "./NearbyPlaces";
import SearchPlace from "../SearchPlace";

import { useLocation } from "react-router-dom";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const MapSearcher = () => {
  const [parkingData, setParkingData] = useState([]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen);
  const selectedSpot = useParkingStore((state) => state.selectedSpot);
  const setSelectedSpot = useParkingStore((state) => state.setSelectedSpot);

  return (
    <APIProvider
      apiKey={API_KEY}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <div className="relative h-screen overflow-hidden">
        <div className="absolute top-0  h-full">
          <Map
            style={{ width: "100vw", height: "100vh" }}
            //this width is necessary for map working
            mapId={"e43f831b5ad9c238"}
            // mapId={"fe442564d6c0b923"} to restore map markers
            defaultZoom={3}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
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
          </Map>

          <MapHandler place={selectedSpot} marker={marker} />
        </div>

        <div className={`flex ${isInfoWindowOpen ? 'w-2/3' : 'w-1/3'} absolute top-0 left-0 h-full z-10`}>
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
