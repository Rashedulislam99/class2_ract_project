import axios from 'axios';
import useCart from "../../components/useCart";

import React, { useEffect, useState } from 'react'
import "../Orders/invoice.css";
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {

  const { clear, delItem, addItem, getCart, cart } = useCart("HRNOrder");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const navigate= useNavigate();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: 0,
    discount: 0,
    qty: 1,
    subtotal: 0
  })

  const [summary, setSummary] = useState({
    subtotal: 0,
    discount: 0,
    total: 0
  });

  // Fetch data
  const fethCustomerAndProduct = () => {
    axios({
      url: `${baseUrl}/customer`,
      method: "GET"
    })
      .then(res => {
        console.log(res.data)
        setCustomers(res.data.customers)
        setProducts(res.data.products)
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fethCustomerAndProduct();
  }, []);

  useEffect(() => {
    setCartItems(cart);
    calculateSummary();
  }, [cart]);

  // SUMMARY CALCULATION
  const calculateSummary = () => {
    let subtotal = 0;
    let discount = 0;

    cart.forEach((item) => {
      subtotal += item.qty * item.price;
      discount += item.discount;
    });

    setSummary({
      subtotal,
      discount,
      total: subtotal - discount
    });
  };

  // INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    // SELECT CUSTOMER
    if (name === "customer") {
      setCustomer(JSON.parse(value));
      return;
    }

    // SELECT PRODUCT
    if (name === "product") {
      let p = JSON.parse(value);
      setProduct((old) => ({
        ...old,
        id: p.id,
        name: p.name,
        price: p.price,
        subtotal: p.price,
      }));
      return;
    }

    // QTY CHANGE
    if (name === "qty") {
      setProduct((old) => ({
        ...old,
        qty: value,
        subtotal: old.price * value
      }));
      return;
    }

    // DISCOUNT CHANGE (%)
    if (name === "discount") {
      setProduct((old) => ({
        ...old,
        discount: value,
        subtotal: old.qty * old.price
      }));
      return;
    }

    // ADDRESS
    if (name === "address") {
      setCustomer((c) => ({ ...c, address: value }));
    }
  };

  // ADD TO CART
  const handleAddCart = () => {
    const discountAmount = (product.subtotal * (product.discount / 100));

    addItem({
      ...product,
      discount: discountAmount,
    });
  };

  // SUBMIT ORDER
  const handleOrderSubmit = () => {

    let items = {
      customer,
      cartItems,
      summary
    };
     if(cartItems.length > 0){
          axios({
      url: `${baseUrl}/order/react_order_save`,
      method: "POST",
      data: items
    })
      .then(res => {
        console.log(res.data);
        clear(); // clear cart
         if(res){
        navigate("/OrderList");
      }
      })
      .catch(err => console.log(err));
     }else{
      alert("plese add some items")
     }
   
  };


  return (
    <div className="container">
      <div className="invoice mx-auto" style={{ maxWidth: 900 }}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3 className="mb-0">Store Management System</h3>
            <small className="text-muted">25/10, Zigatola, Dhaka</small><br />
            <small className="text-muted">Phone: +88 01922 745 118</small>
          </div>

          <div className="text-end">
            <h4 className="mb-0">INVOICE</h4>
            <small className="text-muted">Issue Date:
              <input
                type="text"
                className="form-control form-control-sm"
                defaultValue={new Date().toLocaleDateString()}
              />
            </small>
          </div>
        </div>

        {/* Customer */}
        <div className="row mb-4">
          <div className="col-sm-6">
            <h6 className="mb-1">Bill To</h6>

            <select name="customer" className="form-control form-control-sm" onChange={handleChange}>
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>
              ))}
            </select>

            <textarea
              name="address"
              className="form-control form-control-sm mt-2"
              rows={2}
              value={customer.address || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Product Table */}
        <div className="table-responsive mb-3">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Discount %</th>
                <th>Total</th>
                <th className="no-print">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <select name="product" className="form-control form-control-sm" onChange={handleChange}>
                    <option value="">Select Product</option>
                    {products.map((p) => (
                      <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <input type="number" min={1} name="qty" className="form-control form-control-sm" value={product.qty} onChange={handleChange} />
                </td>

                <td>{product.price}</td>

                <td>
                  <input type="number" min={0} max={100} name="discount" className="form-control form-control-sm" value={product.discount} onChange={handleChange} />
                </td>

                <td>{product.subtotal}</td>

                <td className="no-print">
                  <button className="btn btn-sm btn-outline-success" onClick={handleAddCart}>
                    Add
                  </button>
                </td>
              </tr>

              {/* CART ITEMS */}
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                  <td>{item.discount}</td>
                  <td>{item.qty * item.price - item.discount}</td>
                  <td>
                    <button className='btn btn-sm btn-danger' onClick={() => delItem(item.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Summary */}
        <div className="text-end mb-4">
          <p>Subtotal: <strong>{summary.subtotal}</strong></p>
          <p>Discount: <strong>{summary.discount}</strong></p>
          <p>Total: <strong className="fs-5">{summary.total}</strong></p>
        </div>

        {/* Save */}
        <div className="text-end">
          <button className="btn btn-primary" onClick={handleOrderSubmit}>Save</button>
        </div>


        <button className="btn btn-primary mx-2" onClick={() => window.print()}>
          Print
        </button>


      </div>
    </div>
  );
};

export default CreateOrder;
