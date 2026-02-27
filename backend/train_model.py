"""
train_model.py
Trains a RandomForest on the 9 URL-computable features from the phishing dataset.
Run this once to generate model/phishing_model.pkl
"""
import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

print("Loading dataset...")
data = pd.read_csv("phishing_dataset.csv")

# Only use the 9 features that can be computed directly from a URL string
FEATURE_COLS = [
    'having_IPhaving_IP_Address ',
    'URLURL_Length ',
    'Shortining_Service ',
    'having_At_Symbol ',
    'double_slash_redirecting ',
    'Prefix_Suffix ',
    'having_Sub_Domain ',
    'HTTPS_token ',
    'port ',
]

X = data[FEATURE_COLS]
y = data['Result'].replace(-1, 0)   # -1 (legit) -> 0, 1 (phishing) -> 1

print(f"Samples: {len(X)} | Features: {len(FEATURE_COLS)}")
print(f"Class distribution: {y.value_counts().to_dict()}")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\nTraining RandomForest (200 trees)...")
model = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"\nAccuracy: {accuracy_score(y_test, y_pred):.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["Legitimate", "Phishing"]))

os.makedirs("model", exist_ok=True)
with open("model/phishing_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model saved to model/phishing_model.pkl")