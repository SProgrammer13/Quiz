const questionEl = document.querySelector('.question');
const answerList = document.querySelectorAll('.answer');

async function getQuestions(){
    let response = await fetch('question-list.json');
    let questions = await response.json();
    return questions;
}

function showQuestion(question){
    questionEl.textContent = question.question;
    for(let i = 0; i < answerList.length; i++){
        answerList[i].textContent = question.answers[i];
    }
}

getQuestions().then(questions => {
    showQuestion(questions[0]);

})


