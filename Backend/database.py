from pymongo import MongoClient

MONGO_URI = "mongodb+srv://Santhiya:Santhiya2007@cluster0.axch0nr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(MONGO_URI)

db = client["product_sentiment"]

collection = db["reviews"]

print("MongoDB Connected Successfully!")