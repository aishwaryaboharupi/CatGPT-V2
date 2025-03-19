from flask import Flask, request, jsonify
from flask_cors import CORS
import random  

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

def generate_meows(prompt):
    meow_variants = [
        "Meow. ", "Meeooow. ", "MEOW! ", "Purr... meow. ", 
        "Mroww~ ", "Hisss! (just kidding, meow) ", "Meow-meow! "
    ]
    
    num_meows = min(10, max(3, len(prompt) // 5))
    meow_text = "".join(random.choices(meow_variants, k=num_meows))
    
    return {"response": meow_text}

@app.route("/", methods=["GET"])
def home():
    return "Flask is running!"

@app.route("/meow", methods=["POST"])
def meow():
    data = request.get_json()
    if not data or "prompt" not in data:
        return jsonify({"error": "Invalid request"}), 400
    return jsonify(generate_meows(data["prompt"]))

if __name__ == "__main__":
    app.run(debug=True)
