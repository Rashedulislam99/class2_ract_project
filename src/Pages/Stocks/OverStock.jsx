import React, { useEffect, useState } from "react";
import axios from "axios";

const OverStock = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [stocks, setStocks] = useState([]);

  const fetchOverStock = async () => {
    try {
      const res = await axios.post(`${baseUrl}/stock/over_stock`, {
        page: 1,
        perpage: 5000,
      });
     console.log(res.data)
      const data = res.data.stocks || [];

      // Filter over stock (TOTAL >= 50)
//       const overStock = data.filter((item) => Number(item.TOTAL) >= 50);
// console.log("sssssssssssss",overStock)
      setStocks(res.data);
    } catch (err) {
      console.error("Over stock error:", err);
    }
  };

  useEffect(() => {
    fetchOverStock();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-3 text-primary">Over Stock Items (≥ 50)</h3>

      <table className="table table-bordered">
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
            stocks?.map((s) => (
              <tr key={s.product.id}>
                <td>{s.product.id}</td>
                <td>{s.product.name}</td>
                <td className="text-primary fw-bold">{s.total_qty}</td>
                <td>{s.product.created_at}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Over Stock Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
       <button className="btn btn-primary mb-3" onClick={() => window.print()}>
  🖨 Print Report
</button>
    </div>
  );
};

export default OverStock;
