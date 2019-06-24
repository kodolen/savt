let timer = 0;
let closed = true;
let v = document.createElement("VIDEO");
v.setAttribute("width", "100%");
v.setAttribute("height", "100%");
v.setAttribute("controls", "controls");
v.setAttribute("class", "video-drone");
let container = document.getElementById("container");
let taskList = true;

window.addEventListener('load', function () {
    // startIntro();
    showInterface();
});


function startIntro() {

    let introHolder = document.createElement('div');
    introHolder.className = "intro-holder";
    let logo = document.createElement('img');
    logo.src = 'images/savt-logo.png';

    introHolder.appendChild(logo);
    container.appendChild(introHolder);

    setInterval(function () {
        timer++;
        if (timer >= 3) {
            introHolder.classList.add('stop');
            showInterface();
        }
        if (timer >= 5) {
            container.removeChild(introHolder);
        }
    }, 1000)


}

function showInterface() {

    let UI = document.querySelector('.interface');
    UI.classList.add('visible');

    addDrones();

}

function addDrones() {

    let drones = [];
    let videos = ["video/drone-pov-flood.mp4", false, false, false, false, false, false, false];
    let leftSideBar = document.querySelector('.left-side-bar');

    addDropDown(leftSideBar);

    for (let i = 0; i <= 7; i++) {
        let drone = {
            droneNumber: i,
            mode: false,
            battery: 100,
            scanned: 75,
            notes: ["No victims", "test"],
            video: videos[i]
        };
        drones.push(drone);

        let droneCard = document.createElement('div');
        droneCard.classList.add('drone-card');
        // droneCard.innerHTML = drones[i].droneNumber;

        let icon = document.createElement('img');
        icon.src = "images/drone-icon.png";

        let info = document.createElement('div');
        info.classList.add('info');

        let droneNumber = document.createElement('span');
        droneNumber.innerHTML = "Drone " + drones[i].droneNumber;
        droneNumber.style.fontWeight = 'bold';

        let mode = document.createElement('span');
        mode.className = "mode";
        mode.innerHTML = "Auto";

        let battery = document.createElement('div');
        battery.classList.add('battery');

        let title = document.createElement('span');
        title.innerHTML = "Battery";

        let percentage = document.createElement('span');
        percentage.innerHTML = "" + drones[i].battery + "%";
        percentage.style.fontWeight = 'bold';

        let area = document.createElement('div');
        area.classList.add('area');

        let scanned = document.createElement('span');
        scanned.innerHTML = "Area scanned";

        let quantity = document.createElement('span');
        quantity.innerHTML = "" + drones[i].scanned + "%";

        let notes = document.createElement('div');
        notes.classList.add('notes');

        let notesTitle = document.createElement('span');
        notesTitle.innerHTML = "Notes:";

        let noteText = document.createElement('span');
        noteText.innerHTML = "No victims";

        droneCard.appendChild(icon);
        droneCard.appendChild(info);
        info.appendChild(droneNumber);
        info.appendChild(mode);
        droneCard.appendChild(battery);
        battery.appendChild(title);
        battery.appendChild(percentage);
        droneCard.appendChild(area);
        area.appendChild(scanned);
        area.appendChild(quantity);


        droneCard.addEventListener('click', function () {

            // appendToDashboard(drones[i]);

            const modes = document.querySelectorAll('.mode');

            for (let i = 0; i <= modes.length; i++) {
                // modes[i].innerHTML = "Adduto";
            }

            for (let i = 0; i <= 7; i++) {
                drones[i].mode = false;
                modes[i].innerHTML = "Auto";
            }

            drones[i].mode = true;
            mode.innerHTML = "Override";

            console.log(drones[i]);
            let drone = drones[i];
            appendToDashboard(drone);


            let videoURL = drones[i].video;

            drawVideo(videoURL);


        });

        leftSideBar.appendChild(droneCard);
        notes.appendChild(notesTitle);
        notes.appendChild(noteText);
        leftSideBar.appendChild(notes);

    }

    console.log(drones);
    drones[0].mode = true;

}

