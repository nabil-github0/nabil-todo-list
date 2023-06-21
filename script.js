var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var dataArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
var inputToggleArray = localStorage.getItem("toggle") ? JSON.parse(localStorage.getItem("toggle")) : [];
var currentYearElement = document.getElementById("currentYear");
var currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

function inputLength() {
  return input.value.length;
}

function addOrRemoveDataFromLocalStorage() {
   localStorage.setItem("items", JSON.stringify(dataArray));
   localStorage.setItem("toggle", JSON.stringify(inputToggleArray));
}

function addDataToLocalStorage() {
  dataArray.push(input.value);
  if (inputToggleArray.length < dataArray.length) {
	inputToggleArray.push("");
  }
  addOrRemoveDataFromLocalStorage();
}

function removeDataFromLocalStorage(index) {
  dataArray.splice(index, 1);
  inputToggleArray.splice(index, 1);
  addOrRemoveDataFromLocalStorage();
}

function updateToggleDataToLocalStorage(element,index) {
    if (element.classList.contains("done")) {
		inputToggleArray[index] = "done";
	  } else {
		inputToggleArray[index] = "";
	  }
	  localStorage.setItem("toggle", JSON.stringify(inputToggleArray));
}

function viewData(data) {
  var li = document.createElement("li");
  var img = document.createElement("img");
  var div = document.createElement("div");
  var container = document.createElement("div");
  var del = document.createElement("button");

  li.appendChild(document.createTextNode(data.charAt(0).toUpperCase() + data.slice(1)));
  del.append(img,document.createTextNode("Delete"));
  div.append(li,del);
  container.appendChild(div);
  ul.appendChild(container);

  img.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABmUlEQVR4nO2Y3UrDMBTH+1S9Vcit4gP4ACp4o+Ld0KvpC3gjAzdhmyCCCLZqpy8w7Jw3yt4jXdsk7ZEWHNJWNNvStHAOHChJP/6/c3LSJAYlJtTZDd0CKAIQ/VGkOISI/kjSqhSxt7kB/uFuoSd9lQbw97cBhIBfTQjw97aqCxB2zuEvS+4pHYD1OwCcQWnGGbBee3kA8XQKZVvseUvMQK9dfga6F+XXgA43ZG4Omg0IW2dKPWg21AGIsat89IixiwAgkwH+dF+cmTgCPrBThzjOR/rtFbhj6c1ANPlI2721lTzYwJ49x58fcv3JM5SYEE0+9QH8/FjW2GVr1pdcZ+0/76QIQDADgEOIYBGbOAsxnEZN/JEB/okzhksJgos5qP9qNPreD6yv1mQ/MBrmhToWiPeiHVmcCucvj8U7srEL3LHz7aOhOgBu34Fq49atOgD/YEc5gC95+Ct9sMVurpSJZ9ddKS1zASQenB6nBQwsXFx1GKbvCk6OpHXMDVAlN3QLoAhA9EeR4hAi+iNJsYhJPd3QLWBRgC+2tpH2E0LJuQAAAABJRU5ErkJggg==")
  div.classList.add("oneLine");
  container.classList.add("item-container");

  del.addEventListener("click", function () {
    var parentDiv = del.parentElement.parentElement;
    var index = Array.from(ul.children).indexOf(parentDiv);
    parentDiv.remove();
    removeDataFromLocalStorage(index);
  });

  li.addEventListener("click", function () {
    var liParentDiv = li.parentElement.parentElement;
    var index = Array.from(ul.children).indexOf(liParentDiv);
    li.classList.toggle("done");
    updateToggleDataToLocalStorage(li,index);

})
}

function createListElement() {
  addDataToLocalStorage();
  viewData(input.value);
  input.value = "";
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createListElement();
  }
}

function applyInitialClasses() {
	var items = ul.getElementsByClassName("item-container");
	for (var i = 0; i < items.length; i++) {
	  var item = items[i].getElementsByTagName("li")[0];
	  if (inputToggleArray[i] === "done") {
		item.classList.add("done");
	  }
	}
  }

dataArray.forEach((element) => {
  viewData(element);
});

applyInitialClasses();


button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
