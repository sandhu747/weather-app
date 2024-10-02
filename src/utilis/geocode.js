const request = require("request");
// destructuring responnse in body and removing response
const geocode = (address, callback) => {
  const url =
    "https://api.maptiler.com/geocoding/" +
    address +
    ".json?key=kclACS82lGCGrCLsZsaG&limit=1";
  // request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(` Unable to connect to location services.`, undefined);
      // } else if (response.body.features.length === 0) {
    } else if (body.features.length === 0) {
      callback(
        ` Unable to find Location , Please try another search.`,
        undefined
      );
    } else {
      callback(undefined, {
        // Latitude: response.body.features[0].center[1],
        // Longitude: response.body.features[0].center[0],
        // Location: response.body.features[0].place_name,
        Latitude: body.features[0].center[1],
        Longitude: body.features[0].center[0],
        Location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
