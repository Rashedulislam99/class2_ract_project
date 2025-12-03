import React, { useState } from "react";
import axios from "axios";

const CreateWarehouse = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/warehouse/save`, { warehouse: formData });
      if (res.data.success === "yes") {
        alert("✅ Warehouse created successfully!");
        setFormData({ name: "", address: "", phone: "", email: "" });
      } else {
        alert("❌ Failed to create warehouse");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error creating warehouse");
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div
          className="card-header d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #7b8675ff, #d397b4ff)",
            color: "#000",
            borderTopLeftRadius: "0.8rem",
            borderTopRightRadius: "0.8rem",
          }}
        >
          <span style={{ fontSize: "28px", marginRight: "10px" }}>🏭</span>
          <h4 className="mb-0 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Add Warehouse
          </h4>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Warehouse Name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              rows={3}
              placeholder="Warehouse Address"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Warehouse Phone"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Warehouse Email"
            />
          </div>

          <div className="text-end">
            <button onClick={handleSubmit} className="btn btn-success btn-lg">
              ✅ Save Warehouse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWarehouse;
