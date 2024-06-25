import React, { useEffect, useState } from "react";
import axios from "./api/axios";
import Cards from "./Cards";

const Body = () => {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [cards, setCards] = useState([]);

  const getData = async () => {
    if (search) {
      const res = await axios.post(`/search`, {search});
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
      `/getBookData?id=${id}`
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

      </div>
        <Cards cards={cards}/>
    </>
  );
};

export default Body;
