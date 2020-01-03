'use strict'

// All global variables
let questionNumber = 1;
let correctAnswers = 0;
let incorrectAnswers = 0;
let currentQuestion = 0;
let correctMessage = "That is correct! Way to go!";
let incorrectMessage = `That is incorrect. The correct answer is: ${STORE[currentQuestion].rightAnswer}`;

// Handles the display of the scores
function scores(){
    const scoreMake = `
        <li class="scores">Correct: ${correctAnswers}</li>
        <li class="scores">Incorrect: ${incorrectAnswers}</li>
    `
    return scoreMake;
}

// Sets up the form for each question
function generateQuestion(){
    const questionMake = `
        <form>
        <fieldset name="question">
            <legend>Question ${questionNumber}</legend>
            ${STORE[currentQuestion].question}
        </fieldset>
        <fieldset name="answers">
            <legend>Answers</legend>
            <input type="radio" name="answer" class="posAnswer" value="1" data-value= "${STORE[currentQuestion].answers[0]}"> ${STORE[currentQuestion].answers[0]}<br>
            <input type="radio" name="answer" class="posAnswer" value="2" data-value= "${STORE[currentQuestion].answers[1]}"> ${STORE[currentQuestion].answers[1]}<br>
            <input type="radio" name="answer" class="posAnswer" value="3" data-value= "${STORE[currentQuestion].answers[2]}"> ${STORE[currentQuestion].answers[2]}<br>
            <input type="radio" name="answer" class="posAnswer" value="4" data-value= "${STORE[currentQuestion].answers[3]}"> ${STORE[currentQuestion].answers[3]}<br>
            <button name="answer" id="guess">Submit</button>
            <button name="answer" id="next" class="hidden">Next</button>
        </fieldset>
        </form>
        <p class="hidden" id="message">Test</p>
        <p class="hidden wrong" id="error">"Please select an answer."</p>
    `
    incorrectMessage = `That is incorrect. The correct answer is: ${STORE[currentQuestion].rightAnswer}`;
    return questionMake;
}

// All of the button press options
function buttons(){
    $( ".box" ).on( "click", "#begin", function() {
        console.log("running the render function");
        renderQuestion();
    });
    
    $( ".box" ).on( "click", "#next", function() {
        event.preventDefault();
        handleNext();        
    });

    $( ".box" ).on( "click", "#guess", function() {
        event.preventDefault();
        handleGuess();        
    });

    $( ".box" ).on( "click", "#restart", function() {
        event.preventDefault();
        restartQuiz();        
    });
}

// Handles when someone presses the next button
function handleNext(){
    if(questionNumber!=10){
        console.log("running the next question");
        currentQuestion++;
        questionNumber++;
        renderQuestion();
    }
    else {
        $('.box').html(results());
    }
}

// Handles when someone guesses an answer
function handleGuess(){
    // Checks to see if an option is checked
    if($("input[name='answer']:checked").data('value')){
       guess(); 
    } else {
        // Shows the error message if nothing is checked
        if($("#error").hasClass("hidden")){
            $("#error").toggleClass("hidden");
        };        
    }    
}

// Toggles the messages for correct/incorrect and shows the new score
function toggleClasses(){
    $("#message").toggleClass("hidden");
    $("#guess").toggleClass("hidden");
    $("#next").toggleClass("hidden");
    $('.scoreboard').html(scores());
}

// Checks whether answer is correct or not
function guess(){
    if(!$("#error").hasClass("hidden")){
        $("#error").toggleClass("hidden");
    };
    if($("input[name='answer']:checked").data('value') == STORE[currentQuestion].rightAnswer) {
        $("#message").text(`${correctMessage}`);
        correctAnswers++;
    } else {
        $("#message").text(`${incorrectMessage}`);
        incorrectAnswers++;
    }
    toggleClasses();
}

// This is the display for the results page.
function results(){
    let goodScore = "You really know your games!";
    let okayScore = "Try again and see if you can do better!";
    let badScore = "This quiz was not meant for you.";
    let scoreMessage = "If you're seeing this, there's an error."

    let goodImage = "images/thumbsup.png";
    let okayImage = "images/restarting.png";
    let badImage = "images/slain.png";
    let resultImage = "If you're seeing this, there's an error.";

    let goodImageAlt = "Thumbs Up Sonic";
    let okayImageAlt = "Restart the Test Portal";
    let badImageAlt = "Slain Game Over Screen";
    let resultImageAlt = "Picture based on score";

    if(correctAnswers > 7){
        scoreMessage = goodScore;
        resultImage = "images/thumbsup.png";
        resultImageAlt = "Thumbs Up Sonic";
    } else if(correctAnswers > 4) {
        scoreMessage = okayScore;
        resultImage = "images/restarting.png";
        resultImageAlt = "Restart the Test Portal";
    } else {
        scoreMessage = badScore;
        resultImage = "images/slain.png";
        resultImageAlt = "Slain Game Over Screen";
    }

    const resultBox = `
    <div class='results'>
        <p>
            You got ${correctAnswers} out of 10 questions correct. ${scoreMessage}
        </p>
        <img src=${resultImage} alt=${resultImageAlt}> 
        <button name="answer" id="restart" class="resultBtn">Restart</button>
    </div>
    `
    return resultBox;
}

// Resets everything and starts fresh
function restartQuiz() {
    questionNumber = 1;
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestion = 0;
    $('.box').html(`
        <form>
            <fieldset name="intro">
                <legend>Video Game Quiz</legend>
                Test your gaming knowledge with our quiz!
            </fieldset>
            <button id="begin">Begin</button>
        </form>
    `);
    $('.scoreboard').html(scores());
}

// Renders the question form
function renderQuestion() {
    console.log("rendered");
    $('.box').html(generateQuestion());
}

// First thing to run when the page loads
function handlePage(){
    buttons();
}

$(handlePage);