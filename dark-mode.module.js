import SunCalc from "suncalc";

const getCoords = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    long: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};

const coords = await getCoords();

const times = SunCalc.getTimes(new Date(), coords.lat, coords.long);
// add '0' to  hours and minutes if they are less than 10 (e.g. 09:05)
let sunriseStrHour = times.sunrise.getHours();
sunriseStrHour =
  times.sunrise.getHours() <= 9 ? "0" + times.sunrise.getHours() : times.sunrise.getHours();

let sunriseStrMinute = times.sunrise.getMinutes();
sunriseStrMinute =
  times.sunrise.getMinutes() <= 9 ? "0" + times.sunrise.getMinutes() : times.sunrise.getMinutes();
const sunriseStr = sunriseStrHour + ":" + sunriseStrMinute;

let sunsetStrHour = times.sunset.getHours();
sunsetStrHour =
  times.sunset.getHours() <= 9 ? "0" + times.sunset.getHours() : times.sunset.getHours();
let sunsetStrMinute = times.sunset.getMinutes();
sunsetStrMinute =
  times.sunset.getMinutes() <= 9 ? "0" + times.sunset.getMinutes() : times.sunset.getMinutes();
const sunsetStr = sunsetStrHour + ":" + sunsetStrMinute;

const now = new Date();
let hour = now.getHours();
hour = hour <= 9 ? "0" + hour : hour;
let minute = now.getMinutes();
minute = minute <= 9 ? "0" + minute : minute;
const NowStr = `${hour}` + ":" + `${minute}`;

//----------------------------------------------
export function changeAppearanceBetweenLightOrDarkBasedOnTime() {
  if (!NowStr) {
    alert("cannot read your location, please turn on location");
    return;
  } // guard clause

  const root = document.querySelector(":root");
  const date = document.querySelector(".current-date");
  const h1Text = document.querySelector("h1");
  const pText = document.querySelector(".current-time");
  const item = document.querySelector(".item");
  const trashFa = document.querySelector(".fa-trash");

  if (NowStr > sunriseStr && NowStr < sunsetStr) {
    console.log("light mode");
  } else {
    root.style.setProperty("--light-bg", "hwb(220 12% 78%)");
    root.style.setProperty("--light-secondary", "hwb(222 11% 85%)");
    root.style.setProperty("--light-btn-bg", "hwb(331 2% 0%)");
    root.style.setProperty("--light-input-bg", "hwb(0 100% 0% / 0.17)");
    date.style.setProperty("color", "hwb(0 100% 0%)");
    h1Text.style.setProperty("color", "hwb(331 2% 0%");
    pText.style.setProperty("color", "hwb(331 2% 0%");
    item.style.setProperty("color", "hwb(331 2% 0%");
    trashFa.style.setProperty("color", "hwb(331 2% 0%");
  }
}

window.addEventListener("load", changeAppearanceBetweenLightOrDarkBasedOnTime);
