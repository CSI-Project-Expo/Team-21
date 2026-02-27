from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, os, re
from urllib.parse import urlparse
from feature_extraction import extract_features, SHORTENERS

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join("model", "phishing_model.pkl")

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


def is_obvious_phishing(url: str) -> bool:
    """Hard rules for cases the model struggles with due to limited URL features."""
    parsed = urlparse(url)
    domain = (parsed.netloc or '').lower().split(':')[0]
    
    # IP address used as hostname
    if re.match(r'^(\d{1,3}\.){3}\d{1,3}$', domain):
        return True
    
    # Known URL shortener (hides true destination)
    if any(s in domain for s in SHORTENERS):
        return True
    
    return False


@app.route("/")
def home():
    return "Flask Phishing Detector is running!"


@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    data = request.get_json()
    url = (data.get("url") or "").strip()

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    # Add scheme if missing
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "http://" + url

    try:
        # Hard rules first
        if is_obvious_phishing(url):
            return jsonify({"result": "Phishing"})

        # ML model prediction
        features_df = extract_features(url)
        prediction = model.predict(features_df)[0]
        result = "Phishing" if prediction == 1 else "Legitimate"
        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"status": "fail", "message": "Invalid JSON"}), 400

    email = data.get("email")
    password = data.get("password")

    # Demo credentials — replace with a real database in production
    # Valid login: any email + any password that is not empty
    if email and password:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "fail", "message": "Please enter email and password"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)