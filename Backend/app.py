from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from scraper import scrape_flipkart_reviews

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()


@app.route("/")
def home():
    return jsonify({"message": "Product Sentiment Analyzer API Running"})


@app.route("/scrape", methods=["POST"])
def scrape_reviews():

    data = request.json

    product_name = data["product_name"]

    reviews = scrape_flipkart_reviews(product_name)

    return jsonify({
        "product_name": product_name,
        "reviews": reviews
    })


@app.route("/analyze", methods=["POST"])
def analyze_reviews():

    data = request.json

    reviews = data["reviews"]

    results = []

    positive = 0
    negative = 0
    neutral = 0

    for review in reviews:

        score = analyzer.polarity_scores(review)

        if score["compound"] >= 0.05:
            sentiment = "Positive"
            positive += 1

        elif score["compound"] <= -0.05:
            sentiment = "Negative"
            negative += 1

        else:
            sentiment = "Neutral"
            neutral += 1

        results.append({
            "review": review,
            "sentiment": sentiment
        })

    if positive > negative:
        recommendation = "Recommended to Buy"

    elif negative > positive:
        recommendation = "Not Recommended to Buy"

    else:
        recommendation = "Read More Reviews"

    return jsonify({

        "results": results,

        "summary": {

            "positive": positive,

            "negative": negative,

            "neutral": neutral

        },

        "recommendation": recommendation

    })


if __name__ == "__main__":
    app.run(debug=True)