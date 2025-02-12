const questionEl = document.querySelector('.question');
const startScreen = document.querySelector('.start-screen');
const mainScreen = document.querySelector('.main-screen');
const endScreen = document.querySelector('.end-screen');
const answerList = document.querySelectorAll('.answer');
const startBtn = document.querySelector('.start-btn');
const skipBtn = document.querySelector('.skip-btn');
const restartBtn = document.querySelector('.restart');
const gameTimerEl = document.querySelector('.game-timer');
const result = document.querySelector('.result');
const maxResult = document.querySelector('.max-result');
let currentQuestion;
let questions;
let currentIndex = 0;
let points = 0;
let timer = 10;
let timerInt;
let maxPoints = parseInt(localStorage.getItem('maxPoints') || 0);

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz)

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function startQuiz(){
        points = 0;
        currentIndex = 0;
        timer = 10;
        timerInt = setInterval(startTimer, 1000);
        gameTimerEl.textContent = timer;
        shuffle(questions);
        showQuestion(questions[currentIndex])
        mainScreen.classList.remove('hide');
        startScreen.classList.add('hide');  
}

function startTimer(){
        timer--;
        gameTimerEl.textContent = timer;
        if(timer <= 0){
            endQuiz();
            gameTimerEl.textContent = 0;
            result.textContent = 'Time is out!';
            result.classList.add('warning');

        }
}

async function getQuestions(){
    let response = await fetch('question-list.json');
    let questions = await response.json();
    return questions;
}

function checkAnswer(e){
    answer = e.target;
    if(answer.textContent == currentQuestion["correct answer"]){
        answer.classList.add('correct');
        points++;
    }
    else {
        answer.classList.add('incorrect');
    }
    setTimeout(() => {
        answer.classList.remove('correct', 'incorrect');
    }, 500)

    nextQuestion();
}

function showQuestion(question){
    questionEl.textContent = question.question;
    currentQuestion = question;
    shuffle(question.answers);
    for(let i = 0; i < answerList.length; i++){
        answerList[i].textContent = question.answers[i];
        setTimeout(() => {
            answerList[i].classList.remove('correct', 'incorrect');
        }, 500)
    }
}

function nextQuestion(){
    if(currentIndex >= questions.length - 1){
        if(points > maxPoints){
            maxPoints = points;
            localStorage.setItem('maxPoints', maxPoints);
        }
        
        result.textContent ='Your result:' + points;
        maxResult.textContent = 'Best score:' + maxPoints;
        endQuiz();
    }
    else {
    currentIndex++;
    showQuestion(questions[currentIndex]);
    }

}

function endQuiz(){
    mainScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    clearInterval(timerInt);
}

getQuestions().then(questionsData => {
    questions = questionsData;
    showQuestion(questions[currentIndex]);
    answerList.forEach((answer) => {
        answer.addEventListener('click', checkAnswer);
    })
    skipBtn.addEventListener('click', nextQuestion);
})


