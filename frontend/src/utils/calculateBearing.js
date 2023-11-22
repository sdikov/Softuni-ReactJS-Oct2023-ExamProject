/**
 * calculate the bearing (or azimuth) between two geographical points
 * (given their latitude and longitude)
 */
const calculateBearing = (lat1, lon1, lat2, lon2) => {
	const dLon = (lon2 - lon1) * (Math.PI / 180);

	const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
	const x =
		Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
		Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos(dLon);

	let brng = Math.atan2(y, x);

	// Convert radians to degrees
	brng = (brng * 180) / Math.PI;

	// Normalize to a compass bearing (in the range 0° to 360°)
	brng = (brng + 360) % 360;

	return brng;
}

export default calculateBearing;