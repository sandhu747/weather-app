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

  fetch("/weather?address=" + location).then((responce) => {
    responce.json().then((data) => {
      if (data.error) {
        first.textContent = data.error;
      } else {
        second.textContent = data.forecast;
        first.textContent = data.address;
        third.textContent = data.Location;
      }
    });
  });
  search.value = "";
});
