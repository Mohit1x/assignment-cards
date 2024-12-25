import React, { useState, useEffect } from "react";
import "./CardLists.css";

const CardLists = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/beers/ale");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Product List</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="grid">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.name} className="card-image" />
                <h2 className="card-title">{item.name}</h2>
                <p className="card-price">Price: {item.price}</p>
                <p className="card-rating">
                  Rating: {item.rating?.average.toFixed(1)} (
                  {item.rating?.reviews} reviews)
                </p>
              </div>
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardLists;
