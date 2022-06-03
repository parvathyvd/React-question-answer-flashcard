import React, { useState, useEffect, useRef } from "react";

const FlashCard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEl = useRef();
  const backEl = useRef();
  const options = [...flashcard.incorrect_answers, flashcard.correct_answer];
  let optionsShufffled = options.sort(() => Math.random() - 0.5);

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    return Math.max(frontHeight, backHeight, 100);
  };

  useEffect(() => {
    setHeight(setMaxHeight);
  }, [flashcard.question, flashcard.options]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {decodeString(flashcard.question)}
        <div className="flashcard-options">
          {optionsShufffled.map((option, index) => {
            return (
              <div className="flashcard-option" key={index}>
                {decodeString(option)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.correct_answer}
      </div>
    </div>
  );
};

export default FlashCard;
