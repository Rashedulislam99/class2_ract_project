import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RoleList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${baseUrl}/role`);
      setRoles(res.data.roles || []);
    } catch (err) {
      console.log(err);
      setError("Error fetching roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  const deleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      const res = await axios.delete(`${baseUrl}/role/delete`, { data: { id } });
      if (res.data.success === "yes") fetchRoles();
      else alert("Delete failed!");
    } catch (err) {
      console.log(err);
      alert("Error deleting role!");
    }
  };

  if (loading) return <p>Loading roles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a', marginBottom: '20px' }}>
        Roles List
      </h2>

      <Link to="/role/create" className="btn btn-outline-success mb-3">
        New Role
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th style={{ fontWeight: '700' }}>#</th>
              <th style={{ fontWeight: '700' }}>Role Name</th>
              <th style={{ fontWeight: '700' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((role, i) => (
                <tr key={role.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff', fontSize: '16px' }}>
                  <td className="fw-bold text-primary">{i + 1}</td>
                  <td>{role.name}</td>
                  <td>
                    <Link className="btn btn-sm btn-info me-2" to={`/role/edit/${role.id}`}>Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteRole(role.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">No roles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {roles.length} roles</small>
      </div>
    </div>
  );
};

export default RoleList;
