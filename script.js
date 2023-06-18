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

  li.appendChild(document.createTextNode(data.charAt(0).toUpperCase() + data.slice(1)));
  div.append(li, img);
  container.appendChild(div);
  ul.appendChild(container);

  img.setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSmrzk5MkXbdZqNqoAD1YMr12TTkypWPuIuTRaxYsqclqHpbac1xRrv3qSq87mztiOZDk&usqp=CAU")
  div.classList.add("oneLine");
  container.classList.add("item-container");

  img.addEventListener("click", function () {
    var parentDiv = img.parentElement.parentElement;
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
