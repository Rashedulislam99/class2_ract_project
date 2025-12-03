import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CustomersList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      // এখানে যদি API pagination support করে, limit বড় set করি
      const res = await axios.get(`${baseUrl}/customer?limit=1000`);
      console.log("API response:", res.data);

      // ধরো API structure: { success: "yes", customers: [ ... ] }
      const customerArray = res.data.customers || res.data.data || [];
      setCustomers(customerArray);

    } catch (err) {
      console.log(err);
      setError("Error fetching customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const res = await axios.post(`${baseUrl}/customer/delete`, { id });
      if (res.data.success === "yes") fetchCustomers();
    } catch (err) {
      console.log(err);
      alert("Error deleting customer!");
    }
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a', marginBottom: '20px' }}>
        Customers List
      </h2>

      <Link to="/customer/create" className="btn btn-outline-success mb-3">
        New Customer
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, i) => (
                <tr key={customer.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                  <td className="fw-bold text-primary">{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <Link className="btn btn-sm btn-info me-2" to={`/customer/edit/${customer.id}`}>
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteCustomer(customer.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-end">
        <small className="text-muted">Showing {customers.length} customers</small>
      </div>
    </div>
  );
};

export default CustomersList;
