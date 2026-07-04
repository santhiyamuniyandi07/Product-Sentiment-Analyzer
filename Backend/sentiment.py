from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

review = input("Enter Product Review: ")

score = analyzer.polarity_scores(review)

print("\nSentiment Score:")
print(score)

if score["compound"] >= 0.05:
    print("Sentiment: Positive 😊")
elif score["compound"] <= -0.05:
    print("Sentiment: Negative 😞")
else:
    print("Sentiment: Neutral 😐")