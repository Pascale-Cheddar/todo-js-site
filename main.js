//import "./style.css"; // Importing the CSS file
import "./dark-mode.module.js";

function displayDateTime() {
  const d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let hour = d.getHours();
  hour = hour <= 9 ? "0" + hour : hour;
  let minute = d.getMinutes();
  minute = minute <= 9 ? "0" + minute : minute;

  let time = `${hour}` + ":" + `${minute}`;
  let month = months[d.getMonth()];
  let day = days[d.getDay()];

  const currDate = document.querySelector(".current-date");
  const currTime = document.querySelector(".current-time");
  currDate.innerHTML = currDate.innerHTML = `${day} ${month} ${d.getDate()}`;
  currTime.innerHTML = currTime.innerHTML = time;
  setInterval(displayDateTime, 1000);
}

//----------------------------------------------
const task = window.document.querySelector(".add-item");

let data = [];

function getEntriesFromLocalStorageAndDisplayIfExists() {
  if (localStorage.getItem("taskList") === null) return;
  data = JSON.parse(localStorage.getItem("taskList"));
  displayTasks();
}

getEntriesFromLocalStorageAndDisplayIfExists();

function addTask(e) {
  e.preventDefault();

  if (document.querySelector("#input").value == "") {
    window.alert("Your input is invalid");
    return;
  }

  const entry = {
    task: document.querySelector("#input").value,
  };

  data.push(entry);

  document.querySelector("form").reset();
  localStorage.setItem("taskList", JSON.stringify(data));

  displayTasks();
}
/*
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});
*/

function displayTasks() {
  const list = document.querySelector("#list");
  if (data === null) return;

  data = JSON.parse(localStorage.getItem("taskList"));

  document.querySelectorAll(".list-item").forEach(item => item.remove());

  data.forEach(item => {
    const entry = `<li class="list-item">
   <p class="item">${item.task}</p>
   <i class="fa-sharp fa-solid fa-trash fa-2x" aria-hidden="true"></i>
 </li>`;
    list.innerHTML += entry;
  });
}

const deleteBtn = document.querySelector(".fa-trash");

/* 
1. If the target of the event is an element that contains the class "fa-trash"
2. Then, assign the element that is the target of the event to the variable item
3. Remove the item
4. Filter the data array, and remove the item that has the same textContent as the item's first child
5. Set the taskList key in localStorage to the data array, which is now one item shorter 
*/

function deleteTask(e) {
  if (e.target.classList.contains("fa-trash")) {
    const item = e.target.parentElement;
    item.remove();
    data = data.filter(entry => entry.task !== item.children[0].textContent);
    localStorage.setItem("taskList", JSON.stringify(data));
  }
}

/*
function strikeThroughTaskIfCompleted(e) {
  if (e.target.classList.contains("list-item")) {
    const item = e.target.parentElement;
    item.classList.add("done");
  }
}
todo have to undone the strike through for new tasks
 addEventListener("click", strikeThroughTaskIfCompleted);
*/

document.addEventListener("click", deleteTask);

addEventListener("load", displayDateTime);

document.querySelector("#send-btn").addEventListener("click", addTask);
