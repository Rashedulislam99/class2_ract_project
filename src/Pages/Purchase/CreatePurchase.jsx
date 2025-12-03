import React, { useEffect, useState } from "react";
import axios from "axios";
import useCart from "../../components/useCart";

const CreatePurchase = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Cart from localStorage
  const { addItem, delItem, clear, cart } = useCart("PurchaseCart");

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [supplier, setSupplier] = useState({});
  const [address, setAddress] = useState("");

  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: 0,
    qty: 1,
    discount: 0,
    subtotal: 0,
  });

  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    total: 0,
  });

  // Fetch suppliers and products
  const fetchApi = async () => {
    try {
      const res = await axios.get(`${baseUrl}/supplier/product_suppliers/`);
      setSuppliers(res.data.suppliers || []);
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Update cart items and summary when cart changes
  useEffect(() => {
    setCartItems(cart);
    calculateSummary();
  }, [cart]);

  const calculateSummary = () => {
    let sub = 0;
    let dis = 0;

    cart.forEach((item) => {
      sub += item.qty * item.price;
      dis += item.discount;
    });

    setSummary({
      subtotal: sub,
      discount: dis,
      total: sub - dis,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "supplier") {
      setSupplier(JSON.parse(value));
      return;
    }

    if (name === "product") {
      const p = JSON.parse(value);
      setProduct({
        id: p.id,
        name: p.name,
        price: p.purchase_price, 
        qty: 1,
        discount: 0,
        subtotal: p.purchase_price,
      });
      return;
    }

    if (name === "qty") {
      setProduct((old) => ({
        ...old,
        qty: Number(value),
        subtotal: old.price * Number(value),
      }));
      return;
    }

    if (name === "discount") {
      setProduct((old) => ({
        ...old,
        discount: Number(value),
        subtotal: old.price * old.qty,
      }));
      return;
    }

    if (name === "address") {
      setAddress(value);
    }
  };

  // Add product to cart
  const handleAddCart = () => {
    if (!product.id) return alert("Select a product first!");

    const discountAmount = (product.subtotal * (product.discount / 100));
    addItem({
      ...product,
      discount: discountAmount,
    });

    // Reset product selection after adding
    setProduct({
      id: "",
      name: "",
      price: 0,
      qty: 1,
      discount: 0,
      subtotal: 0,
    });
  };

  // Submit purchase
  const handlePurchaseSubmit = async () => {
    if (!supplier.id) return alert("Select a supplier!");
    if (cartItems.length === 0) return alert("Add at least one product to cart!");

    const items = {
      supplier,
      address,
      cartItems,
      summary,
    };

    try {
      const res = await axios.post(`${baseUrl}/purchase/react_purchase_save`, items);
      console.log(res.data);
      clear(); // Clear cart after submission
      alert("Purchase invoice submitted successfully!");
    } catch (err) {
      console.log(err);
      alert("Error submitting purchase invoice!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
        <div className="card-body">
          <h4
            className="mb-3 p-2 text-white"
            style={{
              background: "#667eea",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            Purchase Invoice
          </h4>

          {/* Supplier Selection */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Supplier</label>
              <select
                className="form-select"
                name="supplier"
                onChange={handleChange}
              >
                <option value="">Select supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={JSON.stringify(s)}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address || supplier.address || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr />

          {/* Product Table */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="text-white" style={{ background: "#667eea" }}>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Discount %</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>

                {/* Product Selection Row */}
                <tr>
                  <td>#</td>
                  <td>
                    <select
                      name="product"
                      className="form-select"
                      onChange={handleChange}
                     
                    >
                      <option disabled>Select Product</option>
                      {products.map((p) => (
                        <option key={p.id} value={JSON.stringify(p)}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      name="qty"
                      className="form-control"
                      value={product.qty}
                      min={1}
                      onChange={handleChange}
                    />
                  </td>

                  <td>{product.price}</td>

                  <td>
                    <input
                      type="number"
                      name="discount"
                      className="form-control"
                      value={product.discount}
                      min={0}
                      onChange={handleChange}
                    />
                  </td>

                  <td>{product.subtotal}</td>

                  <td>
                    <button
                      className="btn text-white"
                      style={{ background: "#667eea" }}
                      onClick={handleAddCart}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.qty * item.price - item.discount}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => delItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="text-end">
            <h5>Subtotal: {summary.subtotal}</h5>
            <h4>Total: {summary.total}</h4>
          </div>

          <div className="text-end mt-3">
            <button
              className="btn text-white px-4 py-2"
              style={{ background: "#667eea" }}
              onClick={handlePurchaseSubmit}
            >
              Submit Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchase;
