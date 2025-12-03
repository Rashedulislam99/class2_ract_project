import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [user, setUser] = useState({
    id: "",
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user from API
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/find/${userId}`);
      const u = res.data;
      console.log(u);
      
      if (u) {
        setUser({
          id: u.id || "",
          name: u.name || "",
          full_name: u.full_name || "",
          password: "",
          email: u.email || "",
          mobile: u.mobile || "",
          photo: u.photo|| "",
          role_id: u.role_id || "",
          inactive: u.inactive || 0,
        });
        if (u.photo) setPhotoPreview(`${baseUrl}/img/${u.photo}`);
      } else {
        setError("User not found");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // Photo file change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => ({ ...prev, photo: file }));
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  // Submit updated user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("name", user.name);
      formData.append("full_name", user.full_name);
      formData.append("password", user.password); // leave blank if unchanged
      formData.append("email", user.email);
      formData.append("mobile", user.mobile);
      formData.append("role_id", user.role_id);
      formData.append("inactive", user.inactive);

      if (user.photo) {
        formData.append("photo", user.photo);
      }

      const res = await axios.post(`${baseUrl}/user/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success === "yes") {
        alert("User updated successfully!");
        navigate("/user");
      } else {
        setError(res.data.message || "Update failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating user!");
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Edit User</h3>
        </div>
        <div className="card-body">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="full_name"
                className="form-control"
                value={user.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={handleChange}
              />
              <small className="text-muted">Leave blank to keep current password</small>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                value={user.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Photo</label>
              <input
                type="file"
                className="form-control"
                onChange={handlePhotoChange}
                accept="image/*"
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

            <div className="mb-3">
              <label className="form-label">Role ID</label>
              <input
                type="number"
                name="role_id"
                className="form-control"
                value={user.role_id}
                onChange={handleChange}
              />
            </div>

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

            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Update User
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
