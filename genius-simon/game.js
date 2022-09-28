
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern   = [];

var started = false;
var level = 0;

$(document).keydown(function() {
    if (started == false) {
        $("#level-title").text("level " + level);
        started = true;
        nextSequence();
    };
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id") 
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        /*console.log("Success");*/

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        };

    } else {
        /*console.log("wrong");*/

        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        $("body").addClass("game-over");
        $("#level-title").text("Game Over. Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver()
    };
};

function nextSequence() {

    level ++;
    userClickedPattern = [];
    $("#level-title").text("level " + level);

    var randomNumber = Math.round(Math.random()*3);    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};


function playSound(name) {

    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play(); 
};

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 200);
};

function startOver() {
    
    gamePattern = [];
    started = false;
    level = 0
}

