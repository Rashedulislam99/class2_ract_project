import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StockList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [stocks, setStocks] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch stock list from API
  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/stock/stock_report/`, {
        page,
        perpage: perPage,
      });
      setStocks(res.data.stocks || []);
      setTotalRecords(res.data.total_records || res.data.stocks?.length || 0);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [page, perPage]);

  // Delete stock
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this stock?")) return;

    try {
      await axios.post(`${baseUrl}/stock/delete`, { id });
      alert("Stock deleted successfully!");
      fetchStocks(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete stock!");
    }
  };

  const totalPages = Math.ceil(totalRecords / perPage);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Stock List</h3>
        <button
          className="btn btn-success"
          onClick={() => navigate("/stock/create")}
        >
          New Stock
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        
        <div className="table-responsive">
          <div>
  <button
    className="btn btn-warning me-2"
    onClick={() => navigate("/Lowstock")}
  >
    Low Stock (≤ 10)
  </button>

  <button
    className="btn btn-info"
    onClick={() => navigate("/overstock")}
  >
    Over Stock (≥ 50)
  </button>
</div>

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                {/* <th>Qty</th> */}
                {/* <th>Remark</th> */}
                <th>Created At</th>
                <th>Updated At</th>
                <th>Total</th> {/* TOTAL column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.length > 0 ? (
                stocks.map((stock) => (
                  <tr key={stock.id}>
                    <td>{stock.id}</td>
                    <td>{stock.name}</td>
                    {/* <td>{stock.qty}</td> */}
                    {/* <td>{stock.remark}</td> */}
                    <td>{stock.created_at}</td>
                    <td>{stock.updated_at}</td>
                    <td>{stock.TOTAL}</td> {/* TOTAL value */}
                    <td>
                      <div className="btn-group" style={{ display: "flex" }}>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/stock/edit/${stock.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(stock.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No stocks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Page {page} of {totalPages}
            </div>
            <div>
              <button
                className="btn btn-secondary me-2"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-secondary"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockList;
