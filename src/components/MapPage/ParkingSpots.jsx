import React, { useEffect, useState } from "react";
import { FaStar, FaWalking } from "react-icons/fa";
import { MdLocalParking } from "react-icons/md";
import boiler from "./default.jpg";
import useParkingStore from "./parkingStoreContext";

const ParkingSpots = ({ parkingData }) => {
  const setSelectedParkingID = useParkingStore(
    (state) => state.setSelectedParkingID
  );
  const setInfoWindowOpen = useParkingStore((state) => state.setInfoWindowOpen);
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen);
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);
  const [mobileUser, setMobileUser] = useState(false);

  useEffect(() => {
    setMobileUser(window.innerWidth <= 768);
  });

  const ParkingSpotClickHandler = (place_id) => {
    if (selectedParkingID !== place_id) {
      setSelectedParkingID(place_id);
      setInfoWindowOpen(true);
    } else {
      setInfoWindowOpen(!isInfoWindowOpen);
    }
  };

  
  return (
    <div className="sm:space-y-5 space-y-3 am:p-1 m-1  sm:p-2 ">
      {parkingData &&
        parkingData.sort((a, b) => {
          const aHasPrice = a.price !== "NA";
          const bHasPrice = b.price !== "NA";
          
          if (aHasPrice && !bHasPrice) return -1;
          if (!aHasPrice && bHasPrice) return 1;
          
          if (aHasPrice && bHasPrice) {
            return parseInt(a.price) - parseInt(b.price);
          }
          
          return 0;
        }).map((parking) => (
          <div
            key={parking.place_id}
            onClick={() => ParkingSpotClickHandler(parking.place_id)}
            className="
            flex 
            bg-white 
            shadow-lg 
            hover:shadow-xl 
            sm:hover:shadow-xl
            transition-all 
            duration-300 
            rounded-2xl 
            overflow-hidden 
            cursor-pointer 
            transform 
            hover:-translate-y-1
            border border-gray-100
            h-32 
            sm:h-full 
            w-full
            min-w-[280px] 
            max-w-[800px] 
            mx-auto
            
          "
          >
            <div className="flex flex-col h-full sm:p-5 p-3 m-1 font-raleway flex-grow">
              {/* Top Section - Name and Badge */}
              <div className="flex justify-between items-center sm:mb-3">
                <h2 className="sm:text-2xl font-bold text-gray-800">
                  {parking.name}
                </h2>
                {!mobileUser && (
                  <span className="sm:text-lg text-xs flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    <MdLocalParking className="mr-1" />
                    Available
                  </span>
                )}
              </div>

              {/* Bottom Container - Pushed to bottom */}
              <div className="mt-auto space-y-2">
                {/* Ratings and Walk Time */}
                <div className="flex sm:text-lg text-sm space-x-4 text-gray-600">
                  <span className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {parking.rating}
                  </span>
                  <span className="flex items-center">
                    <FaWalking className="mr-1" /> 15 mins walk
                  </span>
                </div>

                {/* Price Section */}
                <div className="sm:text-3xl text-xl space-x-2 flex items-center font-bold text-blue-600">
                  {parking.price}{" "}
                  <span className="sm:text-xl text-sm text-gray-500">
                    /hour
                  </span>
                  {mobileUser && (
                    <span className="text-xs flex items-center bg-blue-100 text-blue-800 p-2 rounded-full">
                      <MdLocalParking className="mr-1" />
                      Available
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="sm:w-48 p-1 w-24 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden">
                <img
                  src={
                    parking.photos
                      ? parking.photos.map((photo) =>
                          photo.getUrl({ maxHeight: 300 })
                        )
                      : boiler
                  }
                  className="w-full h-full object-cover object-center"
                  alt="Parking Location"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ParkingSpots;
