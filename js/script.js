async function getData(city) {
  let apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`
  );

  let response = await apiResponse.json();

  let { country, name, localtime } = response.location;
  let { condition, temp_c } = response.current;

  // ---------------------get 3 days
  let today = new Date(localtime).toLocaleString("en-us", { weekday: "long" });

  let nextDay = new Date(localtime);
  nextDay.setDate(nextDay.getDate() + 1);
  let tomorrow = nextDay.toLocaleString("en-us", { weekday: "long" });

  let afterNextDay = new Date(localtime);
  afterNextDay.setDate(afterNextDay.getDate() + 2);
  let afterTomorrow = afterNextDay.toLocaleString("en-us", { weekday: "long" });

  setData();
  nextDays();
  after_Next_Day();
  function setData() {
    document.getElementById("day").innerHTML = today;
    document.getElementById("date").innerHTML =
      response.forecast.forecastday[0].date;
    document.getElementById("tomorrow").innerHTML = tomorrow;
    document.getElementById("afterTomorrow").innerHTML = afterTomorrow;
    document.getElementById("city").innerHTML = name;
    document.getElementById("degree").innerHTML = temp_c;
    document.getElementById("condition").innerHTML = condition.text;
    document.getElementById("icon").src = condition.icon;
  }

  function nextDays() {
    let { maxtemp_c, mintemp_c, condition } =
      response.forecast.forecastday[1].day;
    // console.log(response.forecast.forecastday[1]);
    let nextDay = ``;
    nextDay += `
    <img id="icon1" src="${condition.icon}" alt="condition">
              <div class="temp-2">
              <h4>${maxtemp_c}</h4>
              <span>C</span>
              </div>
              <h6>${mintemp_c}</h6>
              <p class="condition">${condition.text}</p>
    `;
    document.getElementById("nextDay").innerHTML = nextDay;
  }

  function after_Next_Day() {
    let { maxtemp_c, mintemp_c, condition } =
      response.forecast.forecastday[2].day;
    // console.log(response.forecast.forecastday[1]);
    let afterNextDay = ``;
    afterNextDay += `
    <img id="icon2" src="${condition.icon}" alt="condition">
              <div class="temp-2">
              <h4>${maxtemp_c}</h4>
              <span>C</span>
              </div>
              <h6>${mintemp_c}</h6>
              <p class="condition">${condition.text}</p>
    `;

    document.getElementById("afterNextDay").innerHTML = afterNextDay;
  }
}
(function () {
  getData("cairo");
})();

let searchInput = document.getElementById("search");
searchInput.addEventListener("input", function () {
  getData(searchInput.value);
});

function timeNow() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = "AM";
  if (hour >= 12) {
    am_pm = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  document.getElementById("timeNow").innerHTML = hour + ":" + min + ":" + sec +" " + am_pm;
}

setInterval(timeNow, 1000);