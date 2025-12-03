import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./invoice.css";

const OrderInvoice = () => {
    const invoiceRef = useRef();
    const { id } = useParams();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [order, setOrder] = useState({});
    const [customer, setCustomer] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);

    const handlePrint = () => window.print();

    useEffect(() => {
        axios.get(`${baseUrl}/order/orderInvoice/${id}`)
            .then(res => {
                const orderData = res.data.order || {};
                const customerData = res.data.customer || {};
                const details = (res.data.order_details || []).map(item => ({
                    ...item,
                    price: parseFloat(item.unit_price) || 0,
                    discount: parseFloat(item.discount) || 0,
                    qty: parseInt(item.qty) || 0,
                    total: (parseFloat(item.unit_price) || 0) * (parseInt(item.qty) || 0) - (parseFloat(item.discount) || 0)
                }));

                setOrder(orderData);
                setCustomer(customerData);
                setOrderDetails(details);
            })
            .catch(err => console.log(err));
    }, [id]);

    // Summary calculations
    const subtotal = orderDetails.reduce((acc, od) => acc + od.unit_price * od.qty, 0);
    const discountTotal = orderDetails.reduce((acc, od) => acc + od.discount, 0);
    const total = subtotal - discountTotal;

    return (
        <div className="card invoice" ref={invoiceRef}>
            <div className="card-body">
                {/* Invoice Header */}
                <div className="bg-light p-4 rounded mb-3">
                    <h4>Invoice</h4>
                    <div className="row gy-3">
                        <div className="col-lg-4">
                            <h6>Invoice Details</h6>
                            <p>Invoice #: INV{order.id || ""}</p>
                            <p>Issue Date: {order.order_date || ""}</p>
                            <p>Delivery Date: {order.delivery_date || ""}</p>
                        </div>
                        <div className="col-lg-4">
                            <h6>Billing From</h6>
                            <p>Rahed Invoice Management</p>
                            <p>Phone: +8801571-231031</p>
                            <p>Email: rashed@example.com</p>
                        </div>
                        <div className="col-lg-4">
                            <h6>Billing To</h6>
                            <p>Name: {customer.name || ""}</p>
                            <p>Address: {order.shipping_address || ""}</p>
                            {/* <p>Phone: {customer.mobile || ""}</p> */}
                            <p>Email: {customer.email || ""}</p>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="mb-3">
                    <h6>Products Details</h6>
                    <div className="table-responsive rounded border table-nowrap">
                        <table className="table m-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Product Details</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Discount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.name || ""}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price.toFixed(2)}</td>
                                        <td>{item.discount.toFixed(2)}</td>
                                        <td>{item.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bank & Summary */}
                <div className="border-bottom mb-3">
                    <div className="row">
                        <div className="col-lg-6">
                            <h6>Bank Details</h6>
                            <p>Bank Name: Brack Bank</p>
                            <p>Account: 782459739212</p>
                            <p>IFSC: ABC0008856</p>
                        </div>
                        <div className="col-lg-6">
                            <div className="mb-3 p-4">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>${subtotal.toFixed(2)}</h6>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Discount</h6>
                                    <h6>${discountTotal.toFixed(2)}</h6>
                                </div>
                                <div className="d-flex justify-content-between mb-3 ">
                                    <h6 className='text-primary'>Total</h6>
                                    <h6 className='text-primary'>${total.toFixed(2)}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-secondary" onClick={handlePrint}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default OrderInvoice;
