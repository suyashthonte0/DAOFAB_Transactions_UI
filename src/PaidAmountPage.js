import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PaidAmountPage = () => {
  // Extract ID from the URL params
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the getChildren REST API
    fetch(`http://localhost:8087/getchildren?parentIdFilter=${id}&sort=id`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <h2>Paid Amount Table for Parent ID: {id}</h2>
      <table>
        <thead>
          <tr>
            <th>Child Id</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.sender}</td>
              <td>{item.receiver}</td>
              <td>{item.totalAmount}</td>
              <td>{item.paidAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaidAmountPage;
