import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import joblib

DATA_PATH = os.path.join(os.path.dirname(__file__), "crop_data.csv")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "crop_model.pkl")

def generate_crop_data(samples_per_crop=150):
    """Generates synthetic agronomic dataset for crop classification."""
    np.random.seed(42)
    crops_config = {
        "mustard": {"N": (55, 15), "P": (45, 10), "K": (40, 10), "temp": (20, 3), "humidity": (60, 5), "ph": (6.8, 0.4), "rainfall": (65, 12)},
        "chickpea": {"N": (45, 12), "P": (60, 12), "K": (70, 12), "temp": (21, 3), "humidity": (55, 6), "ph": (7.2, 0.4), "rainfall": (55, 10)},
        "potato": {"N": (95, 15), "P": (50, 10), "K": (55, 10), "temp": (19, 3), "humidity": (75, 6), "ph": (6.2, 0.3), "rainfall": (110, 20)},
        "wheat": {"N": (115, 18), "P": (48, 10), "K": (40, 8), "temp": (18, 3), "humidity": (60, 5), "ph": (6.7, 0.4), "rainfall": (75, 15)},
        "pea": {"N": (40, 10), "P": (52, 10), "K": (50, 10), "temp": (17, 3), "humidity": (65, 5), "ph": (6.6, 0.4), "rainfall": (65, 12)},
        "maize": {"N": (85, 15), "P": (48, 10), "K": (45, 10), "temp": (25, 4), "humidity": (65, 6), "ph": (6.5, 0.4), "rainfall": (85, 15)},
        "rice": {"N": (100, 15), "P": (48, 10), "K": (45, 10), "temp": (27, 3), "humidity": (82, 5), "ph": (6.4, 0.4), "rainfall": (200, 30)},
    }
    
    rows = []
    for crop, params in crops_config.items():
        for _ in range(samples_per_crop):
            n = round(max(10, np.random.normal(params["N"][0], params["N"][1])), 1)
            p = round(max(10, np.random.normal(params["P"][0], params["P"][1])), 1)
            k = round(max(10, np.random.normal(params["K"][0], params["K"][1])), 1)
            temp = round(np.random.normal(params["temp"][0], params["temp"][1]), 1)
            humidity = round(np.random.normal(params["humidity"][0], params["humidity"][1]), 1)
            ph = round(np.random.normal(params["ph"][0], params["ph"][1]), 2)
            rainfall = round(max(10, np.random.normal(params["rainfall"][0], params["rainfall"][1])), 1)
            rows.append({
                "N": n, "P": p, "K": k,
                "temperature": temp, "humidity": humidity, "ph": ph,
                "rainfall": rainfall, "label": crop
            })
            
    df = pd.DataFrame(rows)
    df.to_csv(DATA_PATH, index=False)
    print(f"Generated synthetic dataset with {len(df)} samples saved to {DATA_PATH}")
    return df

def train_and_save():
    """Trains a Random Forest classifier and saves model to crop_model.pkl."""
    if not os.path.exists(DATA_PATH) or os.path.getsize(DATA_PATH) == 0:
        df = generate_crop_data()
    else:
        df = pd.read_csv(DATA_PATH)
        if df.empty:
            df = generate_crop_data()

    X = df[["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]]
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Training Complete. Test Accuracy: {accuracy * 100:.2f}%")
    print(classification_report(y_test, y_pred))

    joblib.dump(model, MODEL_PATH)
    print(f"Model successfully saved to {MODEL_PATH}")

if __name__ == "__main__":
    train_and_save()
