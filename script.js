var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var dataArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):[];

function inputLength() {
	return input.value.length;
}

function addDataToLocalStorage () {
	dataArray.push(input.value);
	localStorage.setItem("items",JSON.stringify(dataArray));
}

function removeDataFromLocalStorage(index) {
	 dataArray.splice(index,1);
     localStorage.setItem("items",JSON.stringify(dataArray));
}

function viewData(data) {
	var li = document.createElement("li");
	var button = document.createElement("button");
	var div = document.createElement("div");
	li.appendChild(document.createTextNode(data.charAt(0).toUpperCase() + data.slice(1)));
	button.appendChild(document.createTextNode("Delete"));
	div.append(li,button);
	ul.appendChild(div);
	button.classList.add("delete");
	div.classList.add("inline");

	button.addEventListener("click",function(){
		var parentDiv = button.parentElement; 
        var index = Array.from(ul.children).indexOf(parentDiv);
        parentDiv.remove(); 
        removeDataFromLocalStorage(index);
})

	li.addEventListener("click",function() {
		li.classList.toggle("done");
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

dataArray.forEach(element => {
	viewData(element)
});


button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

