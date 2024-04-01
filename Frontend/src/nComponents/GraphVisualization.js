import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Visualization.css";

const CategoryPieChart = ({ data, cond }) => {
  // Define colors for each category
  const COLORS = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Turquoise
    "#9966CC", // Lavender
    "#FF4500", // OrangeRed
    "#32CD32", // LimeGreen
    "#1E90FF", // DodgerBlue
    "#FF1493", // DeepPink
    "#00CED1", // DarkTurquoise
    "#FFD700", // Gold
    "#8A2BE2", // BlueViolet
    "#20B2AA", // LightSeaGreen
    "#B0E0E6", // PowderBlue
    "#FFA07A", // LightSalmon
    "#00FF7F", // SpringGreen
    "#8B4513", // SaddleBrown
    "#4682B4", // SteelBlue
    "#556B2F", // DarkOliveGreen
    "#800080", // Purple
    // Add more colors as needed
  ];
  // Add more colors as needed

  // Extracting category names and total expenses from the data
  const chartData = data.map((item, index) => ({
    name: item.CategoryName,
    value:
      cond == 1 ? parseFloat(item.TotalIncome) : parseFloat(item.TotalExpense),
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="pie-chart-container">
      {cond == 0 && <h3>Expense Category</h3>}
      {cond == 1 && <h3>Income Category</h3>}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            labelLine={false}
            label={({ name, value }) => `${name}: $${value}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend align="center" verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;

/* Styles for the pie chart container */