function drawVideo(videoURL){

    let droneAlt = document.querySelector('body');

    if(videoURL === false){
        console.log("no video founded");
        document.body.removeChild(v);
        droneAlt.classList.remove('show-alt');
        droneAlt.classList.add('hide-alt');
    }
    else {

        if (v.canPlayType("video/mp4")) {
            v.setAttribute("src", videoURL);
        } else {
            console.log("sorry");
        }
        document.body.appendChild(v);
        v.currentTime = 42;
        v.controls = false;
        v.play();
        v.addEventListener("timeupdate", function(){
            if (this.currentTime >= 58){
                this.pause();
            }
        });

        droneAlt.classList.remove('hide-alt');
        droneAlt.classList.add('show-alt');
    }

}

function addDropDown(){

    let dropDown = document.querySelector('.drop-down');
    let body = document.querySelector("body");

    dropDown.addEventListener('click', function(){
        if(closed === true){
            body.classList.add('open');
            body.classList.remove('closed');
            closed = false;
            console.log('open');
        }
        else {
            body.classList.add('closed');
            body.classList.remove('open');
            closed = true;
            console.log('close');
        }

    });
}

function appendToDashboard(drone){

    let battery = document.querySelector('.bat');
    battery.innerHTML = "" + drone.battery;

    let speed = document.querySelector('.speed');
    speed.innerHTML = " ";
    let speedPercentage = 16;

    let scanned = document.querySelector('.scanned');
    scanned.innerHTML = " " + drone.scanned;

    let latValue = 32.78306;
    let lat = document.querySelector('.lat');
    lat.innerHTML = " " + latValue;

    let longValue = -96.80667;
    let long = document.querySelector('.long');
    long.innerHTML = "   " + longValue;

    let tasks = document.querySelector('.tasks');
    tasks.innerHTML = "0";

    let list = document.querySelector('.list');
    let task = document.createElement('div');
    task.classList.add('task');
    let taskText = document.createElement('span');
    taskText.innerHTML = "List is empty";

    if (taskList === true) {
        task.appendChild(taskText);
        list.appendChild(task);
        taskList = false;
    }


    let interval = setInterval(function(){

        timer++;

        if (timer >= 1){
            clearInterval(interval);
            drawWarnings(task, taskText, list, tasks);
            timer = 0;
        }
        else {
            speed.innerHTML = speedPercentage += Math.floor(Math.random() * 2) + 1  ;
        }

    }, 1000);

    console.log(drone)

}

function drawWarnings(task, taskText, list, tasks){

    let text = ['Identify subject.', 'Check status victim and report'];
    task.removeChild(taskText);
    list.removeChild(task);

    for (let i = 0; i <= 1; i++){
        let task = document.createElement('div');
        task.classList.add('task');
        let taskText = document.createElement('span');
        taskText.innerHTML = text[i];
        task.appendChild(taskText);
        list.appendChild(task);
        tasks.innerHTML = "2";

        let warning = document.createElement('div');
        warning.classList.add('warning');
        let header = document.createElement('h2');
        let status = document.createElement('span');
        let image = document.createElement('img');
        let cta = document.createElement('div');
        cta.className = "cta";
        let pinpoint = document.createElement('span');

        header.innerHTML = "Human";
        status.innerHTML = "Satus: SAFE";
        image.src = "images/thermal-person.png";
        pinpoint.innerHTML = "Check pinpoint";

        warning.appendChild(header);
        warning.appendChild(status);
        warning.appendChild(image);
        warning.appendChild(cta);
        cta.appendChild(pinpoint);

        if(i === 0) {
            header.innerHTML = "Unidentified";
            status.innerHTML = "Satus: NEED TO CHECK";
        }

        document.body.appendChild(warning);

    }



}
