import React, { useState, useEffect } from "react";
import { InfoWindow } from "@vis.gl/react-google-maps";
import {
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import useParkingStore from "./parkingStoreContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const NearbyPlaces = ({ place, setParkingData }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const selectedSpot = useParkingStore((state) => state.selectedSpot);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [infoContent, setInfoContent] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  

  useEffect(() => {
    if (!placesLib || !map || !place) return;

    const service = new placesLib.PlacesService(map);

    const request = {
      location: place.geometry.location,
      radius: 750,
      // type: ["parking"], I don't know what the fuck happpend 
      //but now below works, above does not 
      keyword: "parking",
      fields: ["geometry", "name", "place_id", "vicinity"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === placesLib.PlacesServiceStatus.OK) {
        const PhotoOptions = { maxHeight: 300 };

        const markers = results.map((result) => ({
          position: result.geometry.location,
          name: result.name,
          address: result.vicinity,
          placeId: result.place_id,
          photos: result.photos
            ? result.photos.map((photo) => photo.getUrl(PhotoOptions))
            : [],
        }));

        if (results.length > 0) {
          map.panTo(results[0].geometry.location);
          map.setZoom(17); // Adjust map to first result
        }

        setParkingData(results);
        setNearbyMarkers(markers);
      } else {
        console.error("Nearby search failed:", status);
      }
    });
  }, [placesLib, map, place, selectedSpot]);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker.position);

    const service = new placesLib.PlacesService(map);
    service.getDetails(
      {
        placeId: marker.placeId,
        fields: ["name", "rating", "formatted_address", "review"],
      },
      (place, status) => {
        if (status === placesLib.PlacesServiceStatus.OK) {
          setInfoContent({
            name: place.name,
            address: place.formatted_address,
            rating: place.rating,
            photos: marker.photos,
            placeId: marker.placeId,
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
          onMouseEnter={() => setHoveredMarker(index)} // Set hovered marker on hover
          onMouseLeave={() => setHoveredMarker(null)} // Reset when hover ends
          onClick={() => handleMarkerClick(marker)} // Keep click functionality
        >
          <div
            className={`relative inline-block px-2 py-1 sm:px-6 sm:py-3 text-lg font-semibold rounded-full transition-all duration-200 ${
              hoveredMarker === index
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-2 border-blue-600"
            }`}
          >
            ₹90
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-[12px] border-t-blue-600 border-x-[12px] border-x-transparent"></div>
          </div>
        </AdvancedMarker>
      ))}

      {activeMarker && infoContent && (
        <InfoWindow
          position={activeMarker}
          onCloseClick={() => setActiveMarker(null)}
          pixelOffset={new google.maps.Size(0, -10)}
        >
          <div className="sm:w-[260px] bg-white rounded-lg overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveMarker(null)}
              className="absolute top-2 right-2 z-30 bg-black/60 p-1.5 rounded-full transition-all duration-200"
            >
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image Slider */}
            {infoContent.photos && infoContent.photos.length > 0 && (
              <div className="w-full">
                <Slider {...settings}>
                  {infoContent.photos.map((photo, index) => (
                    <div key={index} className="w-full aspect-[3/2]">
                      <img
                        src={photo}
                        alt={`${infoContent.name}`}
                        className="w-full h-full p-2 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            {/* Content Section */}
            <div className="p-2">
              <div className="flex items-center justify-between mb-1.5">
                <h2 className="text-sm font-semibold text-gray-800 truncate pr-2">
                  {infoContent.name}
                </h2>
                <div className="flex items-center bg-blue-50 px-1.5 py-0.5 rounded">
                  <FaStar className="w-2.5 h-2.5 text-yellow-400 mr-0.5" />
                  <span className="text-xs font-medium text-blue-700">
                    {infoContent.rating || "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="w-2.5 h-2.5 text-blue-500 flex-shrink-0" />
                <p className="text-xs text-gray-500 ml-1 truncate">
                  {infoContent.address}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
                <span className="text-sm font-bold text-blue-600">
                  ₹90/hour
                </span>
                <button className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded font-medium">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default NearbyPlaces;
