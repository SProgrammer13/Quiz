const questionEl = document.querySelector('.question');
const mainScreen = document.querySelector('.main-screen');
const endScreen = document.querySelector('.end-screen');
const answerList = document.querySelectorAll('.answer');
const skipBtn = document.querySelector('.skip-btn');
let currentQuestion;
let questions;
let currentIndex = 0;
let points = 0;

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


