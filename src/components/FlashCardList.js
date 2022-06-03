import React from "react";
import FlashCard from "./FlashCard";

const FlashCardList = ({ flashCards }) => {
  return (
    <div className="card-grid">
      {flashCards.map((flashcard, index) => {
        return <FlashCard key={index - Date.now()} flashcard={flashcard} />;
      })}
    </div>
  );
};
export default FlashCardList;
