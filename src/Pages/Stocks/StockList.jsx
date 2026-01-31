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
      const res = await axios.post(`${baseUrl}/stock/stock_report`, {
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
              <tr class="text-center">
                <th>Id</th>
                <th>Product Name</th>
                {/* <th>Qty</th> */}
                {/* <th>Remark</th> */}
                {/* <th>Created At</th>
                <th>Updated At</th> */}
                <th>Total</th> {/* TOTAL column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.length > 0 ? (
                stocks.map((stock) => (
                  <tr key={stock.id}>
                    <td class="text-center">{stock.product?.id}</td>
                    <td>{stock.product?.name}</td>
                    {/* <td>{stock.qty}</td> */}
                    {/* <td>{stock.remark}</td> */}
                    {/* <td>{stock.created_at}</td>
                    <td>{stock.updated_at}</td> */}
                    <td class="text-center">{stock.total_qty}</td>
                    <td>
                      <div className="btn-group" style={{ display: "flex" }}>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/stock/edit/${stock.id}`)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                          </svg>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(stock.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
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
