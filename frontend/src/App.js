import React, { useState } from "react";
import "./App.css";

function App() {

  const [productName, setProductName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState({});
  const [recommendation, setRecommendation] = useState("");

  // Step 1: Scrape Reviews
  const scrapeReviews = async () => {

    if (productName === "") {
      alert("Enter Product Name");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:5000/scrape", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          product_name: productName
        })

      });

      const data = await response.json();

      setReviews(data.reviews);

      alert("Reviews Scraped Successfully");

    } catch (err) {

      console.log(err);

      alert("Scraping Failed");

    }

  };

  // Step 2: Analyze Reviews
  const analyzeReviews = async () => {

    if (reviews.length === 0) {
      alert("No Reviews Found");
      return;
    }

    try {

      const response = await fetch("http://127.0.0.1:5000/analyze", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          reviews: reviews
        })

      });

      const data = await response.json();

      setResults(data.results);
      setSummary(data.summary);
      setRecommendation(data.recommendation);

    } catch (err) {

      console.log(err);

      alert("Analysis Failed");

    }

  };

  return (

    <div className="App">

      <h1>Product Sentiment Analyzer</h1>

      <input
        type="text"
        placeholder="Enter Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <br /><br />

      <button onClick={scrapeReviews}>
        Search Reviews
      </button>

      <button
        onClick={analyzeReviews}
        style={{ marginLeft: "10px" }}
      >
        Analyze Sentiment
      </button>

      <hr />

      <h2>Reviews</h2>

      {reviews.length === 0 ? (
        <p>No Reviews</p>
      ) : (
        <ul style={{ textAlign: "left" }}>
          {reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Sentiment Results</h2>

      {results.map((item, index) => (

        <div key={index}>

          <b>{item.sentiment}</b>

          <p>{item.review}</p>

          <hr />

        </div>

      ))}

      {summary.positive !== undefined && (

        <>

          <h3>Positive : {summary.positive}</h3>

          <h3>Negative : {summary.negative}</h3>

          <h3>Neutral : {summary.neutral}</h3>

          <h2>{recommendation}</h2>

        </>

      )}

    </div>

  );

}

export default App;