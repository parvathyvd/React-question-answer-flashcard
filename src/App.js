import { useEffect, useRef, useState } from "react";
import "./App.css";
import FlashCardList from "./components/FlashCardList";
import axios from "axios";

const App = () => {
  const [flashCards, setFlashCards] = useState([]);
  const [category, setCategory] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();
  const fetchFlashCards = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    const data = await response.json();
    console.log(data.results);
    setFlashCards(data.results);
  };
  const fetchCategory = async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    console.log(data.trivia_categories);
    setCategory(data.trivia_categories);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchFlashCards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value,
      },
    });
    const data = await response.data;
    console.log(data.results);
    setFlashCards(data.results);
  };
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {category.map((cate) => {
              return (
                <option id={cate.id} key={cate.id} value={cate.id}>
                  {cate.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Question</label>
          <input
            type="number"
            id="amount"
            step="1"
            min="1"
            defaultValue={10}
            ref={amountEl}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
};

export default App;
