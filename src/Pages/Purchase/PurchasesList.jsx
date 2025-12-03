import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PurchaseList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get(`${baseUrl}/purchase`);
      console.log(res.data);

      setPurchases(res.data.purchases || []);
    } catch (err) {
      console.log(err);
      setError("Error fetching purchases!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const deletePurchase = async (id) => {
    if (!window.confirm("Are you sure you want to delete this purchase?")) return;

    try {
      const res = await axios.post(`${baseUrl}/purchase/delete`, { id });

      if (res.data.success === "yes") fetchPurchases();
    } catch (err) {
      console.log(err);
      alert("Error deleting purchase!");
    }
  };

  if (loading) return <p>Loading purchases...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a', marginBottom: '20px' }}>
        Purchases List
      </h2>

      <Link to="/purchase/create" className="btn btn-outline-success mb-3">
        New Purchase
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th>ID</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Subtotal</th>
              <th>Discount</th>
              <th>Net Total</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {purchases.length > 0 ? (
              purchases.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                  <td className="fw-bold text-primary">{p.id}</td>
                  <td>{p.supplier_name}</td>
                  <td>{p.created_at}</td>
                  <td>{p.sub_total}</td>
                  <td>{p.discount_amount}</td>
                  <td className="text-success fw-semibold">{p.net_total}</td>
                  {/* <td>{p.status_id === 1 ? "Active" : "Pending"}</td> */}

                  <td>
                    <button className="btn btn-sm btn-danger me-2"
                      onClick={() => deletePurchase(p.id)}>
                      Delete
                    </button>

                    <Link className="btn btn-sm btn-info"
                      to={`/purchase/view/${p.id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No purchases found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default PurchaseList;
