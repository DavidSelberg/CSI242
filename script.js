"use-strict";

//Create a date object, date & time strings
var date = new Date;
var dateString = date.toDateString();
var timeString = date.toLocaleTimeString();

//find out the number of days until next sunday
var days = 0;
//self-invoking function
(function() {
    //switch on the current day of the week
    switch (date.getDay()) {
        case 0:
            days = 7;
            break;
        case 1:
            days = 6;
            break;
        case 2:
            days = 5;
            break;
        case 3:
            days = 4;
            break;
        case 4:
            days = 3;
            break;
        case 5:
            days = 2;
            break;
        case 6:
            days = 1;
            break;
    }
})();

//Use .createElement() to create the newsletter popup
var newsletterElement = document.createElement("div");

//set the innerHTML
newsletterElement.innerHTML = (
    `<h1>Sign Up For Our Newsletter</h1>\
    <p id="datetime">It's currently ${dateString}, ${timeString}</p>\
    <br>\
    <p>\
        Want to stay up to date on the latest news about arctic foxes?<br>\
        Sign up for our newsletter and you\'ll get more fox news than your grandma.\
        The next issue will be released in ${days} days on Sunday\
    </p>`
);

//use an arrow function to add the form to the newsletter
const arrowFunction = (tempElement) => tempElement.innerHTML += `
    <form>\
        <label for="email">Email</label>\
        <input type="email" name="email" id="email" minlength="3" maxlength="64" autofocus required/>\
        <label for="name" >Full Name</label>\
        <input type="text" name="name" id="name" required/>\
        <label>Choose your notification preferances</label>\
        <select name="notifPrefrence" id="notifPrefrence">\
        <option value="1">Only important announcements</option>\
        <option value="2">Only the monthly newsletter</option>\
        <option value="3">All emails</option>\
        </select>\
        <label for="check">I agree to be contacted at the above email</label>\
        <input type="checkbox" name="check" required/>\
        <button type="submit" id="signupbtn" onsubmit="hide()">Submit</button>\
        <button type="button" id="cancelbtn" onclick="hide()">Cancel</button>\
    </form>\
    <div id="hoverExit"><p>Hover to close</p></div>`;

//call the arrow function
arrowFunction(newsletterElement);

//add the onload listener
window.addEventListener("load", function() {
    //display the newsletter
    document.getElementById("newsletter").appendChild(newsletterElement);
    //add the mouse event listener to the hover exit div
    document.getElementById("hoverExit").addEventListener("mouseenter", function() {hide()})
});

var timeUpdate = setInterval(updateClock, 1000);

//add event listener for esc key
document.addEventListener("keydown", function escPressed(e) {
    if (e.key == "Escape") {
        //hide the popup and remove the listener
        hide();
        document.removeEventListener("keydown", escPressed);
    }
});

function updateClock() {
    date = new Date;
    dateString = date.toDateString();
    timeString = date.toLocaleTimeString();
    document.getElementById("datetime").innerHTML = `It's currently ${dateString}, ${timeString}`;
}

//hide the newsletter popup
var hide = function() {
    document.querySelector(".newsletter").removeChild(newsletterElement);
    document.querySelectorAll(".newsletter")[0].classList.remove("newsletter");
    clearInterval(timeUpdate);
    //Display the newsletter sign up again after 60 seconds
    setTimeout(function(){
        document.querySelectorAll(".newsletter")[0].appendChild(newsletterElement);
        document.getElementById("newsletter").classList.add("newsletter");
    }, 60000);
};

//display upcoming events on button press
function showEvents() {
    //get 3 randomnumbers (0-7)
    var amounts = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)];
    //sort the list
    amounts.sort();
    //add each number of days to the current day
    var dates = [date.getDate() + amounts[0], date.getDate() + amounts[1], date.getDate() + amounts[2]]
    //add descriptions
    var descriptions = ["Arctic Fox Exhibit", "Seattle Zoo Event", "King County Library Event"]

    //create the html content
    var eventHTML = "<table>\
        <tr><th>Date</th><th>Description</th></tr>";

    //use a for loop to add the events
    for (var i = 0; i < 3; i++) {
        eventHTML += `<tr><td>${date.getMonth()}/${dates[i]}/${date.getFullYear()}</td><td>${descriptions[i]}</td></tr>`;
    }

    //close the table
    eventHTML += "</table>";

    //set the innerHTML
    document.getElementById("upcomingEvents").innerHTML = eventHTML;
}

//create the link element and set the attributes
var ss_insert = document.createElement("link");
ss_insert.setAttribute("rel", "stylesheet");
ss_insert.setAttribute("id", "styleLink");
ss_insert.setAttribute("type", "text/css")
ss_insert.setAttribute("href", "css/ss_insert.css");

//add the link element to the head
document.head.appendChild(ss_insert);

//add "addedStyles" to the head
var addedStyles = document.createElement("style");
document.head.appendChild(addedStyles);

//add styles for the element with id "hoverExit"
document.styleSheets[document.styleSheets.length - 1].insertRule(
    "#hoverExit {\
        width: 100%;\
        background-color: #808080;\
        display: flex;\
        flex-direction: column;\
        padding: 2vh 0 2vh 0;\
        margin-top: 2vh;\
        border-radius: 4em;\
    }", 0
);

//add styles for the paragraph inside of the element with id "hoverExit"
document.styleSheets[document.styleSheets.length - 1].insertRule(
    "#hoverExit > p {\
        color: white;\
    }", 1
);