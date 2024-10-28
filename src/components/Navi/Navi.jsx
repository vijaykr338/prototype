// import React, { useState, useEffect } from 'react';
// import {
//   GoogleMap,
//   useLoadScript,
//   DirectionsRenderer,
//   useMapsLibrary,
//   useMap,
// } from "@vis.gl/react-google-maps";

// const libraries = ['places', 'marker', 'drawing', 'directions'];

// const Navi = ({ origin, destination, waypoints }) => {
//   const map = useMap();
//   const DirService = useMapsLibrary('DirectionsService');
//   const [directionsService, setDirectionsService] = useState(null);
//   const [response, setResponse] = useState(null);

//   useEffect(() => {
//     if (DirService) {
//       setDirectionsService(new DirService());
//     }
//   }, [DirService]);

//   const req = {
//     origin: origin,
//     destination: destination,
//     waypoints: waypoints,
//     provideRouteAlternatives: false,
//     travelMode: 'DRIVING',
//     drivingOptions: {
//       trafficModel: 'pessimistic',
//     },
//   };

//   useEffect(() => {
//     if (directionsService) {
//       directionsService.route(req, (response, status) => {
//         if (status === 'OK') {
//           setResponse(response);
//         } else {
//           console.error(`Directions request failed due to ${status}`);
//         }
//       });
//     }
//   }, [directionsService, req]); // Added req to dependency array

//   return (
//     <div>
//       {response && <DirectionsRenderer directions={response} />}
//     </div>
//   );
// };

// const Map = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyA2Mvo1ZUyeO1ZAxpE_eMsEM6lKWGUnIDE', // Replace with your API key
//     libraries,
//   });

//   const [origin, setOrigin] = useState('Chicago, IL');
//   const [destination, setDestination] = useState('Los Angeles, CA');
//   const [waypoints, setWaypoints] = useState([
//     {
//       location: 'Joplin, MO',
//       stopover: false,
//     },
//     {
//       location: 'Oklahoma City, OK',
//       stopover: true,
//     },
//   ]);

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <GoogleMap
//       mapContainerStyle={{ width: '100vw', height: '100vh' }}
//       center={{ lat: 37.0902, lng: -95.7129 }}
//       zoom={4}
//     >
//       <Navi origin={origin} destination={destination} waypoints={waypoints} />
//     </GoogleMap>
//   );
// };

// export default Map;