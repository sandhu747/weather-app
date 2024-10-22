const request = require("request");
const forecast = (lati, longi, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=052c5ae2d8866369a1b7d683a79a077a&query=" +
    lati +
    "," +
    longi;
  // destructuring responnse in body and removing response
  // request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect for location services", undefined);
      // } else if (response.body.error) {
    } else if (body.error) {
      callback("Unable to find location, please try another search", undefined);
    } else {
      callback(undefined, {
        Temperature: `There is ${body.current.temperature} degree outside and feels like ${body.current.feelslike} degree.`,
      });
    }
  });
};
// forecast(25.276987, 55.296249, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });
module.exports = forecast;
