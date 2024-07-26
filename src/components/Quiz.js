import React, { useState } from "react";
import iconError from '../assets/images/iconError.svg';
import iconIncorrect from '../assets/images/icon-incorrect.svg';
import iconCorrect from '../assets/images/icon-correct.svg';


function Quiz({ quiz, currentQuestionIndex, handleNextQuestion, answers, handleRestartQuiz, quizImage }) {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [showError, setShowError] = useState(false);

    function handleSelectedAnswer(option) {
        if (!submitted) {
            setSelectedAnswer(option);
        }
    }

    const handleAnswer = () => {
        if (submitted) {
            setShowError(false);
            setSubmitted(false);
            setSelectedAnswer(null);
            handleNextQuestion(selectedAnswer === currentQuestion.answer);
        } else {
            if (selectedAnswer) {
                setSubmitted(true);
                setShowError(false);
            } else {
                setShowError(true);
            }
        }
    };

    const getBorderColor = (option) => {
        if (!submitted) {
            return option === selectedAnswer ? "selected-answer-outline" : "border-gray-300";
        } else {
            if (option === currentQuestion.answer) {
                return "right-answer-outline";
            } else if (option === selectedAnswer) {
                return "wrong-answer-outline";
            } else {
                return "border-gray-300";
            }
        }
    };

    const getOptionColor = (option) => {
        if (submitted) {
            if (option === currentQuestion.answer) {
                return "green-bg";
            } else if (option === selectedAnswer) {
                return "red-bg";
            } else {
                return "standard-bg";
            }
        } else {
            return "standard-bg";
        }
    };

    const iconToDisplay = (option) => {
        if (submitted) {
            if (option === currentQuestion.answer) {
                return (
                    <img src={iconCorrect} alt="green checkmark" className="ml-auto"/>
                );
            } else if (option === selectedAnswer) {
                return (
                    <img src={iconIncorrect} alt="red cross" className="ml-auto"/>
                );
            } else {
                return null;
            }
        }
    };

    const totalAnswers = answers.length;
    const rightAnswers = answers.filter((answer) => answer === true).length;
    if (currentQuestionIndex >= quiz.questions.length) {
        return (
            <div>
                <div>
                    <h1 className="text-4xl mb-8 bold-ff">
                        <span className="font-normal light-ff">Quiz completed</span> <br></br> You scored...
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 field-bg p-6 rounded-lg mb-8">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 p-1 rounded-lg" style={{ backgroundColor: quiz.bgColor }}>
                            <img className="w-8 h-8" src={quizImage} alt={quiz.title} />
                        </div>
                        <h3 className="medium-ff text-lg">{quiz.title}</h3>
                    </div>
                    <p className="bold-ff text-8xl">{rightAnswers}</p>
                    <p className="italic-ff text-xl grey-text-clr text-center">out of {totalAnswers}</p>
                </div>
                <button
                    onClick={handleRestartQuiz}
                    className="medium-ff p-4 cursor-pointer flex items-center justify-center gap-5 submit-btn-bg rounded-lg text-white w-full"
                >
                    Play Again
                </button>
            </div>
        );
    }

    const answerOptions = ["A", "B", "C", "D"];
    return (
        <div>
            <div className="flex flex-col gap-4">
                {currentQuestion.options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelectedAnswer(option)}
                        className={`medium-ff cursor-pointer flex items-center gap-5 field-bg p-3 rounded-lg ${getBorderColor(
                            option
                        )}`}
                    >
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 subfield-text-color ${getOptionColor(
                                option
                            )}`}
                        >
                            {answerOptions[index]}
                        </div>
                        <p>{option}</p>
                        {iconToDisplay(option)}
                    </div>
                ))}
                <button
                    onClick={handleAnswer}
                    className="medium-ff p-4 cursor-pointer flex items-center justify-center gap-5 submit-btn-bg p-3 rounded-lg text-white"
                >
                    {submitted ? "Next Question" : "Submit Answer"}
                </button>
                {showError && (
                    <div className="flex items-center gap-2 w-max mx-auto mt-2">
                        <img src={iconError} alt="red cross"/>
                        <p className="text-red-600 text-lg">Please select an answer</p>
                    </div>
                    )}
            </div>
        </div>
    );
}

export default Quiz;
