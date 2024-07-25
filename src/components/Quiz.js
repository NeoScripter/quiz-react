import React, { useState } from "react";

function Quiz({ quiz, currentQuestionIndex, handleNextQuestion, answers }) {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    function handleSelectedAnswer(option) {
        if (!submitted) {
            setSelectedAnswer(option);
        }
    }

    const handleAnswer = () => {
        if (submitted) {
            setSubmitted(false);
            setSelectedAnswer(null);
            handleNextQuestion(selectedAnswer === currentQuestion.answer);
        } else {
            setSubmitted(true);
        }
    };

    const getBorderColor = (option) => {
        if (!submitted) {
            return option === selectedAnswer ? 'selected-answer-outline' : 'border-gray-300';
        } else {
            if (option === currentQuestion.answer) {
                return 'right-answer-outline';
            } else if (option === selectedAnswer) {
                return 'wrong-answer-outline';
            } else {
                return 'border-gray-300';
            }
        }
    };

    if (currentQuestionIndex >= quiz.questions.length) {
        return (
            <div>
                <h2 className="text-2xl">Quiz Completed!</h2>
                <p className="italic-ff grey-text-clr">Thank you for completing the quiz.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="question-container">
                {currentQuestion.options.map((option, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleSelectedAnswer(option)}
                        className={`p-2 m-2 border ${getBorderColor(option)}`}
                    >
                        {option}
                    </button>
                ))}
                <button onClick={handleAnswer} className="p-2 m-2 border">
                    {submitted ? 'Next Question' : 'Submit Answer'}
                </button>
            </div>
        </div>
    );
}

export default Quiz;
