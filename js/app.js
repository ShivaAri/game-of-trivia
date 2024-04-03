/*------------------ Constants --------------------*/
import { getRandomQuestion } from "../data/datatype.js"
const whoWantSomeDuckSound = new Audio('../audio/Who want some duck.mp3')
const shockSound = new Audio('../audio/shock.mp3')
const ohSound = new Audio('../audio/OH.mp3')
const areYouMadSound = new Audio('../audio/Are You mad.mp3')

const handleReset = function() {
  init()
}
/*--------------- Variables (state) ----------------*/
let gameInPlay, timerIntervalId, correctAnswer, incorrectAnswer, winner
let correctAnswerCount = 0
let incorrectAnswerCount = 0
let timeLeft = 120
const questions = []
let timer = setInterval(function() {
  countdownEl.textContent = timeLeft + ' seconds remain...'
  timeLeft -= 1
  if (timeLeft < 0) {
    countdownEl.textContent = "Time is Up! Were you entertained?"
    clearInterval(timer)
    shockSound.volume = 0
    shockSound.play()
  }
  
}, 1000)
/*------------- Cached Element References -----------*/
const answerEl = document.getElementById('answer-count')
const messageEl = document.getElementById('message')
const correctBtn = document.getElementById('correct-answer-button')
console.log(correctBtn)
const incorrectBtn1 = document.getElementById('incorrect-answer-button1')
const incorrectBtn2 = document.getElementById('incorrect-answer-button2')
// const resetBtn = document.getElementById('reset-button')
const countdownEl = document.getElementById('countdown')
const questionContainer = document.querySelector('#question-container')
const questionBtn = document.querySelector('#question-button')
/*----------------- Event Listeners ----------------*/
correctBtn.addEventListener('click', handleClick)
incorrectBtn1.addEventListener('click', handleClick)
incorrectBtn2.addEventListener('click', handleClick)
questionBtn.addEventListener('click', createQuestion)


/*------------------- Functions ---------------------*/
init()


function init() {
  render()
  correctAnswer = 0
  incorrectAnswer = 0
  winner = false
  render()
  checkForWinner()
}


function showMessage(message) {
  message.textContent = message
  render()
}

function handleClick(evt) {
  if(evt.target.className === 'correct-answer-button') {
    correctAnswer = correctAnswer + 1
    messageEl.textContent = "That's the ticket~! You are correct"
  } else {
    messageEl.textContent = "Incorrect. Try again!"
    incorrectAnswer = incorrectAnswer + 1
  }
  render()
  
}



function render() {
  questionContainer.innerHTML = ''
  questions.forEach((question, idx) => {
    appendQuestion(question, idx)
  })

}

function appendQuestion(question) {
  let questionCard = document.createElement('div')
  questionCard.className = `card ${question.question}`
  questionCard.addEventListener('click', handleClick)
  questionCard.innerHTML = 
  `<div>
  <p id = "question-container">Question For Ya:${question.question}</p>
  <footer>
    <button class = 'correct-answer-button'>${question.correctAnswer}</button>
    <button class = 'incorrect-answer-button'>${question.incorrectAnswer1}</button>
    <button class = 'incorrect-answer-button'>${question.incorrectAnswer2}</button>
    </footer>
    `

    questionContainer.appendChild(questionCard)
    
}

function createQuestion() {
  const newQuestion = getRandomQuestion()

  questions.push(newQuestion)
  render()
}

//when a certain number of correct answers equals 9:
  //celebratory message saying "Congratulations! You are a trivia machine!"

function checkForWinner() {
  if(correctAnswer = 9){
    winner = true
    messageEl.textContent = "Congratulations! You are a Trivia Machine!"
  }
}


// function updateMessage() {
//   render()
//   if(correctAnswerCount > incorrectAnswerCount) {
//     messageEl.textContent = 'Congratulations!'
//   } else {
//     messageEl.textContent = 'Do not fret. You have tons of tries to win~'
//   }
// }

