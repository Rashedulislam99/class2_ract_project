import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${baseUrl}/product/save`, { product })
      .then(res => {
        if (res.data.success === "yes") {
          alert("Product saved!");
          navigate("/productlist");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">

          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2"
                style={{
                  fontSize: '44px',          // Bigger heading
                  fontWeight: '900',         // Extra bold
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
            >
              📦 Create Product
            </h2>
            <p className="text-muted" style={{ fontSize: '18px', fontWeight: '600' }}>
              Add new product details below
            </p>
          </div>

          <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4 p-md-5">

              <form onSubmit={handleSubmit}>

                {/* Name */}
                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ fontSize: '20px' }}>
                    📦 Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="name"
                    placeholder="Enter product name"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '12px', padding: '14px', fontSize: '16px' }}
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ fontSize: '20px' }}>
                    🏷 Category
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="category"
                    placeholder="Enter product category"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '12px', padding: '14px', fontSize: '16px' }}
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ fontSize: '20px' }}>
                    📝 Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    name="description"
                    rows="3"
                    placeholder="Write product description"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '12px', padding: '14px', fontSize: '16px', resize: 'none' }}
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold"
                  style={{
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '18px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                  }}
                >
                  💾 Save Product
                </button>

              </form>

              <p className="text-center text-muted mt-4 mb-0 small" style={{ fontSize: '14px' }}>
                🔒 All information is securely stored
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
