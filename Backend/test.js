const categoryExpenses = {
  Entertainment: 300.0,
  Transportation: 200.0,
  Fruits: 550.0,
  Gift: 1000.0,
  Clothing: 100000000.0,
  Bills: 100000000.0, // The expense for Bills category
};

const thresholds = {
  // Define threshold values for each category to identify anomalies
  Entertainment: 1.5 * categoryExpenses["Entertainment"],
  Transportation: 1.5 * categoryExpenses["Transportation"],
  Fruits: 1.5 * categoryExpenses["Fruits"],
  Gift: 1.5 * categoryExpenses["Gift"],
  Clothing: 1.5 * categoryExpenses["Clothing"],
};

const isAnomaly = (category, expense) => {
  return expense > thresholds[category];
};

const anomalies = [];
for (const category in categoryExpenses) {
  const expense = categoryExpenses[category];
  if (isAnomaly(category, expense)) {
    console.log(category, expense);
    anomalies.push({ category, expense });
  }
}

console.log("Anomalies detected:", anomalies);
