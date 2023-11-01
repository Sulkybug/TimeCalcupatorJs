const daysNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function add_time() {
  let hours = 0;
  let minutes = 0;
  let dayOfTheWeek = "";
  let countOfdays = "";
  let assignedDay = false;

  for (let i = 0; i < arguments.length; i++) {
    let time = arguments[i].split(" ");

    let actualTime = time[0].split(":");
    let hour = Number(actualTime[0]);
    let min = Number(actualTime[1]);

    if (isNaN(hour) && isNaN(min)) {
      hour = 0;
      min = 0;
    }
    hours += hour;
    minutes += min;
  }

  let dayNight = arguments[0].split(" ");
  dayNight = dayNight[1];

  if (arguments.length > 2) {
    dayOfTheWeek = arguments[2].split(" ");
    dayOfTheWeek = dayOfTheWeek[0].toLowerCase();
    dayOfTheWeek = dayOfTheWeek[0].toUpperCase() + dayOfTheWeek.substring(1);
  }

  if (minutes > 60) {
    minutes = minutes - 60;
    hours += 1;
  }

  if (minutes == 0) {
    minutes = "00";
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (hours == 12 && dayNight == "AM") {
    dayNight = "PM";
  }

  if (hours > 24) {
    assignedDay = true;
    let count = Math.round(hours / 24);
    countOfdays = `(${count} days later)`;
    hours -= arguments[1].split(":")[0];
    hours += 12;
    passingDays(count);
  }

  if (hours > 12 && dayNight == "AM") {
    hours -= 12;
    dayNight = "PM";
  }

  if (hours > 12 && dayNight == "PM") {
    hours -= 12;
    dayNight = "AM";
    if ((assignedDay = false)) {
      count = 0;
      passingDays(count);
    }
    if (arguments.length > 2) {
      dayOfTheWeek = `, ${dayOfTheWeek}`;
    } else if (countOfdays == "") {
      countOfdays = "(next day)";
    }
  } else if (arguments.length > 2) {
    dayOfTheWeek = `, ${dayOfTheWeek}`;
  }

  function passingDays(count) {
    for (let i = 0; i < daysNames.length; i++) {
      if (dayOfTheWeek == daysNames[i]) {
        dayOfTheWeek = daysNames[i + count];
        return dayOfTheWeek;
      }
    }
  }

  return `${hours}:${minutes} ${dayNight}${dayOfTheWeek} ${countOfdays}`;
}

// Returns: 6:10 PM
console.log(add_time("3:00 PM", "3:10")); 

// Returns: 2:02 PM, Monday
add_time("11:30 AM", "2:32", "Monday"); 

// Returns: 12:03 PM
add_time("11:43 AM", "00:20"); 

// Returns: 1:40 AM (next day)
add_time("10:10 PM", "3:30"); 

//Returns: 12:03 AM, Thursday (2 days later)
add_time("11:43 PM", "24:20", "tueSday");

//# Returns: 7:42 AM (9 days later)
add_time("6:30 PM", "205:12");
