import axios from 'axios';
import { useEffect, useState } from 'react';
import flatpickr from "flatpickr";

import { Link } from 'react-router-dom';

const OrderList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const [orders, setOrders] = useState([]);
const getOrders = () => {
    axios({
      url: `${baseUrl}/order/`,
      method: "GET",
      data: {}
    })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.orders || []);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  useEffect(
    () => {
      getOrders()
    }
    , []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/order`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.post(`${baseUrl}/order/delete`, { id });
      if (res.data.success === "yes") fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Error deleting order!");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e3a8a', marginBottom: '20px' }}>
        Orders List
      </h2>

      <Link to="/order/create" className="btn btn-outline-success mb-3">
        New Order
      </Link>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered">
          <thead style={{ background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white' }}>
            <tr>
              <th style={{ fontWeight: '700' }}>ID</th>
              <th style={{ fontWeight: '700' }}>Customer</th>
              <th style={{ fontWeight: '700' }}>Order Date</th>
              <th style={{ fontWeight: '700' }}>Delivery Date</th>
              <th style={{ fontWeight: '700' }}>Shipping Address</th>
              <th style={{ fontWeight: '700' }}>Order Total</th>
              <th style={{ fontWeight: '700' }}>Paid Amount</th>
              <th style={{ fontWeight: '700' }}>Remark</th>
              <th style={{ fontWeight: '700' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.length > 0 ? (
              orders.map((order, i) => (
                <tr key={order.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                  <td className="fw-bold text-primary">{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.order_date}</td>
                  <td>{order.delivery_date}</td>
                  <td>{order.shipping_address}</td>
                  <td className="text-success fw-semibold">{order.order_total}</td>
                  <td className="text-danger fw-semibold">{order.paid_amount}</td>
                  <td>{order.remark}</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/order/edit/${order.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No orders found
                </td>
              </tr>
            )} */}


              {orders && orders.map((o,i)=>(
                 <tr key={o.id} style={{ background: i % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                  <td className="fw-bold text-primary">{o.id}</td>
                  <td>{o.customer_name}</td>
                  <td>{o.order_date}</td>
                  <td>{o.delivery_date}</td>
                  <td>{o.shipping_address}</td>
                  <td className="text-success fw-semibold">{o.order_total}</td>
                  <td className="text-danger fw-semibold">{o.paid_amount}</td>
                  <td>{o.remark}</td>
                  <td>
                    {/* <Link
                      className="btn btn-sm btn-info me-2"
                      to={`/order/edit/${o.id}`}
                    >
                      Edit
                    </Link> */}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteOrder(o.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/order/invoice/${o.id}`} className='btn btn-info'>View</Link>
                  </td>
                </tr>
              ))}



          </tbody>
        </table>
      </div>

      {/* <div className="mt-2 text-end">
        <small className="text-muted">Showing {o.length} orders</small>
      </div> */}
    </div>
  );
};

export default OrderList;
