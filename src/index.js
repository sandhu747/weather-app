const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

// to get localhost:3000
// define path for express configuration
const app = express();
// defining a port dynamix
const port = process.env.PORT || 3000;
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partial");

// setup static diractory to serve
const directoryPath = path.join(__dirname, "../public");
console.log(directoryPath);
app.use(express.static(directoryPath));
// setup handle bars and view location.
app.set("views", viewPath);
hbs.registerPartials(partialPath);
app.set("view engine", "hbs");
//  /home
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Mohsin Sandhu",
  });
});

// get app.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mohsin Sandhu",
  });
});

// get app.com/about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mohsin Sandhu",
  });
});
// get app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the Address",
    });
  }
  geocode(
    req.query.address,
    (error, { Latitude, Longitude, Location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(Latitude, Longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send([
          {
            forecast: forecastData.Temperature,

            address: req.query.address,
            Location: Location,
          },
        ]);
      });
    }
  );
  console.log(req.query.address);
});

// for 404 page render

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohsin Sandhu",
    errorMessage: "Help article page not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohsin Sandhu",
    errorMessage: "Page not found",
  });
});

// get /contact
app.listen(port, () => {
  console.log("app is running on port: " + port);
});
