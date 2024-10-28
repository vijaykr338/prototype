import React from "react";


const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const EmbeddedMap = ({ origin, destination }) => {
  const mapSrc = `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&mode=driving`;

  return (
    <iframe
      width="100%"
      height="600"
      frameBorder="0"
      style={{ border: 0 }}
      src={mapSrc}
      allowFullScreen
      title="Google Maps Directions"
    ></iframe>
  );
};

export default EmbeddedMap;
