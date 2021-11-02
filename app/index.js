import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Tick every second
clock.granularity = "seconds";

const digiTime = document.getElementById("digiLabel");

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
const t24 = document.getElementById("t24");
const t21 = document.getElementById("t21");
const t18 = document.getElementById("t18");
const t15 = document.getElementById("t15");
const t12 = document.getElementById("t12");
const t9 = document.getElementById("t9");
const t6 = document.getElementById("t6");
const t3 = document.getElementById("t3");

t12.text = "12";
t9.text = "9";
t6.text = "6";
t3.text = "3";

var i = 0;

var aGroup = document.getElementById("analogC");
var dGroup = document.getElementById("digitalC");
let clockBack = document.getElementById("clockBack");
const apLabel = document.getElementById("ampmLabel");

// Gets the right numbers for the clock
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  
  if (hours > 12){
    apLabel.text = "pm";
    i = 2;
  }else{
    apLabel.text = "am";
    i = 1;
  }
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
    t24.text = "12";
    t21.text = "9";
    t18.text = "6";
    t15.text = "3";
    t12.style.opacity = 0.0;
    t9.style.opacity = 0.0;
    t6.style.opacity = 0.0;
    t3.style.opacity = 0.0;
    digiTime.style.textAnchor = "end";
    dGroup.groupTransform.translate.x = -15;
    if (digiTime.style.opacity == 0.5){
      apLabel.style.opacity = 0.5;
    }else{
      
    }
  } else {
    // 24h format
    hours = util.zeroPad(hours);
    t24.text = "00";
    t21.text = "21";
    t18.text = "18";
    t15.text = "15";
    t12.style.opacity = 0.3;
    t9.style.opacity = 0.3;
    t6.style.opacity = 0.3;
    t3.style.opacity = 0.3;
    digiTime.style.textAnchor = "middle";
    dGroup.groupTransform.translate.x = 0;
    apLabel.style.opacity = 0.0;
    i = 0;
  }
  let minutess = util.zeroPad(today.getMinutes());
  digiTime.text = `${hours}:${minutess}`;
}

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}

//Check for user tap
clockBack.onclick = clockSwitch;
aGroup.onclick = clockSwitch;
var C = 0;
function clockSwitch() {
  if (C == 0){
    aGroup.groupTransform.translate.y = 500;
    digiTime.style.opacity = 0.5;
    if (i != 0){
      apLabel.style.opacity = 0.5;
    } else {
      apLabel.style.opacity = 0.0;
    }
    C++
  } else if (C !== 0){
    aGroup.groupTransform.translate.y = 0;
    digiTime.style.opacity = 0.0;
    apLabel.style.opacity = 0.0;
    C--
  } else{
  }
};
// Update the clock every tick event
clock.addEventListener("tick", updateClock);