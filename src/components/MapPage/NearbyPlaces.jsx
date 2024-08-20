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



const NearbyPlaces = ({ place, setParkingData }) => {
    const map = useMap();
    const placesLib = useMapsLibrary("places");
    const selectedSpot = useParkingStore((state)=> state.selectedSpot);
    //Places API is our bread and butter for working
    const [nearbyMarkers, setNearbyMarkers] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [infoContent, setInfoContent] = useState(null);
    
    useEffect(() => {
      if (!placesLib || !map || !place) return;
  
      const service = new placesLib.PlacesService(map);
    
      
      const request = {
        location: place.geometry.location,
        radius: 500, // search within 500 meters
        type: ["parking"],
        // search for parking places
        fields: ["geometry", "name", "place_id", "vicinity"], // include photos field
      };
  
      service.nearbySearch(request, (results, status) => {
        if (status === placesLib.PlacesServiceStatus.OK) {
          const PhotoOptions = {
            maxHeight: 300,
          };
          console.log(results);
  
          const markers = results.map((result) => ({
            position: result.geometry.location,
            name: result.name,
            address: result.vicinity,
            placeId: result.place_id,
            photos: result.photos
              ? result.photos.map((photo) => photo.getUrl(PhotoOptions))
              : [], // extract photo URLs
          }));
          setParkingData(results);
          setNearbyMarkers(markers);
        } else {
          console.error("Nearby search failed:", status);
        }
      });
    }, [placesLib, map, place, selectedSpot ]);
  
    const handleMarkerClick = (marker) => {
      setActiveMarker(marker.position);
  
      const service = new placesLib.PlacesService(map);
      // https://developers.google.com/maps/documentation/places/web-service/details
      service.getDetails(
        {
          placeId: marker.placeId,
          fields: ["name", "rating", "formatted_address", "review"],
        },
        (place, status) => {
          console.log(place);
  
          if (status === placesLib.PlacesServiceStatus.OK) {
            setInfoContent({
              name: place.name,
              address: place.formatted_address,
              rating: place.rating,
              photos: marker.photos,
            });
          } else {
            console.error("Failed to fetch place details:", status);
          }
        }
      );
    };
  
    return (
      <>
        {nearbyMarkers.map((marker, index) => (
          <AdvancedMarker
            key={index}
            position={marker.position}
            title={marker.name}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
  
        {activeMarker && infoContent && (
          <InfoWindow
            position={activeMarker}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div>
              <h2>{infoContent.name}</h2>
              <p>{infoContent.address}</p>
              {console.log(infoContent)}
              {infoContent.photos &&
                infoContent.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${infoContent.name} photo ${index + 1}`}
                  />
                ))}
            </div>
          </InfoWindow>
        )}
      </>
    );
  };
export default NearbyPlaces
