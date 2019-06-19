let timer = 0;

window.addEventListener('load', function() {

    console.log("script active");

    startIntro();

});


function startIntro(){

    let container = document.getElementById("container");
    let introHolder = document.createElement('div');
    introHolder.className = "intro-holder";
    let logo = document.createElement('img');
    logo.src = 'images/savt-logo.png';

    introHolder.appendChild(logo);
    container.appendChild(introHolder);

    setInterval(function(){
        timer++;
        if (timer >= 3){
            introHolder.classList.add('stop');
            showInterface();
        }
        if (timer >= 5){
            container.removeChild(introHolder);
        }
    }, 1000)


}

function showInterface(){

    let UI = document.querySelector('.interface');
    UI.classList.add('visible');

}
