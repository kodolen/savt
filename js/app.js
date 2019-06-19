window.addEventListener('load', function() {

    console.log("script active");

    startIntro();

});


function startIntro(){

    let container = document.getElementById("container");
    let introHolder = document.createElement('div');
    introHolder.className = "intro-holder";

    container.appendChild(introHolder);


}
