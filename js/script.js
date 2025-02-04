const questionEl = document.querySelector('.question');
const startScreen = document.querySelector('.start-screen');
const mainScreen = document.querySelector('.main-screen');
const endScreen = document.querySelector('.end-screen');
const answerList = document.querySelectorAll('.answer');
const startBtn = document.querySelector('.start-btn');
const skipBtn = document.querySelector('.skip-btn');
const gameTimerEl = document.querySelector('.game-timer');
const warning = document.querySelector('.warning');
let currentQuestion;
let questions;
let currentIndex = 0;
let points = 0;
let timer = 10;

startBtn.addEventListener('click', startQuiz);

function startQuiz(){
        gameTimerEl.textContent = timer;
        mainScreen.classList.remove('hide');
        startScreen.classList.add('hide');  
        setInterval(startTimer, 1000);
}

function startTimer(){
        timer--;
        gameTimerEl.textContent = timer;
        if(timer < 0){
            endQuiz();
            gameTimerEl.textContent = 0;
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
    }, 1000)

    nextQuestion();
}

function showQuestion(question){
    questionEl.textContent = question.question;
    currentQuestion = question;
    for(let i = 0; i < answerList.length; i++){
        answerList[i].textContent = question.answers[i];
    }
}

function nextQuestion(){
    if(currentIndex >= questions.length){
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
}

getQuestions().then(questionsData => {
    questions = questionsData;
    showQuestion(questions[currentIndex]);
    answerList.forEach((answer) => {
        answer.addEventListener('click', checkAnswer);
    })
    skipBtn.addEventListener('click', nextQuestion);
})


