var countDownDate = new Date("April 30, 2025 15:37:25").getTime();

var x = setInterval(function () {

  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (hours == 0 || hours == 1 || hours == 1 || hours == 2 || hours == 3 || hours == 4 || hours == 5 || hours == 6 || hours == 7 || hours == 8 || hours == 9) {
    document.getElementById("hour").innerHTML = "0" + hours;
  } else {
    document.getElementById("hour").innerHTML = hours;
  }
  if (days == 0 || days == 1 || days == 1 || days == 2 || days == 3 || days == 4 || days == 5 || days == 6 || days == 7 || days == 8 || days == 9) {
    document.getElementById("day").innerHTML = "0" + days;
  } else {
    document.getElementById("day").innerHTML = days;
  }
  if (minutes == 0 || minutes == 1 || minutes == 1 || minutes == 2 || minutes == 3 || minutes == 4 || minutes == 5 || minutes == 6 || minutes == 7 || minutes == 8 || minutes == 9) {
    document.getElementById("minute").innerHTML = "0" + minutes;
  } else {
    document.getElementById("minute").innerHTML = minutes;
  }
  if (seconds == 0 || seconds == 1 || seconds == 1 || seconds == 2 || seconds == 3 || seconds == 4 || seconds == 5 || seconds == 6 || seconds == 7 || seconds == 8 || seconds == 9) {
    document.getElementById("second").innerHTML = "0" + seconds;
  } else {
    document.getElementById("second").innerHTML = seconds;
  }


}, 1000);