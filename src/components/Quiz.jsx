import { useState } from "react";
import "../App.css";
import QuizModal from "./QuizModal";
// Array of questions (you can edit / add more)
const questions = [
  {
    question:
      'The passage says: "Tom enjoys reading every evening." What does Tom enjoy?',
    options: ["Cooking dinner", "Reading", "Playing football", "Watching TV"],
    answerIndex: 1,
  },
  {
    question:
      'The text states: "The library closes at 6 PM." When does the library close?',
    options: ["At 5 PM", "At 6 PM", "At 7 PM", "At 8 PM"],
    answerIndex: 1,
  },
  {
    question:
      'The sentence reads: "Sara walks to school every morning." How does Sara get to school?',
    options: [
      "She drives a car",
      "She takes the bus",
      "She walks",
      "She rides a bike",
    ],
    answerIndex: 2,
  },
  {
    question:
      'The short note says: "Please bring your notebook tomorrow." What should you bring?',
    options: ["Your phone", "Your notebook", "Your lunch", "Your laptop"],
    answerIndex: 1,
  },
];

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    questions.map(() => ({
      clickedIndex: null,
    }))
  );

  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let clickedIndex = answeredQuestions[currentQuestionIndex].clickedIndex;

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex = currentQuestion.answerIndex;
  const isCorrect = clickedIndex === correctAnswerIndex;
  const notLastQuestion = currentQuestionIndex < questions.length - 1;

  const goToNext = () => {
    if (!notLastQuestion) {
      setShowModal(true);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const goToPrev = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleAnswer = (index) => {
    if (clickedIndex != null) return;

    if (index === correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex].clickedIndex = index;

      return updated;
    });
  };

  const customClass = (index) => {
    let finalClassName = "option-btn ";

    if (clickedIndex != null) {
      if (index === correctAnswerIndex) {
        finalClassName = finalClassName + "correct";
      } else if (index === clickedIndex && !isCorrect) {
        finalClassName = finalClassName + "incorrect";
      }
    }

    return finalClassName;
  };

  const restart = () => {
    setScore(0);
    setSubmitted(false);
    setAnsweredQuestions((prev) =>
      prev.map((obj) => ({
        ...obj, 
        clickedIndex: null, 
      }))
    );
    setCurrentQuestionIndex(0);
  };

  const modalTitle = "Are you sure you want to submit this quiz?";

  const handleSubmittion = () => {
    setShowModal(false);
    setSubmitted(true);
  };

  return (
    <>
      {showModal && (
        <QuizModal
          message={modalTitle}
          onCancel={() => setShowModal(false)}
          onSubmit={handleSubmittion}
        />
      )}
      {!submitted ? (
        <div className="quiz-container">
          <h1>Simple Reading Quiz</h1>
          <div id="question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div id="question-text">
            {questions[currentQuestionIndex].question}
          </div>
          <ul id="options-list">
            {questions[currentQuestionIndex].options.map((opsion, index) => {
              return (
                <li key={index}>
                  {" "}
                  <button
                    onClick={() => handleAnswer(index)}
                    className={customClass(index)}
                  >
                    {opsion}
                  </button>{" "}
                </li>
              );
            })}
          </ul>
          <div id="feedback" className="">
            <p
              style={{ color: isCorrect ? "green" : "red", fontWeight: "600" }}
            >
              {clickedIndex == null
                ? ""
                : isCorrect
                ? "✅ Correct answer!"
                : "❌ Wrong answer"}
            </p>

            <p>Score: {score}</p>
          </div>
          <div className="nav-buttons">
            <button
              id="prev-btn"
              disabled={currentQuestionIndex === 0}
              onClick={goToPrev}
            >
              Previous
            </button>
            <button
              id="next-btn"
              disabled={currentQuestionIndex === questions.length}
              onClick={goToNext}
              style={{ backgroundColor: !notLastQuestion && "green" }}
            >
              {notLastQuestion ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <div id="quiz-result">
          <h1 id="result-title">Quiz submitted</h1>
          <h3 id="result-score">
            You scored {score} out of {questions.length}
          </h3>
          <button id="restart-btn" onClick={restart}>
            Restart
          </button>
        </div>
      )}
    </>
  );
}

export default Quiz;
