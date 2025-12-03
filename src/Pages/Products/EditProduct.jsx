import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { productID } = useParams(); 
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`${baseUrl}/product/find`, { id: productID });
        if (res.data) {
          setProduct(res.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/product/update`, { product });
      if (res.data.success === "yes") {
        alert("Product updated successfully!");
        navigate("/productlist");
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating product!");
    }
  };

  if (loading) return <p>Loading product data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm">
        <div className="card-header text-white" style={{ backgroundColor: '#c7ff5eff' }}>
          <h3 className="mb-0">Edit Product</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label 
                className="form-label fw-bold" 
                style={{ fontSize: '18px', color: '#2D3748' }}
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                value={product.name ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label 
                className="form-label fw-bold" 
                style={{ fontSize: '18px', color: '#2D3748' }}
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                className="form-control form-control-lg"
                value={product.category ?? ""}
                onChange={handleChange}
                required
                style={{ fontSize: '16px', padding: '14px' }}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label 
                className="form-label fw-bold" 
                style={{ fontSize: '18px', color: '#2D3748' }}
              >
                Description
              </label>
              <textarea
                name="description"
                className="form-control form-control-lg"
                value={product.description ?? ""}
                onChange={handleChange}
                rows="4"
                style={{ fontSize: '16px', padding: '14px', resize: 'none' }}
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
