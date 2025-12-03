import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCustomer = () => {
  const { customerID } = useParams(); // route param
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., http://localhost/index.php/project_rashed_php-main/api

  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customer data from API
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.post(`${baseUrl}/customer/find`, { id: customerID });
        if (res.data) {
          setCustomer(res.data); // assuming CustomerApi returns full object
        } else {
          setError("Customer not found");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching customer data");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerID]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit updated customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/customer/update`, { customer });
      if (res.data.success === "yes") {
        alert("Customer updated successfully!");
        navigate("/customerlist");
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating customer!");
    }
  };

  if (loading) return <p>Loading customer data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Edit Customer</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={customer.name ?? ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={customer.email ?? ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={customer.phone ?? ""}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                value={customer.address ?? ""}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Update Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
