
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// keep track of weather if game has started or not.

var started = false;
var level = 0;

// detect when keyboard has been pressed.

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`level ${level}`);
        nextSequence();
        started = true;
    }
   
});



$(".btn").click(function() {
    
    var userChosenColor = $(this).attr("id");   // or simply we can use this.id.
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}



function nextSequence() {

    userClickedPattern = [];

    // increase the level by 1 every time nextSequence() is called.

    level++;

    // update the h1 with this change in the value of level.

    $("#level-title").text(`level ${level}`);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}




function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}


function startOver() {
    
    level = 0;
    gamePattern = [];
    started = false;
}








