import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get(`${baseUrl}/product`).then(res => setProducts(res.data));
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = (id) => {
    if(!window.confirm("Are you sure?")) return;
    axios.post(`${baseUrl}/product/delete`, { id })
      .then(res => { if(res.data.success === "yes") fetchProducts(); });
  };

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#ff4d4f', marginBottom: '20px' }}>
        Products List
      </h2>

      <table className="table table-bordered">
        <thead style={{ background: 'linear-gradient(135deg, #8b99d6ff 0%, #ff7a7a 100%)' }}>
          <tr>
            <th style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>Name</th>
            <th style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>Category</th>
            <th style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>Description</th>
            <th style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} style={{ background: i%2===0 ? '#f8f9fa':'#ffffff', fontSize: '16px' }}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>
                <Link className="btn btn-info me-2" to={`/product/edit/${p.id}`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
