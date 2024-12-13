'use strict';

const totalQuestions = 5;
const base_url = `https://opentdb.com/api.php?amount=${totalQuestions}`;

let url;
let counter;
let score;
let correct;
let questions;

const [categoryCard, questionCard, skeletonCard, scoreCard] = document.querySelectorAll('.card');
const categoryElements = Array.from(document.querySelectorAll('.category-item'));
const playBtn = document.querySelector('button');
const submitBtn = questionCard.querySelector('button');
const playAgainBtn = scoreCard.querySelector('button');
const questionHeaders = questionCard.querySelectorAll('span');
const questionText = questionCard.querySelector('.question-text');
const questionBody = questionCard.querySelector('.card-body');
const scoreElements = scoreCard.querySelectorAll('.stat');

categoryElements.forEach(item=>item.addEventListener('click', clickCategory));

function clickCategory(e){
    e.target.classList.toggle('selected');
    categoryElements.forEach(item=>{
        if(item.classList.contains('selected') && item !== e.target)
            item.classList.remove('selected');           
    });
}

playBtn.addEventListener('click', initGame);

function initGame() {
    counter = 0;
    score = 0;
    correct = 0;
    url = base_url;
    questions = [];

    const selectedCategory = categoryElements.find(item=>item.classList.contains('selected'));

    if(selectedCategory) {
        const category = selectedCategory.dataset.category;
        url += `&category=${category}`;
        selectedCategory.classList.remove('selected');
    }

    categoryCard.classList.add('hidden');
    skeletonCard.classList.remove('hidden');
    getQuestions();
}

async function getQuestions() {
    try{
        const response = await fetch(url);
        if(!response.ok)
            throw Error(`Error: ${response.url} ${response.statusText}`);
        const data = await response.json();
        if(data.response_code === 0){
            processQuestions(data);
            showQuestion();
        }else{
            throw Error('Error: Cannot get question from the API');
        }
    }catch(error){
        console.log(error);
    }
}

function processQuestions(data){
    for(let i=0; i<data.results.length; i++){
        console.log(data.results[i].category);
        let question = {};
        question.text = data.results[i].question;
        question.level = data.results[i].difficulty;
        if(data.results[i].type === 'boolean'){
            question.answers = ['True', 'False'];
            question.correctAnswer = data.results[i].correct_answer === 'True'? 0: 1;
        }else{
            question.answers = data.results[i].incorrect_answers;
            let index = Math.floor(Math.random() * 4);
            question.answers.splice(index, 0, data.results[i].correct_answer);
            question.correctAnswer = index;
        }

        questions.push(question);
    }
}

function showQuestion(){
    submitBtn.disabled = false;
    let optionElements = questionBody.querySelectorAll('.option-item');
    optionElements.forEach(element=>element.remove());

    const question = questions[counter];
    console.log(questionHeaders);
    questionHeaders[0].textContent = `Question: ${counter + 1} / ${totalQuestions}`;
    questionHeaders[1].textContent = `Level: ${question.level}`;
    questionHeaders[2].textContent = `Score: ${score}`;
    questionText.innerHTML = question.text;


    const fragment = document.createDocumentFragment();
    question.answers.forEach(answer=>{
        const option = document.createElement('div');
        option.innerHTML = answer;
        option.classList.add('option-item');
        fragment.append(option);
    });

    questionBody.insertBefore(fragment, submitBtn);
    skeletonCard.classList.add('hidden');
    questionCard.classList.remove('hidden');

    optionElements = questionBody.querySelectorAll('.option-item');
    optionElements.forEach(item=>item.addEventListener('click', e=>{
        optionElements.forEach(element=>{
            if(element.classList.contains('selected'))
                element.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }));
}

submitBtn.addEventListener('click',submitAnswer);
function submitAnswer(){
    submitBtn.disabled = true;
    const answerSubmitted = questionBody.querySelector('.selected');
    const allAnswers = questionBody.querySelectorAll('.option-item');
    const correctAnswer = allAnswers[questions[counter].correctAnswer];

    correctAnswer.classList.add('correct');

    if(answerSubmitted && answerSubmitted === correctAnswer){
        correct++;
        if(questions[counter].level === "easy")
            score+=10;
        else if(questions[counter].level == "medium")
            score+=20;
        else
            score+=30;
    }
    if(answerSubmitted && answerSubmitted !== correctAnswer){
        answerSubmitted.classList.add('wrong');
    }

    setTimeout(nextQuestion, 1500);
}

function nextQuestion(){
    counter++;
    if(counter < totalQuestions)
        showQuestion();
    else 
        showScore();
}

function showScore(){
    scoreElements[0].textContent = `Correct Answers: ${correct}`;
    scoreElements[1].textContent = `Score: ${score}`;
    questionCard.classList.add('hidden');
    scoreCard.classList.remove('hidden');
}

playAgainBtn.addEventListener('click', ()=>{
    scoreCard.classList.add('hidden');
    categoryCard.classList.remove('hidden');
});