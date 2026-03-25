import { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const features = [
  { name: "MedInc", min: 0, max: 10, step: 0.1, val: 5 },
  { name: "HouseAge", min: 0, max: 50, step: 1, val: 20 },
  { name: "AveRooms", min: 1, max: 10, step: 0.1, val: 5 },
  { name: "AveBedrms", min: 1, max: 5, step: 0.1, val: 2 },
  { name: "Population", min: 100, max: 5000, step: 50, val: 1500 },
  { name: "AveOccup", min: 1, max: 5, step: 0.1, val: 3 },
  { name: "Latitude", min: 30, max: 45, step: 0.1, val: 34 },
  { name: "Longitude", min: -125, max: -110, step: 0.1, val: -118 }
];

export default function App() {
  const [values, setValues] = useState(features.map(f => f.val));
  const [price, setPrice] = useState(null);

  const handleChange = (i, val) => {
    const updated = [...values];
    updated[i] = Number(val);
    setValues(updated);
  };

  const predict = async () => {
    try {
      const res = await fetch(
        "https://house-api-816554231079.us-central1.run.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ values })
        }
      );

      const data = await res.json();
      setPrice(data.prediction * 100000);
    } catch (e) {
      console.error(e);
    }
  };

  const chartData = {
    labels: ["Predicted Price"],
    datasets: [
      {
        label: "USD",
        data: [price || 0]
      }
    ]
  };

  return (
    <div className="container">

      <header className="hero">
        <h1>🏠 House Price Predictor</h1>
        <p>Powered by ML + Google Cloud Run</p>
      </header>

      <div className="card">
        <h2>Adjust Features</h2>

        {features.map((f, i) => (
          <div key={i} className="slider">
            <label>{f.name}: {values[i]}</label>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={values[i]}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </div>
        ))}

        <button onClick={predict} className="btn">
          Predict Price
        </button>

        {price && (
          <h2 className="result">
            💰 ${price.toLocaleString()}
          </h2>
        )}
      </div>

      <div className="card">
        <h2>Prediction Chart</h2>
        <Bar data={chartData} />
      </div>

    </div>
  );
}