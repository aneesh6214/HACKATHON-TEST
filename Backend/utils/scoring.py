def calculate_score(results):
    score = 0

    if results["coverage"] > 2.0:
        score += 50
    elif results["coverage"] > 1.0:
        score += 30
    else:
        score += 10

    score -= results["collisions"] * 5

    if results["ramp_steepness"] > 10:
        score -= 15

    return max(0, min(100, score))
