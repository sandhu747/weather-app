fetch("http://localhost:3000/weather?address=Dubai").then((responce) => {
  responce.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data[0].forecast);
      console.log(data[0].address);
      console.log(data[0].Location);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  first.textContent = "Loading...";
  second.textContent = "";
  third.textContent = "";
  // before http:localhost:300/weather?address but i remove to add dynamix port no in fetch function
  fetch("/weather?address=" + location).then((responce) => {
    responce.json().then((data) => {
      if (data.error) {
        first.textContent = data.error;
      } else {
        second.textContent = data[0].forecast;
        first.textContent = data[0].address;
        third.textContent = data[0].Location;
      }
    });
  });
  search.value = "";
});
