let url="http://tyrerunner.com/url-data?licenceplate={registration_plate}&sensorreadings={sensor_readings}"


function getSensorReadings(url) {
  const parsedUrl = new URL(url);
  const searchParams = new URLSearchParams(parsedUrl.search);
  return searchParams.get('sensorreadings');
}
function getPlateReadings(url) {
  const parsedUrl = new URL(url);
  const searchParams = new URLSearchParams(parsedUrl.search);
  return searchParams.get('licenceplate');
}


export { getSensorReadings,getPlateReadings};