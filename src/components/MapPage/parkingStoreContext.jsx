import React from "react";
import { create } from "zustand";

const useParkingStore = create((set) => ({
  selectedParkingID: null,
  isInfoWindowOpen: false,
  selectedSpot: null,
  //I am using a parkingData variable at another place which is the same as the below, 
  //this one provides the search results GLOBALLY, as opposed to prop drilling
  parkingResults: [],
  setParkingResults: (data) => set({parkingResults: data}),
  setSelectedParkingID: (id) => set({ selectedParkingID: id }),
  setInfoWindowOpen: (isOpen) => set({ isInfoWindowOpen: isOpen }),
  setSelectedSpot: (place) => set({ selectedSpot: place }),
}));

export default useParkingStore;
