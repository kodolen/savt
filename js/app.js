let timer = 0;

let videoHolder = document.getElementById('video-holder');
let v = document.createElement("VIDEO");


v.setAttribute("width", "100%");
v.setAttribute("height", "100%");
v.setAttribute("controls", "controls");
v.setAttribute("class", "video-drone");

let container = document.getElementById("container");


window.addEventListener('load', function () {

    console.log("script active");

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
    let leftSideBar = document.querySelector('.left-side-bar');
    let videos = ["video/drone-pov-flood.mp4", false, false, false, false, false, false];

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


            let videoURL = drones[i].video;

            drawVideo(videoURL);


        });

        leftSideBar.appendChild(droneCard);
        leftSideBar.appendChild(notes);

    }

    console.log(drones);
    drones[0].mode = true;

}

function drawVideo(videoURL){

    if(videoURL === false){
        console.log("no video founded");
        document.body.removeChild(v);
    }
    else {

        if (v.canPlayType("video/mp4")) {
            v.setAttribute("src", videoURL);
        } else {
            console.log("sorry");
        }
        document.body.appendChild(v);
    }

}
