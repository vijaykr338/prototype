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


const MapHandler = ({ place, marker }) => {
   
    const map = useMap();
    //for working with maps
    //the usual format is https://visgl.github.io/react-google-maps/docs/get-started
    //see the hooks part
  
    useEffect(() => {
      if (!map || !place || !marker) return;
  
      if (place.geometry?.viewport) {
        map.fitBounds(place.geometry?.viewport);
      }
      console.log(place.geometry?.viewport);
  
      marker.position = place.geometry?.location;
    }, [map, place, marker]);
    return null;
  };

export default MapHandler
