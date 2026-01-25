import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PurchaseView = () => {
  const { id } = useParams(); // URL থেকে ID নেবে
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const res = await axios.get(`${baseUrl}/purchase/${id}`);
        setPurchase(res.data.purchase);
      } catch (err) {
        console.log(err);
        setError("Error fetching purchase!");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [id]);

  if (loading) return <p>Loading purchase...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!purchase) return <p>No purchase found!</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ color: "#1e3a8a" }}>Purchase Details</h2>

      <div className="card p-3 shadow-sm mb-3">
        <p><strong>ID:</strong> {purchase.id}</p>
        <p><strong>Supplier:</strong> {purchase.supplier?.name || "N/A"}</p>
        <p><strong>Address:</strong> {purchase.address || "N/A"}</p>
        <p><strong>Date:</strong> {purchase.created_at}</p>
        <p><strong>Subtotal:</strong> {purchase.sub_total}</p>
        <p><strong>Discount:</strong> {purchase.discount_amount}</p>
        <p><strong>Net Total:</strong> {purchase.net_total}</p>
      </div>

      {/* Products Table */}
      {purchase.items && purchase.items.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered">
            <thead style={{ background: '#6a11cb', color: 'white' }}>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {purchase.items.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.product?.name || "N/A"}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                  <td>{item.discount}</td>
                  <td>{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/react/purchase" className="btn btn-secondary mt-3">
        Back to List
      </Link>
    </div>
  );
};

export default PurchaseView;
