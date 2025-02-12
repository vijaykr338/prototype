import parkDATA from '../parkDATA.json';
import parkDATA_2 from '../parkDATA_2.json';

const extractCoords = (gmapLink) => {
  const coordsMatch = gmapLink.match(/destination=([-\d.]+),([-\d.]+)/);
  if (coordsMatch) {
    return {
      lat: parseFloat(coordsMatch[1]),
      lng: parseFloat(coordsMatch[2])
    };
  }
  return null;
};

const findClosestParkingSpot = (location, parkingData) => {
  const threshold = 0.005; // Approximately 500 meters
  let closestSpot = null;
  let minDistance = Number.MAX_VALUE;

  for (const area of parkingData) {
    for (const spot of area.RESULTS || []) {
      const spotCoords = extractCoords(spot.GMAP_NAV_LINK);
      if (!spotCoords) continue;

      const distance = Math.sqrt(
        Math.pow(spotCoords.lat - location.lat, 2) + 
        Math.pow(spotCoords.lng - location.lng, 2)
      );

      if (distance < threshold && distance < minDistance) {
        minDistance = distance;
        closestSpot = spot;
      }
    }
  }
  return closestSpot;
};

export const enhanceMarkersWithParkingData = (places) => {
  if (!places?.length) return [];
  
  const allParkingData = [...parkDATA, ...parkDATA_2];
  
  return places.map(place => {
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    const parkingMatch = findClosestParkingSpot(location, allParkingData);

    return {
      ...place,
      placeId: place.place_id,
      price: parkingMatch?.PRICE || "NA",
      timings: parkingMatch?.TIMING_DATA || "24 Hours",
      highlights: parkingMatch?.HIGHLIGHTS || "None",
      distance: parkingMatch?.DISTANCE || "NA",
      navigationLink: parkingMatch?.GMAP_NAV_LINK || null,
      parkingName: parkingMatch?.NAME || place.name
    };
  });
};