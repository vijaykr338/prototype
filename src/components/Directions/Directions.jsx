import React, { useEffect, useState } from "react";

const Directions = ({ map , origin,destination}) => {
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [navigationSteps, setNavigationSteps] = useState([]);

  useEffect(() => {
    if (!map || !origin || !destination){
      console.log("kuch gayab hai , either map, origin ya destnation");
      return;
    } 
    console.log("call to ho rha hai");
    console.log("ORIGIN : ", origin,"Destination ",destination);
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: origin,
        destination: { placeId : destination},
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log("dirs");
          console.log(result.routes);
          directionsRenderer.setDirections(result);


          const steps = result.routes[0].legs[0].steps.map(step => ({
            instruction: step.instructions,
            distance: step.distance.text,
            duration: step.duration.text,
          }));

          setNavigationSteps(steps);

        } else {
          console.log("RESULT IS ---------------",result);
          console.log(`Error fetching directions: ${status}`);
        }
      }
    );

    // Save the renderer instance to state
    setDirectionsRenderer(directionsRenderer);

    // Cleanup on unmount
    return () => {
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }
    };
  }, [map,origin,destination]);

  return null;
};

export default Directions;
