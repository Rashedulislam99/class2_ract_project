import React, { useEffect, useState } from "react";
import axios from "axios";

const LowStock = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [stocks, setStocks] = useState([]);

  const fetchLowStock = async () => {
    try {
      const res = await axios.post(`${baseUrl}/stock/low_stock`);
      const data = res.data.stocks || [];

      // Filter low stock (qty <= 10)
      // const lowStock = data.filter((item) => Number(item.qty) <= 10);

      setStocks(data);
    } catch (err) {
      console.error("Low stock error:", err);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-3 text-danger">Low Stock Items (≤ 10)</h3>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Total Stock</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {stocks.length > 0 ? (
            stocks.map((s) => (
              <tr key={s.product?.id}>
                <td>{s.product?.id}</td>
                <td>{s.product?.name || "N/A"}</td>
                <td className="text-danger fw-bold">{s.total_qty}</td>
                <td>
                  {s.product?.created_at
                    ? new Date(s.product.created_at).toLocaleString()
                    : "-"}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Low Stock Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        className="btn btn-primary mb-3"
        onClick={() => window.print()}
      >
        🖨 Print Report
      </button>
    </div>
  );
};

export default LowStock;
