def calculate_fatigue(mouse, typing, response):
    score = 0

    if mouse < 20:
        score += 0.4
    if typing < 20:
        score += 0.4
    if response > 10:
        score += 0.2

    return score
