// src/Pages/Supplier/EditSupplier.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSupplier = () => {
  const { supplierID } = useParams(); 
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [supplier, setSupplier] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await axios.post(`${baseUrl}/supplier/find`, { id: supplierID });
        if (res.data.supplier) {
          setSupplier(res.data.supplier);
        } else {
          setError("Supplier not found");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching supplier data");
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, [supplierID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/supplier/update`, { supplier });
      if (res.data.success === "yes") {
        alert("Supplier updated successfully!");
        navigate("/supplierlist");
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating supplier!");
    }
  };

  if (loading) return <p>Loading supplier data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div
          className="card-header d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #7b8675ff, #d397b4ff)",
            color: "#000",
            borderTopLeftRadius: "0.8rem",
            borderTopRightRadius: "0.8rem",
          }}
        >
          <span style={{ fontSize: "28px", marginRight: "10px" }}>🛠️</span>
          <h4 className="mb-0 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Edit Supplier
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                value={supplier.name ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                value={supplier.email ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>
                Phone
              </label>
              <input
                type="text"
                name="phone"
                className="form-control form-control-lg"
                value={supplier.phone ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ fontSize: '18px', color: '#2D3748' }}>
                Address
              </label>
              <textarea
                name="address"
                className="form-control form-control-lg"
                value={supplier.address ?? ""}
                onChange={handleChange}
                rows="3"
                style={{ fontSize: '16px', padding: '14px', resize: 'none' }}
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Update Supplier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSupplier;
