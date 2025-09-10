import pandas as pd
import random
import os

# Define diseases and associated symptoms
diseases = {
    "Acute Diarrheal Disease": ["Diarrhea", "Dehydration", "Abdominal_Pain"],
    "Cholera": ["Watery_Diarrhea", "Vomiting", "Dehydration"],
    "Hepatitis A": ["Fatigue", "Nausea", "Fever", "Jaundice"],
    "Hepatitis E": ["Fever", "Fatigue", "Loss_of_Appetite", "Jaundice"],
    "Leptospirosis": ["Fever", "Headache", "Muscle_Pain", "Vomiting"]
}

data = []
num_samples = 500

for _ in range(num_samples):
    disease = random.choices(list(diseases.keys()), weights=[200, 5, 20, 10, 15])[0]
    symptoms = diseases[disease]
    row = {symptom: random.choice([0,1]) for symptom_list in diseases.values() for symptom in symptom_list}
    row["Disease"] = disease
    data.append(row)

df = pd.DataFrame(data)

os.makedirs("data", exist_ok=True)
df.to_csv("data/synthetic_data.csv", index=False)
print("Synthetic dataset created at data/synthetic_data.csv")
