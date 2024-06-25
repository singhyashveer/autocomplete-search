import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchElement = () => {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [cards, setCards] = useState([]);

  const getData = async () => {
    if (search) {
      const res = await axios.post("http://localhost:5000/search", {search});
      const arrayOfSuggestions = Object.entries(res.data).map(([id, title]) => {
        return { id: parseInt(id), title };
      });
      setSuggestion(arrayOfSuggestions);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const addCard = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/getBookData?id=${id}`
    );
    setCards([...cards, response.data]);
  };

  useEffect(() => {
    getData();
  }, [search, setSearch]);

  return (
    <>
      <div className=".input-container">
        <input
          className="input-style"
          placeholder="Type here..."
          value={search}
          name="search"
          onChange={handleChange}
        />
      </div>
      <div>
        <ul className="tag-list">
          {suggestion.map((data) => (
            <li key={data.id} className="tag-item" onClick={() => addCard(data.id)}>
              {data.title}
            </li>
          ))}
        </ul>

        <div className="card-container">
          {cards.map((card) => (
            <div key={card.title} className="card">
              <div>
                <span className="heading">Title:</span> {card.title}
              </div>
              <div>
                <span className="heading">Summary:</span> {card.summary}
              </div>
              <div>
                <span className="heading">Author:</span> {card.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchElement;
