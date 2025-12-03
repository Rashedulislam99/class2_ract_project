import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const imgUrl = import.meta.env.VITE_IMG_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user`);
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.post(`${baseUrl}/user/delete`, { id });
      if (res.data.success === "yes") fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Error deleting user!");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#1e3a8a",
          marginBottom: "20px",
        }}
      >
        Users List
      </h2>

      <Link to="/user/create" className="btn btn-outline-success">
        New User
      </Link>

      <div className="table-responsive shadow-sm rounded mt-3">
        <table className="table table-bordered">
          <thead
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
            }}
          >
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Photo</th>
              <th>Role ID</th>
              <th>Inactive</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={user.id}
                  style={{ background: i % 2 === 0 ? "#f8f9fa" : "#ffffff" }}
                >
                  <td className="fw-bold text-primary">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>

                  <td>
                    {user.photo ? (
                      <img
                        src={`${imgUrl}/${user.photo}`}
                        alt={user.name}
                        width="45"
                        height="45"
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <small className="text-muted">No photo</small>
                    )}
                  </td>

                  <td>{user.role_id}</td>

                  <td>
                    {user.inactive === "1" || user.inactive === 1 ? (
                      <span className="badge bg-danger">Inactive</span>
                    ) : (
                      <span className="badge bg-success">Active</span>
                    )}
                  </td>

                  <td>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/user/edit/${user.id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {users.length} users</small>
      </div>
    </div>
  );
};

export default UsersList;
