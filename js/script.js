var adoptData = JSON.parse(localStorage.getItem('mydata'));

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// initiate layout and plugins
let d = new Date();
let today = days[d.getDay()];
let currentMonth = ("0" + (d.getMonth() + 1)).slice(-2)
let currentDate = ("0" + d.getDate()).slice(-2)
let currentYear = d.getFullYear();
let tomorrow = days[d.getDay() + 1];
let timeNow = formatAMPM(d);
let upcomingClassTime;
let upcomingClass;
let counterText;
let blinker = ':';
let unclicked = true;
let danger = true;
let alarm = false;
let skipped = false;
let tomorrowClicked = false;
let viewClicked = false;
let filterClicked = false;
let todayDate
diffArr = [], classesDoneArr = [], courseArr = [], idArr = [], classHrMinFrmt = [];

let textTitle = document.getElementById("page-title");
textTitle.innerHTML = "Today is " + today + ", Time is: " + timeNow;

if (localStorage.getItem("date") != d.toDateString()) {
    localStorage.clear();
}

localStorage.setItem("date", d.toDateString());

let tableData = document.querySelectorAll(".gradeX");
let tableHead = document.querySelectorAll("#sample_1")[0];
let upcomingContext = document.querySelector("#upcoming");
let counterContext = document.querySelector("#countdown");
let alarmButton = document.getElementById('eventMan');
let refreshButton = document.getElementById('creater');
// set reminder code 
const remindTitle = document.getElementById('title');
const remindDate = document.getElementById('date');
const remindTime = document.getElementById('time');
const remindDesc = document.getElementById('description');
const remindNum = document.getElementById('number');
const submitBtn = document.getElementById('submitBtn');
const remind = document.getElementById('remind');
const modaldiv = document.querySelector('.modaldiv');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close');
const remindDiv = document.querySelector('.reminderNotice');


let RemindObj;
var adoptData;
// localStorage.setItem("title")
// test

// let testObject, retrievedObject;
// testObject =
//     { 'title': 'hi', 'date': 25, 'time': 3, 'notifi': 2 };
// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));

// // Retrieve the object from storage
// retrievedObject = localStorage.getItem('testObject');

remind.addEventListener('click', function (e) {
    e.preventDefault();

    modaldiv.classList.remove('hideModal')
    overlay.classList.remove('hideModal')
})
closeBtn.addEventListener('click', function (e) {
    e.preventDefault();

    modaldiv.classList.add('hideModal')
    overlay.classList.add('hideModal')


})
// var adoptData = JSON.parse(localStorage.getItem('mydata'));

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // at first check if localstorage has any data or not
    adoptData = JSON.parse(localStorage.getItem('mydata'));
    RemindObj = {
        'title': remindTitle.value,
        'date': remindDate.value,
        'time': remindTime.value,
        'desc': remindDesc.value,
        'notify': remindNum.value
    }

    // if data is available then we will create another object and oush it to array then set the whole array to localstorage
    if (adoptData) {
        console.log('first condition');

        adoptData.push(RemindObj);
        localStorage.setItem('mydata', JSON.stringify(adoptData))
    }
    // if not then also same functionality
    else {
        console.log('second condition');

        // localArray.push(RemindObj);
        localStorage.setItem('mydata', JSON.stringify([RemindObj]))

    }

    modaldiv.classList.add('hideModal')
    overlay.classList.add('hideModal')
    remindTitle.value = "";
    remindDate.value = "";
    remindTime.value = "";
    remindDesc.value = "";
    remindNum.value = "";
})

// submitBtn.addEventListener('submit', function (e) {
//     e.preventDefault();
//    




//     console.log('retrievedObject: ', JSON.parse(retrievedObject));

// })

// test

