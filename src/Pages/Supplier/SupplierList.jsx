import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SupplierList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/supplier/list`);
      setSuppliers(res.data.suppliers || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching suppliers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (id) => {
    if (!window.confirm("Are you sure to delete this supplier?")) return;

    try {
      const res = await axios.post(`${baseUrl}/supplier/delete`, { id });
      if (res.data.success === "yes") {
        fetchSuppliers();
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting supplier!");
    }
  };

  if (loading) return <p>Loading suppliers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a', marginBottom: '20px' }}>
        Supplier List
      </h2>

      <Link to="/supplier/create" className="btn btn-outline-success mb-3">
        New Supplier
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th style={{ fontWeight: '700' }}>#</th>
              <th style={{ fontWeight: '700' }}>Name</th>
              <th style={{ fontWeight: '700' }}>Email</th>
              <th style={{ fontWeight: '700' }}>Phone</th>
              <th style={{ fontWeight: '700' }}>Address</th>
              <th style={{ fontWeight: '700' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((s, i) => (
                <tr key={s.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff', fontSize: '16px' }}>
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.address}</td>
                  <td>
                    <Link className="btn btn-sm btn-info me-2" to={`/supplier/edit/${s.id}`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteSupplier(s.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">No suppliers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {suppliers.length} suppliers</small>
      </div>
    </div>
  );
};

export default SupplierList;
