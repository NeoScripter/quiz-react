import React, { useState } from "react";
import quizzesData from "./data.json";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import ThemeSwitch from "./components/ThemeSwitch";

import iconHtml from "./assets/images/icon-html.svg";
import iconCss from "./assets/images/icon-css.svg";
import iconJs from "./assets/images/icon-js.svg";
import iconAccessibility from "./assets/images/icon-accessibility.svg";

const imageMap = {
    "icon-html.svg": iconHtml,
    "icon-css.svg": iconCss,
    "icon-js.svg": iconJs,
    "icon-accessibility.svg": iconAccessibility
};

function App() {
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    function handleQuizSelect(quiz) {
        setCurrentQuiz(quiz);
        setCurrentQuestionIndex(0);
        setAnswers([]);
    }

    function handleNextQuestion(isRight) {
        setAnswers([...answers, isRight]);
        setCurrentQuestionIndex((prev) => prev + 1);
    }

    function handleRestartQuiz() {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setCurrentQuiz(null);
    }

    const progressBarWidth = currentQuiz ? (100 / currentQuiz.questions.length) * currentQuestionIndex : 0;
    return (
        <div className="mx-auto p-6 max-w-3xl">
            <header className="flex items-center justify-between mb-16">
                {currentQuiz && (
                    <div className="flex gap-4 items-center">
                        <div className="w-10 p-1 rounded-lg" style={{ backgroundColor: currentQuiz.bgColor }}>
                            <img className="w-8 h-8" src={imageMap[currentQuiz.icon]} alt={currentQuiz.title} />
                        </div>
                        <h3 className="medium-ff text-lg">{currentQuiz.title}</h3>
                    </div>
                )}
                <ThemeSwitch />
            </header>
            <div className="md:flex justify-between gap-12">
                {!currentQuiz ? (
                    <div className="mb-8 md:w-1/2">
                        <h1 className="text-4xl mb-4 bold-ff">
                            <span className="font-normal light-ff">Welcome to the</span> <br></br> Frontend Quiz!
                        </h1>
                        <p className="italic-ff grey-text-clr">Pick a subject to get started.</p>
                    </div>
                ) : (
                    currentQuestionIndex < currentQuiz.questions.length && (
                        <div className="mb-8 md:w-1/2">
                            <p className="text-sm italic-ff grey-text-clr mb-2">
                                Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                            </p>
                            <p>{currentQuiz.questions[currentQuestionIndex].question}</p>
                            <div className="field-bg w-full h-3 rounded-full p-0.5 mt-4">
                                <div
                                    className="h-full w-1/2 rounded-full purple-bg"
                                    style={{ width: `${progressBarWidth}%` }}
                                ></div>
                            </div>
                        </div>
                    )
                )}
                {currentQuiz ? (
                    <Quiz
                        quiz={currentQuiz}
                        currentQuestionIndex={currentQuestionIndex}
                        handleNextQuestion={handleNextQuestion}
                        answers={answers}
                        handleRestartQuiz={handleRestartQuiz}
                        quizImage={imageMap[currentQuiz.icon]}
                    />
                ) : (
                    <Menu handleQuizSelect={handleQuizSelect} quizzesData={quizzesData} imageMap={imageMap} />
                )}
            </div>
        </div>
    );
}

export default App;
