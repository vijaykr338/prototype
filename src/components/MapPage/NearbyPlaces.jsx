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
import Slider from 'react-slick'; // Ensure you have this import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const NearbyPlaces = ({ place, setParkingData }) => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



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
        radius: 750, // search within 750 meters
        type: ["parking"], // search for parking places
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
            title="4$"
            scale="1.5"
            onClick={() => handleMarkerClick(marker)}
          >
            
            <div className="relative inline-block px-5 py-2 bg-blue-700 text-white text-lg rounded-full hover:bg-white hover:text-blue-700">
  4$
  <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-[10px] border-t-blue-700 border-x-[10px] border-x-transparent"></div>
</div>
             
          </AdvancedMarker>
        ))}
  
        {activeMarker && infoContent && (
        <InfoWindow
        position={activeMarker}
        onCloseClick={() => setActiveMarker(null)}
      >
        <div className="p-2 max-w-xs font-sans">
          <h2 className="text-lg font-semibold mb-2">{infoContent.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{infoContent.address}</p>
          
          {console.log("Lord forgive me!",infoContent)}
          {infoContent.photos && (
            <Slider {...settings}>
              {infoContent.photos.map((photo, index) => (
                <div key={index} className="">
                  <img
                    src={photo}
                    alt={`${infoContent.name} photo ${index + 1}`}
                    className="w-full h-auto rounded shadow-md"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </InfoWindow>
        )}
      </>
    );
  };
export default NearbyPlaces
