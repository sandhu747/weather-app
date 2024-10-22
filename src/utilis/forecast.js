const request = require("request");
const forecast = (lati, longi, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lati +
    "&lon=" +
    longi +
    "&appid=9c48be90b27b9f2d15076b1587daa02a&units=metric";
  // destructuring responnse in body and removing response
  // request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect for location services", undefined);
      // } else if (response.body.error) {
    } else if (body.error) {
      callback("Unable to find location, please try another search", undefined);
    } else {
      const comment = `weather is ${body.weather[0].main} Temperature :${body.main.temp} feels_like :${body.main.feels_like} degree wind_speed: ${body.wind.speed}
//    pressure: ${body.main.pressure} and humidity is ${body.main.humidity}.`;

      callback(undefined, { comment });
    }
  });
};
// // forecast(25.276987, 55.296249, (error, data) => {
// console.log("Error", error);
// console.log("Data", data);
// // });
module.exports = forecast;
