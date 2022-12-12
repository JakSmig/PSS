const generateCacheKey = (box: string) => {
  const coords = box.substring(1, box.length - 1).split(',');

  const coordsValues = coords.map(coord => Math.round(Number(coord)));

  return coordsValues;
};

export { generateCacheKey };
