export function date() {
  let currentDate = new Date();
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = currentDate.toLocaleDateString("en-GB", dateOptions);
  const time = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
  document.getElementById("header_date").innerHTML = `<span class="date">${date}</span><span class="time">${time}</span>`;
}

export function greet() {
  let currentTime = new Date();
  let greet = Math.floor(currentTime.getHours() / 6);
  switch (greet) {
    case 0:
      document.getElementById("header_greet").innerHTML = "Good night :)";
      break;
    case 1:
      document.getElementById("header_greet").innerHTML = "Good morning :)";
      break;
    case 2:
      document.getElementById("header_greet").innerHTML = "Good afternoon :)";
      break;
    case 3:
      document.getElementById("header_greet").innerHTML = "Good evening :)";
      break;
  }
}
