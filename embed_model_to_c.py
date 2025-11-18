"""
embed_model_to_c.py
Generate a C header file (embedded_model.h) containing arrays for scaler mean, scale,
coefficients, and intercept as `static const float` so you can paste them into an MCU project.
"""

import json
from pathlib import Path

JSON_PATH = Path("output") / "embedded_model.json"
OUT_C = Path("output") / "embedded_model.h"


def float_array_c(name, arr):
    lines = [f"static const float {name}[] = {{"]
    # format values as float literals with 'f'
    chunked = ", ".join(f"{float(x):.8f}f" for x in arr)
    lines.append("  " + chunked)
    lines.append("};\n")
    return "\n".join(lines)


def main():
    with open(JSON_PATH, "r") as f:
        embedded = json.load(f)
    coef = embedded["coefficients"]
    intercept = embedded["intercept"]
    mean = embedded["scaler"]["mean"]
    scale = embedded["scaler"]["scale"]
    n = embedded["metadata"]["n_features"]

    text = []
    text.append("/* Auto-generated header: embedded_model.h */\n")
    text.append(
        f"#ifndef EMBEDDED_MODEL_H\n#define EMBEDDED_MODEL_H\n\n#include <stddef.h>\n\n")
    text.append(
        f"/* Feature count */\nstatic const size_t N_FEATURES = {n};\n\n")
    text.append(float_array_c("MODEL_COEFS", coef))
    text.append(
        f"static const float MODEL_INTERCEPT = {float(intercept):.8f}f;\n\n")
    text.append(float_array_c("SCALER_MEAN", mean))
    text.append(float_array_c("SCALER_SCALE", scale))
    text.append("#endif /* EMBEDDED_MODEL_H */\n")
    OUT_C.write_text("\n".join(text))
    print(f"Wrote {OUT_C}")


if __name__ == "__main__":
    main()
