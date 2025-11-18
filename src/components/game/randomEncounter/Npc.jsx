import { useState, useEffect } from 'react';

function Npc({ handelFight, story, storyNum }) {

    // Sample riddles with multiple choices
    const riddles = [
        {
            question: "What has keys but can't open locks?",
            correctAnswer: "A piano",
            choices: ["A map", "A piano", "A clock", "A car"]
        },
        {
            question: "What has a heart that doesn't beat?",
            correctAnswer: "An artichoke",
            choices: ["A rock", "An artichoke", "A tree", "A book"]
        },
        {
            question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
            correctAnswer: "The letter M",
            choices: ["The letter M", "A second", "A blink", "A breath"]
        }
    ];

    const [currentRiddle, setCurrentRiddle] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * riddles.length);
        setCurrentRiddle(riddles[randomIndex]);
        setSelectedAnswer(null);
        setShowResult(false);
        // eslint-disable-next-line
    }, [])

    const handleAnswerSelection = (choice) => {
        setSelectedAnswer(choice);
        setShowResult(true);
    };

    return (
        <>
            <div>
                {currentRiddle && (
                    <div>
                        {showResult ? (
                            <div>
                                <h4 className={selectedAnswer === currentRiddle.correctAnswer ? 'correct' : 'incorrect'}>
                                    {selectedAnswer === currentRiddle.correctAnswer ? 'Oh your correct!' : `Oh your incorrect! The correct answer is: ${currentRiddle.correctAnswer}`}
                                </h4>
                                <button className="btn text-white" onClick={handelFight}>{story?.[storyNum]?.choiceThree}</button>
                            </div>
                        ) :
                            (
                                <>
                                    <h4>{currentRiddle.question}</h4>
                                    <div>
                                        {currentRiddle.choices.map((choice, index) => (
                                            <button className='btn text-white' key={index} onClick={() => handleAnswerSelection(choice)}>
                                                <h5>
                                                    {choice}
                                                </h5>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default Npc



