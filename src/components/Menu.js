import Answer from "./Answer";

function Menu({ handleQuizSelect, quizzesData, imageMap }) {
    const colorArray = ['#FFF1E9', '#E0FDEF', '#EBF0FF', '#F6E7FF']
    return (
        <div className="flex flex-col gap-3">
            {quizzesData.quizzes.map((quiz, index) => (
                <Answer 
                    key={quiz.title} 
                    onClick={() => handleQuizSelect(quiz)} 
                    title={quiz.title} 
                    image={imageMap[quiz.icon]}
                    bgColor={colorArray[index]}
                />
            ))}
        </div>
    );
}

export default Menu;
