import React, { useState } from "react";
import axios from "axios";

const SalesReport = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    if (!start || !end) {
      alert("Please select both dates!");
      return;
    }

    const response = await axios.post(`${baseUrl}/stock/sales_report`, {
      start, 
      end
    });

    setSales(response.data.sales);
  };

  return (
    <div className="container mt-4">
      <h3>Date-wise Sales Report</h3>

      <div className="row my-3">
        <div className="col">
          <input 
            type="date" 
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col">
          <input 
            type="date" 
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col">
          <button className="btn btn-primary w-100" onClick={fetchSales}>
            Filter
          </button>
        </div>
      </div>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Remark</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_name}</td>
              <td>{item.qty}</td>
              <td>{item.created_at}</td>
              <td>{item.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default SalesReport;
