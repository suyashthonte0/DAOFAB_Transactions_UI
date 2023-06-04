import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import PaidAmountPage from "./PaidAmountPage";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the getParents REST API
    fetch("http://localhost:8087/getparents?sort=id,asc")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TablePage data={data} />} />
          <Route path="/paid-amount/:id" element={<PaidAmountPage />} />
        </Routes>
      </Router>
    </div>
  );
};

const TablePage = ({ data }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Update the total number of pages based on the data length
    setTotalPages(Math.ceil(data.length / pageSize));
  }, [data]);

  // Function to handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Slice the data array based on the current page
  const startIndex = currentPage * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Parent Table Transactions </h2>
      <table>
        <thead>
          <tr>
            <th>Parent Id</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.sender}</td>
              <td>{item.receiver}</td>
              <td>{item.totalAmount}</td>
              <td className="total-paid-amount">
                <Link to={`/paid-amount/${item.id}`}>
                  {item.totalPaidAmount}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={currentPage === index ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
