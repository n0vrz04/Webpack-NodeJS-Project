function generateUniqueId(data = []) {
  if (data.length === 0) return "1";

  const ids = data.map((x) => parseInt(x.id, 10)).filter((id) => !isNaN(id));

  if (ids.length === 0) return "1";

  const maximumID = Math.max(...ids);
  return (maximumID + 1).toString();
}

module.exports = generateUniqueId;
