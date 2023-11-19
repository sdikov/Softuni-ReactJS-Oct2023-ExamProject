/**
 * Some non-sense utility for calculate distance between two coordinates
 * and converted to seconds
 */
const calculateDistance = (coord1, coord2, map) => {
	  // Convert coordinates to pixels
	  const pixel1 = map.latLngToContainerPoint(coord1);
	  const pixel2 = map.latLngToContainerPoint(coord2);
	
	  // Calculate pixel difference
	  const pixelDifference = {
	    x: pixel2.x - pixel1.x,
	    y: pixel2.y - pixel1.y,
	  };
	  
	  console.log(pixelDifference);

	  return pixelDifference;
};

export default calculateDistance;