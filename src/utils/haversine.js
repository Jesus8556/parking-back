const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en km
  const toRad = (deg) => deg * (Math.PI / 180);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // En metros
  console.log(`Distancia calculada: ${distance.toFixed(2)} metros`);

  return distance; // Distancia en metros
}

module.exports = {
  haversine
}