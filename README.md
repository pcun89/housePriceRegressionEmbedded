# House Price Regression + Embedded Inference (Linear / Ridge Regression)

**Project:** Predict median house value (California Housing) with a linear/regression model and show how to embed the trained model into C for microcontrollers.

**Language:** Python (training) and C (inference stub)  
**Libraries:** scikit-learn, pandas, numpy, joblib

## What you get
- `main_regression_embedded.py` — loads dataset, trains a Ridge regression model, evaluates it, saves:
  - `reg_pipeline.joblib` — contains scaler + model (for Python inference)
  - `embedded_model.json` — contains model coefficients, intercept, and scaler params for embedding
- `requirements.txt`
- C snippet to run the model on an embedded device (pure C float operations)

## Why this is useful
- Linear (Ridge) models are small and predictable — ideal for embedded devices (tiny RAM/Flash)
- Exporting coefficients + scaler allows you to run inference in pure C with zero ML runtime dependencies

## How to run (training)
1. Create a virtualenv and activate it:
```bash
python -m venv venv
source venv/bin/activate    # macOS / Linux
venv\Scripts\activate       # Windows
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run training:

bash
Copy code
python main_regression_embedded.py