$(document).ready(function () {


    var browserName = bowser.getParser(navigator.userAgent).getResult().browser.name;
    if (browserName == "Microsoft Edge") {
        $("a").each(function () {
            var link = $(this).attr("href");
            var updatedLink = link.split("authuser=")[0] + 'authuser=3';
            $(this).prop("href", updatedLink);
        })
    }

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // var link = 
        $("a").each(function () {
            if ($(this).attr("href").indexOf('meet.google.com') > -1) {
                $(this).prop("href", $(this).attr("href").split("?")[0]);
            }
        })

        $("a").on("click", function (event) {
            var result;
            var link = $(this).attr("href");
            //result = (link.split()
            if ($(this).attr("href").indexOf('meet.google.com') > -1) {
                var tempLink = link.split("?")[0];
                $(this).prop("href", tempLink)
                var myLink = $(this).attr("href").split("https://meet.google.com/")[1];
                result = copyToClipboard(myLink)
            }
            else {
                result = copyToClipboard($(this).attr("href"))
            }
            // console.log(result);
        });
    }

    $("#myInput").on("keyup", function () {
        if (!$('.button').length) {
            var $clearButton = $('<button id="clear" class="button"><i class="fa fa-times" aria-hidden="true"></i></button>');
            $clearButton.insertAfter($("#myInput"));

            $('.button').click(function () {
                $("#myInput").val('');
                $("#tbody tr").filter(function () {
                    $(this).toggle()
                });
                $('.button').remove();
                $("#myInput").focus();
            });
        }
        if ($(this).val().length == 0) {
            $('.button').remove();
        }
        var value = $(this).val().toLowerCase();
        $("#tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    console.log('hi ready');
    // console.log(currentMonth + '-' + currentDate + '-' + currentYear);
    todayDate = currentYear + '-' + currentMonth + '-' + currentDate;
    // string to date object
    todayDate = new Date(todayDate);


    // console.log(JSON.parse(localStorage.getItem('mydata')));
    adoptData.forEach(element => {

        // object array er date gula re date object e convert from string
        var examDate = new Date(element.date);
        // current date object subtract to notify date
        var notifDate = examDate;
        notifDate.setDate(notifDate.getDate() - element.notify);

        console.log(todayDate.getTime() + " " + notifDate.getTime());
        // current notice functionality
        if (todayDate.getTime() >= notifDate.getTime() && todayDate.getTime() < examDate.getTime()) {

            var noticeDiv = `<div class="card-body">
			Title: ${element.title}, Topic : ${element.desc}<br>
            Date: ${element.date} , Time: ${element.time}

		</div>`
            $(noticeDiv).appendTo(remindDiv)
            // alert('Today you have' + element.title + 'ace')
            // console.log('date:' + element.date + 'title:' + element.title + '-time-' + element.time + '-description-' + element.desc + '-notification:-' + element.notify)
        }
        else if (todayDate.getTime() == examDate.getTime()) {
            //  modal + div bar 
        }


    });
});








function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

alarmButton.addEventListener('click', function () {
    alarm = true;
    alarmer(alarm);
});




filter(true);

window.setInterval(function () {
    let update = new Date();
    textTitle.innerHTML = "Today is " + today + ", Time is: " + formatAMPM(update);
    upcomingPainter();
    alarmer(alarm);
    if (tomorrowClicked) classTime(filter(false));
    if (viewClicked) viewAll(true);

}, 5000);

classTime(filter(true));

function alarmer(a) {

    if (a) {
        var button = alarmButton.innerHTML;
        // alert(refreshButton.innerHTML);
        if (refreshButton.innerHTML == '<button class="btn btn-warning mr-1 rounded font-weight-bold" id="eventMan">Set Alarm</button>') {
            alarmButton.remove();
            refreshButton.innerHTML = '<button class="btn text-center pl-4 pr-5 mr-3" onclick = "location.reload();"><i class="fa fa-refresh rotate-center" aria-hidden="true"></i></button>';
        }
        else {
            alarmButton.remove();
        }
        for (let i = 0; i < idArr.length; i++) {
            if (!tomorrowClicked) {
                let countedDiff = getDifference(classHrMinFrmt[i], formatTwentyFour(formatAMPM(new Date())));
                if (countedDiff <= 0 && countedDiff >= -15 && !skipped) {
                    audio = document.getElementById("audio");
                    audio.play();
                    setTimeout(function () { location.reload(); }, 4300);
                }
            }
        }
    }
    else {
        if (!tomorrowClicked && !viewClicked) location.reload();
    }
}

function filter(compDay) {
    viewClicked = false;
    filterClicked = true;
    viewAll(false);
    let ids = [], comparedDay;
    compDay == true ? comparedDay = today : comparedDay = tomorrow;
    compDay == true ? unclicked = true : unclicked = false;
    compDay == false ? tomorrowClicked = true : tomorrowClicked = false;

    if (comparedDay == 'Friday') {
        tableHead.style.opacity = "0";
    }
    else {
        for (i = 0; i < tableData.length; i++) {
            if (tableData[i]["cells"][4].innerText == comparedDay) {
                tableHead.classList.add("show");
                tableData[i].classList.add("show");
                ids.push(parseInt(tableData[i]["cells"][0].innerText) - 1);

            }
            else {
                tableData[i].classList.add("hide");
            }
        }
    }
    return ids;
}

function viewAll(decision) {
    tomorrowClicked = false;
    tableHead.style.opacity = "1";
    document.getElementById('input').style.display = 'block';
    upcomingContext.style.display = 'block';
    if (decision) {
        $('#myInput').focus();
        viewClicked = true;
        unclicked = false;
        filterClicked = false;
        upcomingContext.style.display = 'none';
    }
    else {
        viewClicked = false;
        unclicked = true;
        filterClicked = true;
        document.getElementById('input').style.display = 'none';
    }
    if (document.getElementById('input').innerHTML == "") {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.classList.add("form-control");
        x.setAttribute("id", "myInput");
        x.setAttribute("placeholder", 'Search..');
        document.getElementById('input').appendChild(x);
    }

    for (i = 0; i < tableData.length; i++) {
        tableData[i].classList.remove("hide");
    }
}

function upcomingPainter() {
    filterClicked = true;
    if (filterClicked && !tomorrowClicked && !viewClicked) {
        if (diffArr.length == 0 && index == -1) {
            upcomingContext.innerText = '😁 No more class remaining today 😁';
        }
        else {
            upcomingClass = courseArr[index];
            upcomingContext.innerText = '⏰ ' + upcomingClass + ', at ' + formatAMPM(upcomingClassTime) + ' ⏰';
        }
        if (today == 'Friday') {
            upcomingContext.innerText = '✨ Today is Jumma Mubarak. Recite Surah Kahf today ✨';
        }
    }

    else {
        if (tomorrow == 'Friday') {
            upcomingContext.innerText = '✨ Tomorrow is Jumma Mubarak ✨';
        }
    }
    upcomingContext.classList.add("text-primary");
    counterText = countdownTimer(upcomingClassTime);
    if (counterText != undefined) {
        counterContext.style.border = '2px solid red';
        counterContext.style.borderRadius = "50px";
        counterContext.style.padding = "7px";
        counterContext.style.marginLeft = "32vw";
        counterContext.style.marginRight = "32vw";

    }
    counterContext.innerHTML = counterText.substring(0, 2) + '&nbsp;' + blinker + '&nbsp;' + counterText.substring(3, 7) + ' hour(s) remaining';
    counterText == undefined ? counterContext.style.opacity = '0' : counterContext.style.opacity = '1';
    //if(counterContext.innerText == '00 : 00 hour(s) remaining'){location.reload();}
    window.setInterval(function () {
        blinker = blinker == ' ' ? ':' : ' ';
        counterContext.innerHTML = counterText.substring(0, 2) + '&nbsp;' + blinker + '&nbsp;' + counterText.substring(3, 7) + ' hour(s) remaining';
        //if(counterContext.innerText == '00 : 00 hour(s) remaining'){location.reload();}
        document.title = counterText.substring(0, 2) + ' : ' + counterText.substring(3, 7) + ' hr(s) • ' + 'Routine';
    }, 1000);
}

function classTime(arr = []) {
    viewClicked = false;
    for (let j = 0; j < arr.length; j++) {
        let differ;
        classHrMinFrmt.push(formatTwentyFour(tableData[arr[j]]["cells"][5].innerText.substring(0, 7)));
        courseArr.push((tableData[arr[j]]["cells"][1].innerText));
        idArr.push((tableData[arr[j]]["cells"][0].innerText));


        if (parseInt(classHrMinFrmt[j].substring(0, 2)) - parseInt(formatTwentyFour(timeNow).substring(0, 2)) > 0) {
            differ = parseInt(classHrMinFrmt[j].substring(0, 2)) - parseInt(formatTwentyFour(timeNow).substring(0, 2));
        }
        else if (parseInt(classHrMinFrmt[j].substring(0, 2)) - parseInt(formatTwentyFour(timeNow).substring(0, 2)) < 0) {
            differ = parseInt(classHrMinFrmt[j].substring(0, 2)) - parseInt(formatTwentyFour(timeNow).substring(0, 2)) - 12;
        }
        else {
            differ = parseInt(classHrMinFrmt[j].substring(classHrMinFrmt[j].length - 4, classHrMinFrmt[j].length - 2)) - parseInt(formatTwentyFour(timeNow).substring(timeNow.length - 4, timeNow.length - 2)) > 0 ? 0 : -22;
        }

        // console.log('differ' + differ);


        diffArr.push(differ);
        // console.log('diffArr' + '[' + j + ']' + ': ' + diffArr[j]);
    }

    diffArr.sort(function (a, b) { return b - a });
    // console.log('\ndiffArr = ' + diffArr);

    for (let i = 0; i < diffArr.length; i++) {

        if (diffArr[i] == 0) {
            classesDoneArr.push(diffArr[i]);
        }

        if (diffArr[i] < 0) {
            classesDoneArr.push(diffArr[i]);
            diffArr.splice(i, 1);
            i--;
        }
    }

    // console.log('\ndiffArr after loop: ' + diffArr);

    index = classHrMinFrmt.findIndex((v) => {
        return v.substring(0, 2) == parseInt(formatTwentyFour(timeNow)) + diffArr[diffArr.length - 1];
    });
    // console.log('\nindex: ' + index); //we got the index of the upcoming class's table row
    let counter = 0;
    for (let i = 0; i < idArr.length; i++) {
        let data = tableData[idArr[i] - 1]["cells"][0].innerHTML;
        let day = tableData[idArr[i] - 1]["cells"][4].innerHTML;
        if (!tomorrowClicked && tableData[idArr[i] - 1]["cells"][4].innerHTML == today && !viewClicked && (data.indexOf('✔️') == -1) && (data.indexOf('⌛') == -1) && (data.indexOf('🕐') == -1)) {
            let countedDiff = getDifference(classHrMinFrmt[i], formatTwentyFour(timeNow));

            if (countedDiff < -15) {
                tableData[idArr[i] - 1]["cells"][0].innerHTML = '';
                tableData[idArr[i] - 1]["cells"][0].innerHTML = data + '  ✔️';
                if (countedDiff < -0) {
                    tableData[idArr[i] - 1].style.backgroundColor = "transparent";
                }
            }

            if (countedDiff <= 0 && countedDiff >= -15) {
                var selectedTable = tableData[idArr[i] - 1]["cells"][0].querySelector("a");

                if (localStorage.getItem("currentClass") != tableData[idArr[i] - 1]["cells"][1].innerText) {
                    localStorage.setItem("currentClass", (tableData[idArr[i] - 1]["cells"][1].innerText));
                    if (localStorage.getItem("redirected") != 'ture') {
                        localStorage.setItem("redirected", "true");
                        setTimeout(function () { var win = window.open(selectedTable.href, "mypopup"); win.focus() }, 1000);
                    } else {
                        localStorage.setItem("redirected", "false");
                    }

                }


                tableData[idArr[i] - 1]["cells"][0].innerHTML = '';
                tableData[idArr[i] - 1]["cells"][0].innerHTML = data + '  🕐' + '<button id="skipped" onclick="skipped = true;"class="btn"><i class="fa fa-bell-slash" id="bell" style="display: block;position: relative;top: -0.3vh;"></i></button>';
                tableData[idArr[i] - 1].style.backgroundColor = "transparent";
                tableData[idArr[i] - 1].style.backgroundColor = "coral";
                tableData[idArr[i] - 1].style.fontWeight = "bold";

                alarmButton.addEventListener('click', function () {
                    if (alarm && !skipped) {
                        if (localStorage.getItem("currentClass") != tableData[idArr[i] - 1]["cells"][1].innerText) {
                            localStorage.setItem("currentClass", (tableData[idArr[i] - 1]["cells"][1].innerText));
                            if (localStorage.getItem("redirected") != 'ture') {
                                localStorage.setItem("redirected", "true");
                                setTimeout(function () { var win = window.open(selectedTable.href, "mypopup"); win.focus() }, 1000);
                            } else {
                                localStorage.setItem("redirected", "false");
                            }
                        }
                        audio = document.getElementById("audio");
                        audio.play();
                        audio.stop();
                    }

                });
                alarm = false;
            }

            if (countedDiff > 0 && counter == 0) {
                counter++;
                tableData[idArr[index] - 1]["cells"][0].innerHTML = '';
                tableData[idArr[index] - 1]["cells"][0].innerHTML = data + '  ⌛';
                tableData[idArr[index] - 1].style.backgroundColor = "transparent";
                tableData[idArr[index] - 1].style.backgroundColor = "gold";
                tableData[idArr[index] - 1].style.fontWeight = "bold";
            }

        }
    }

    upcomingClassTime = classHrMinFrmt[index];

    upcomingPainter();
}

function countdownTimer(upcomingClassTime) {
    let num = getDifference(upcomingClassTime, formatTwentyFour(formatAMPM(new Date())));
    // console.log('\ngetDifference: ' + num);
    let hours = Math.floor(num / 60);
    // console.log('\nhrs: ' + hours);
    //			hours = hours/100;
    let minutes = num % 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
}

function formatAMPM(date) {
    let hours, minutes, ampm;

    if (typeof (date) == 'string') {
        hours = date.length == 7 ? parseInt(date.substring(0, 2)) : parseInt(date.substring(0, 1));
        minutes = date.length == 7 ? parseInt(date.substring(3, 5)) : parseInt(date.substring(2, 4));
        ampm = date.length == 7 ? date.substring(5, 7) : date.substring(4, 6);
    }

    else if (typeof (date) == 'object') {
        hours = date.getHours();
        minutes = date.getMinutes();
        ampm = hours >= 12 ? 'pm' : 'am';

    }

    hours = hours % 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
}

function formatTwentyFour(d) {
    let hours = d.length == 7 ? parseInt(d.substring(0, 2)) : parseInt(d.substring(0, 1));
    let minutes = d.length == 7 ? d.substring(3, 5) : d.substring(2, 4);
    let ampm = d.length == 7 ? d.substring(5, 7) : d.substring(4, 6);
    ampm == 'pm' ? hours += 12 : hours += 0;
    hours == 24 ? hours -= 12 : hours += 0;
    if (hours < 10) {
        hours = hours.toString();
        hours = '0' + hours;
    }
    let strTime = hours + ':' + minutes + ampm;
    return strTime;
}

function getDifference(a, b) {
    let aHours = a.length == 7 ? parseInt(a.substring(0, 2)) : parseInt(a.substring(0, 1));
    let aMinutes = a.length == 7 ? parseInt(a.substring(3, 5)) : parseInt(a.substring(2, 4));
    let aAmpm = a.length == 7 ? a.substring(5, 7) : a.substring(4, 6);
    let aTime = aHours * 60 + aMinutes;

    let bHours = b.length == 7 ? parseInt(b.substring(0, 2)) : parseInt(b.substring(0, 1));
    let bMinutes = b.length == 7 ? parseInt(b.substring(3, 5)) : parseInt(b.substring(2, 4));
    let bAmpm = b.length == 7 ? b.substring(5, 7) : b.substring(4, 6);
    let bTime = bHours * 60 + bMinutes;

    let diff = aTime - bTime;

    // let strTime = hours + ':' + minutes + ampm;
    return diff;
}