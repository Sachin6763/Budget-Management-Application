import React, { useState, useEffect } from "react";
import CategoryWiseExpenses from "./CategoryWiseExpenses";
import CategoryWiseIncomes from "./CategoryWiseIncomes";
import TotalSavings from "./TotalSavings";
import GraphVisualization from "./GraphVisualization";
import "../styles/Summary.css";
import "../Css/Toaster.css";

const SummaryComponent = ({ Username, months, years }) => {
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [categoryIncomes, setCategoryIncomes] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  // const [visualizationData, setVisualizationData] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const date = new Date();
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [toasterMessage, setToasterMessage] = useState("");
  const handleToaster = (message) => {
    setToasterMessage(message);
    setShowToaster(true);
    setTimeout(() => {
      setShowToaster(false);
    }, 5000);
  };
  useEffect(() => {
    fetchCategoryExpenses();
    fetchCategoryIncomes();

    // fetchDataForVisualization();
  }, []);

  useEffect(() => {
    fetchCategoryExpenses();
    fetchCategoryIncomes();

    // fetchDataForVisualization();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    calculateTotalSavings();
  }, [categoryIncomes, categoryExpenses]);

  const handleMonthChange = (event) => {
    // console.log(event.target.value);
    setSelectedMonth(event.target.value);
    // await fetchCategoryExpenses();
  };

  // Function to handle change in year select
  const handleYearChange = (event) => {
    // console.log("year" + event.target.value);
    setSelectedYear(event.target.value);
    // await fetchCategoryExpenses();
  };

  const calculateTotalSavings = () => {
    let totalExpense = 0;
    let totalIncome = 0;

    categoryExpenses.forEach((category) => {
      totalExpense += parseFloat(category.TotalExpense);
    });

    categoryIncomes.forEach((category) => {
      totalIncome += parseFloat(category.TotalIncome);
    });

    const totalSavings = totalIncome - totalExpense;
    setTotalSavings(totalSavings);
  };

  const fetchCategoryExpenses = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/expenses_summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: Username,
            selectedMonth: selectedMonth,
            selectedYear: selectedYear,
          }),
        }
      );
      const data = await response.json();
      setCategoryExpenses(data);
      // console.log(data, "hrere", selectedMonth);
    } catch (error) {
      console.error("Error fetching category expenses:", error);
    }
  };

  const fetchCategoryIncomes = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/income_summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: Username,
          selectedMonth: selectedMonth,
          selectedYear: selectedYear,
        }),
      });
      const data = await response.json();
      setCategoryIncomes(data);
    } catch (error) {
      console.error("Error fetching category incomes:", error);
    }
  };

  return (
    <div>
      <div className="summary-header">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
      <div className="summary-container">
        <div className="summary-left">
          <div className="category-wise-expenses-container">
            <CategoryWiseExpenses
              expenses={categoryExpenses}
              Username={Username}
              removeExpense={fetchCategoryExpenses}
              handleToaster={handleToaster}
            />
          </div>
          <div className="category-wise-incomes-container">
            <CategoryWiseIncomes
              incomes={categoryIncomes}
              Username={Username}
              removeIncome={fetchCategoryIncomes}
              handleToaster={handleToaster}
            />
          </div>
          <div className="total-savings-container">
            <TotalSavings totalSavings={totalSavings} />
          </div>
        </div>
        <div className="summary-right">
          <div className="graph-container">
            <div className="graph-row">
              <div className="graph-item1">
                <GraphVisualization data={categoryExpenses} cond={0} />
              </div>
              <div className="graph-item2">
                <GraphVisualization data={categoryIncomes} cond={1} />
              </div>
            </div>
          </div>
        </div>
        {showToaster && <div className="toaster">{toasterMessage}</div>}
      </div>
    </div>
  );
};

export default SummaryComponent;
