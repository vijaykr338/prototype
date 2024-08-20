import React from "react";
import { create } from "zustand";

const useParkingStore = create((set) => ({
  selectedParkingID: null,
  isInfoWindowOpen: false,
  selectedSpot: null,
  parkingPlaces: null,
  setSelectedParkingID: (id) => set({ selectedParkingID: id }),
  setInfoWindowOpen: (isOpen) => set({ isInfoWindowOpen: isOpen }),
  setSelectedSpot: (place) => set({ selectedSpot: place }),
  setParkingPlaces: (locations) => set({parkingPlaces: locations})
}));

export default useParkingStore;
