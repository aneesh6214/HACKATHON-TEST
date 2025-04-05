from fastapi import FastAPI
from simulation.run_simulation import run_simulation
from utils.scoring import calculate_score

app = FastAPI()

@app.post("/simulate-score")
def simulate_score():
    results = run_simulation()
    score = calculate_score(results)
    return {"score": score, "details": results}
