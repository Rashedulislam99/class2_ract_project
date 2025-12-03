import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WarehouseList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/warehouse/list`);
      setWarehouses(res.data.warehouses || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching warehouses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const deleteWarehouse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this warehouse?")) return;

    try {
      const res = await axios.post(`${baseUrl}/warehouse/delete`, { id });
      if (res.data.success === "yes") {
        fetchWarehouses();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting warehouse!");
    }
  };

  if (loading) return <p>Loading warehouses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a', marginBottom: '20px' }}>
        Warehouse List
      </h2>

      <Link to="/warehouse/create" className="btn btn-outline-success mb-3">
        New Warehouse
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th style={{ fontWeight: '700' }}>#</th>
              <th style={{ fontWeight: '700' }}>Name</th>
              <th style={{ fontWeight: '700' }}>Address</th>
              <th style={{ fontWeight: '700' }}>Phone</th>
              <th style={{ fontWeight: '700' }}>Email</th>
              <th style={{ fontWeight: '700' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.length > 0 ? (
              warehouses.map((w, i) => (
                <tr key={w.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff', fontSize: '16px' }}>
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td>{w.name}</td>
                  <td>{w.address}</td>
                  <td>{w.phone}</td>
                  <td>{w.email}</td>
                  <td>
                    <Link className="btn btn-sm btn-info me-2" to={`/warehouse/edit/${w.id}`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteWarehouse(w.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">No warehouses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {warehouses.length} warehouses</small>
      </div>
    </div>
  );
};

export default WarehouseList;
