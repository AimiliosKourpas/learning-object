document.addEventListener("DOMContentLoaded", function () {
  const slideshowContainer = document.querySelector('.slideshow-container');
  const slides = document.querySelectorAll('.slide');
  const nextSlideButtons = document.querySelectorAll('.next-slide-button'); // Updated this line
  const startTutorialButton = document.getElementById('start-tutorial-button');
  const startQuizButton = document.getElementById('start-quiz-button');
  const quizContainer = document.getElementById('quiz-container');

  let currentSlide = 0;

  nextSlideButtons.forEach(button => { // Updated this block
    button.addEventListener('click', () => {
      console.log('Next slide');
      showSlide(currentSlide + 1);
    });
  });

  startTutorialButton.addEventListener('click', () => {
    slideshowContainer.style.display = 'block';
    showSlide(1); // Show the first tip slide
  });

  startQuizButton.addEventListener('click', () => {
    slideshowContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion(0); // Show the first question
  });

  function showSlide(slideIndex) {
    slides[currentSlide].style.display = 'none';
    slides[slideIndex].style.display = 'block';
    currentSlide = slideIndex;

    if (currentSlide === slides.length - 1) {
      startQuizButton.style.display = 'block';
      nextSlideButtons.forEach(button => button.style.display = 'none'); // Updated this line
    } else {
      startQuizButton.style.display = 'none';
      nextSlideButtons.forEach(button => button.style.display = 'block'); // Updated this line
    }
  }


// Quiz
const questionContainer = document.querySelector('.quiz-container'); // Update the class name
const nextButtons = document.querySelectorAll('.next-button');
const restartButton = document.getElementById('restart-button');
const resultsContainer = document.getElementById('results-container');
const homeButton = document.getElementById('home-button');

let currentQuestion = 0;
let score = 0;
const questions = document.querySelectorAll('.question');

nextButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer();

    if (selectedAnswer !== null) {
      checkAnswer(selectedAnswer);
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
      } else {
        showResults();
      }
    }
  });
});

restartButton.addEventListener('click', () => {
  restartQuiz();
});

const correctAnswers = {
  'question-1': 'a',
  'question-2': 'b',
  'question-3': 'mandate',
  'question-4': 'different',
  'question-5': 'b',
  'question-6': 'b',
  'question-7': 'a',
  'question-8': 'logic',
};

function getSelectedAnswer() {
  const selectedInput = questions[currentQuestion].querySelector('input:checked');
  const selectedOption = questions[currentQuestion].querySelector('select');

  if (selectedInput) {
    return selectedInput.value;
  } else if (selectedOption) {
    return selectedOption.value;
  }

  return null;
}

function checkAnswer(selectedAnswer) {
  const currentQuestionId = questions[currentQuestion].getAttribute('id');

  if (correctAnswers[currentQuestionId] === selectedAnswer) {
    score++;
  }
}

function showQuestion(index) {
  questions.forEach((question, i) => {
    if (i === index) {
      question.style.display = 'block';
    } else {
      question.style.display = 'none';
    }
  });
}

function showResults() {
  questionContainer.style.display = 'none';
  resultsContainer.style.display = 'block';

  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;

  const scoreDisplay = document.getElementById('score-display');
  scoreDisplay.innerHTML = `
    <h2>Quiz Results</h2>
    <p>Your score: ${score} / ${totalQuestions}</p>
    <p>Percentage: ${percentage.toFixed(2)}%</p>
  `;
}

function restartQuiz() {
  questionContainer.style.display = 'block';
  resultsContainer.style.display = 'none';
  currentQuestion = 0;
  score = 0;
  showQuestion(currentQuestion);
}

homeButton.addEventListener('click', () => {
  quizContainer.style.display = 'none';
  resultsContainer.style.display = 'none';
  slideshowContainer.style.display = 'block';
  showSlide(0); // Show the welcome slide
});

showSlide(0);

});