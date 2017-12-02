var triviaQuestions = [{
	question: "What did Prison Mike say was the worst park of prison?",
	answerList: ["The Food","The Dementors","No Improv Classes","The Jumsuits"],
	answer: 1
},{
	question: "What food does Kevin make every year for the office?",
	answerList: ["Donuts","Pretzles","Chili","Nachos"],
	answer: 2
},{
	question: "Who did Michael hit, with his car?",
	answerList: ["Kevin","A Turtle","Meredith","Oscar"],
	answer: 2
},{
	question: "What is Gabe tired of hearing about?",
	answerList: ["Pixar Movies","Dwight's Karate","Jim's Hair","The Sun"],
	answer: 3
},{
	question: "What is Michael's favorite punch line?",
	answerList: ["That's what she said.","I Love Tobby!","I am Beyonce, always.","I...declare... bankruptcy!"],
	answer: 0
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Nope, thats not it.",
	endTime: "Out of Time!",
	finished: "Let See How You Did!",
}


$('.btn').on('click',function(){
	$(this).hide();
	newGame();
	console.log('click')
});


function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;

	$('#currentQuestion').html('Question #' +(currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for ( var i = 0; i < 4; i++) {
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i});
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	
}

countdown();

$('.thisChoice').on('click', function(){
	userSelect = $(this).data('index');
	clearInterval(time);
	answerPage();
});


function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining:' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src ="assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');
	
	if((userSelect ==rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);	
	}
	else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: '+ rightAnswerText);
	}
	else{
		unanswered++;
		$('#message').html(message.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}


	if(currentQuestion == (triviaQuestions.length - 1)){
		setTimeout(scoreboard, 5000)
	}
	else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');

}

}