import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    full_name: "",
    password: "",
    email: "",
    mobile: "",
    photo: null,
    role_id: "",
    inactive: 0,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // Handle photo file
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => ({ ...prev, photo: file }));
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("user[name]", user.name);
      formData.append("user[full_name]", user.full_name);
      formData.append("user[password]", user.password);
      formData.append("user[email]", user.email);
      formData.append("user[mobile]", user.mobile);
      formData.append("user[role_id]", user.role_id);
      formData.append("user[inactive]", user.inactive);

      if (user.photo) {
        formData.append("photo", user.photo);
      }

      const res = await axios.post(`${baseUrl}/user/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success === "yes") {
        alert("User created successfully!");
        navigate("/user"); // adjust route
      } else {
        alert("Failed to create user!");
      }
    } catch (err) {
      console.log(err);
      alert("Error creating user!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">

          {/* Header */}
          <div className="text-center mb-4">
            <h2
              className="fw-bold mb-2"
              style={{
                fontSize: '38px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ✨ Create User
            </h2>
            <p className="text-muted">Add new user details below</p>
          </div>

          {/* Card */}
          <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    className="form-control form-control-lg"
                    value={user.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control form-control-lg"
                    value={user.mobile}
                    onChange={handleChange}
                  />
                </div>

                {/* Photo */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="mt-2 rounded-circle"
                      width="80"
                      height="80"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>

                {/* Role ID */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Role ID</label>
                  <input
                    type="number"
                    name="role_id"
                    className="form-control form-control-lg"
                    value={user.role_id}
                    onChange={handleChange}
                  />
                </div>

                {/* Inactive */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    name="inactive"
                    className="form-check-input"
                    checked={user.inactive === 1}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Inactive</label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold"
                  style={{
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '17px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  }}
                >
                  💾 Save User
                </button>
              </form>

              <p className="text-center text-muted mt-4 mb-0 small">
                🔒 All information is securely stored
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
