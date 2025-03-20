from flask import Flask, request, jsonify
from flask_cors import CORS
import random  

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

def generate_meows(prompt):
    meow_variants = [
        "Meow", "Meeoooow", "MEOW", "Meeeooow", "MeOoooow", 
        "Mroww", "Myaooow", "Meoow!", "Meeow~", "Mrrreow!"
    ]

    prompt_length = len(prompt)
    print(f"Received prompt: {prompt} (Length: {prompt_length})")  # Debugging log

    if prompt_length < 10:
        response = random.choice(meow_variants)
    
    elif prompt_length < 30:
        meow_count = random.randint(4, 7)  # Always at least 4 meows
        response = " ".join(random.choices(meow_variants, k=meow_count))
    
    else:
        meow_count = random.randint(8, 12)  # Always at least 8 meows
        response_type = random.choice(["paragraph", "bullets"])
        
        if response_type == "paragraph":
            response = " ".join(random.choices(meow_variants, k=meow_count))
        else:
            response = "\n".join([f"- {random.choice(meow_variants)}" for _ in range(meow_count)])

    print(f"Generated response: {response}")  # Debugging log
    return {"response": response}

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
