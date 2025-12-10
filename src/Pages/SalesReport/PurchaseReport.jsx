import React, { useState } from "react";
import axios from "axios";

const PurchaseReport = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPurchases = async () => {
    if (!start || !end) {
      alert("Please select both dates!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/stock/purchase_report`, {
        start,
        end,
      });

      setPurchases(response?.data?.purchases || []);
    } catch (err) {
      console.error("Error fetching purchases:", err);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Date-wise Purchase Report</h3>

      <div className="row my-3">
        <div className="col-md-3">
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary w-100"
            onClick={fetchPurchases}
            disabled={loading}
          >
            {loading ? "Loading..." : "Filter"}
          </button>
        </div>
      </div>

      <table className="table table-bordered mt-4 table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                {loading ? "Loading..." : "No purchases found for selected dates."}
              </td>
            </tr>
          ) : (
            purchases.map((item, index) => (
              <tr key={item.id ?? index}>
                <td>{index + 1}</td>
                <td>{item.product_name ?? "-"}</td>
                <td>{item.qty ?? 0}</td>
                <td>{item.created_at ?? "-"}</td>
                <td>{item.remark ?? "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseReport;
