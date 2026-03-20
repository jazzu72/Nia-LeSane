import os

client = MongoClient(os.environ.get("MONGO_URI"))
