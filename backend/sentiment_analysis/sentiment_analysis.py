from textblob import TextBlob

text = "I love this product! It's amazing."

# Perform sentiment analysis
analysis = TextBlob(text)
sentiment_score = analysis.sentiment.polarity

# Output sentiment score
if sentiment_score > 0:
    print("Positive sentiment")
elif sentiment_score < 0:
    print("Negative sentiment")
else:
    print("Neutral sentiment")