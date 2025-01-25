import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaList, FaMap } from "react-icons/fa"; // Add these imports
import PlaceAutocomplete from "./PlaceAutocomplete";
import ParkingSpots from "./ParkingSpots";
import InformationWindow from "./InformationWindow";
import useParkingStore from "./parkingStoreContext";

const SideWindow = ({ onPlaceSelect, parkingData, setParkingID }) => {
  const [view, setView] = useState("list");
  const [selectedSpotView, setSelectedSpotView] = useState(false);
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen);
  const setInfoWindowOpen = useParkingStore((state) => state.setInfoWindowOpen);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    
  console.log(isMobile)
    
  })
  

  
// Add handleBackButton function before return statement
const handleBackButton = () => {
  setInfoWindowOpen(false);
  setView("list");
  // Enable body scroll
  document.body.style.overflow = 'auto';
};

// ...existing return statement and JSX...
  return (
    <div className={`
      fixed font-raleway 
      top-0 left-0 right-0 bottom-0 
      ${view === "list" ? "bg-white pointer-events-auto" : "bg-transparent md:bg-white pointer-events-none"} 
      shadow-lg overflow-hidden 
      z-50 
      h-screen md:h-full
      w-full md:w-auto 
      md:relative md:top-auto md:left-auto md:right-auto md:bottom-auto
    `}>
      {/* Search Section */}
      <div className="bg-blue-600 text-white p-3 sm:p-6 pointer-events-auto">
        <h1 className="font-bold text-xl sm:text-xl md:text-5xl mb-4 sm:mb-8">
          Book Parking Near
        </h1>
        <PlaceAutocomplete onPlaceSelect={onPlaceSelect} className="w-full" />
      </div>

      {/* Mobile View Toggle */}
      <div className="flex border-b md:hidden bg-white pointer-events-auto">
  <button 
    onClick={() => setView('list')}
    className={`flex-1 py-3 text-center ${view === 'list' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
  >
    <div className="flex items-center justify-center gap-2">
      <FaList className="text-lg" />
      <span>Parking Spots</span>
    </div>
  </button>
  <button 
    onClick={() => setView('map')}
    className={`flex-1 py-3 text-center ${view === 'map' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
  >
    <div className="flex items-center justify-center gap-2">
      <FaMap className="text-lg" />
      <span>View Map</span>
    </div>
  </button>
</div>

      {/* Mobile Information Window - Only show on mobile */}
      {isInfoWindowOpen && isMobile && (
        <div className="fixed inset-0 bg-white z-50">
          <button
            onClick={handleBackButton}
            className="absolute top-4 left-4 z-50 bg-black/50 p-2 rounded-full"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="h-full overflow-y-auto">
            <InformationWindow />
          </div>
        </div>
      )}

      {/* Desktop Information Window - Only show on desktop */}
      {isInfoWindowOpen && isMobile && (
        <div className="hidden md:block w-full h-full">
          <InformationWindow />
        </div>
      )}

      {/* Content area */}
      <div className={`h-[calc(100vh-150px)] sm:h-[calc(100vh-200px)] overflow-y-auto p-1 sm:p-4 pointer-events-auto
        ${view === "list" && !isInfoWindowOpen ? "block" : "hidden md:block"}`}
      >
        <ParkingSpots parkingData={parkingData} />
      </div>
    </div>
  );
};
export default SideWindow;
