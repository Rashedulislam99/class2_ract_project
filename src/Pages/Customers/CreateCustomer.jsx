import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      url: `${baseUrl}/customer/save`,
      method: "POST",
      data: { customer },
    })
      .then((res) => {
        console.log(res);
        if (res) {
          navigate("/customerlist"); // তোমার রুট অনুযায়ী
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-lg-7 col-md-9">
      
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold mb-2" style={{
          fontSize: '38px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          ✨ Create Customer
        </h2>
        <p className="text-muted">Add new customer details below</p>
      </div>

      {/* Card */}
      <div className="card shadow-lg border-0" style={{borderRadius: '20px'}}>
        <div className="card-body p-4 p-md-5">

          <form onSubmit={handleSubmit}>
            
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-semibold" style={{color: '#2D3748', fontSize: '16px'}}>
                👤 Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="name"
                id="name"
                placeholder="Enter customer name"
                onChange={handleChange}
                required
                style={{
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  padding: '12px 18px',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-semibold" style={{color: '#2D3748', fontSize: '16px'}}>
                📧 Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                name="email"
                id="email"
                placeholder="customer@example.com"
                onChange={handleChange}
                required
                style={{
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  padding: '12px 18px',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="form-label fw-semibold" style={{color: '#2D3748', fontSize: '16px'}}>
                📱 Phone Number
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="phone"
                id="phone"
                placeholder="+880 1XXX-XXXXXX"
                onChange={handleChange}
                required
                style={{
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  padding: '12px 18px',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="form-label fw-semibold" style={{color: '#2D3748', fontSize: '16px'}}>
                📍 Address
              </label>
              <textarea
                className="form-control form-control-lg"
                name="address"
                id="address"
                rows="3"
                placeholder="Enter full address"
                onChange={handleChange}
                required
                style={{
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  padding: '12px 18px',
                  resize: 'none',
                  fontSize: '15px'
                }}
              ></textarea>
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
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              💾 Save Customer
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-muted mt-4 mb-0 small">
            🔒 All information is securely stored
          </p>

        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default CreateCustomer;
