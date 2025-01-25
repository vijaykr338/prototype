import { useEffect } from "react";

import { useMap } from "@vis.gl/react-google-maps";
import useParkingStore from "./parkingStoreContext";

const MapHandler = ({ place, marker }) => {
  const selectedSpot = useParkingStore((state) => state.selectedSpot);
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

export default MapHandler;
