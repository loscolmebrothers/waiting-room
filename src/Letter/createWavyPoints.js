function createWavyPoints(startX, endX, y, waveAmplitude = 1.5, waveFrequency = 2) {
  const points = [];
  const segments = 15;
  for (let i = 0; i <= segments; i++) {
    const x = startX + (endX - startX) * (i / segments);
    const offset =
      Math.sin((i / segments) * Math.PI * waveFrequency) * waveAmplitude;
    points.push(x, y + offset);
  }
  return points;
}

export default createWavyPoints;
