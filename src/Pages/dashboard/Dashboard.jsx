import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [report, setReport] = useState({
    orders: { count: 0, total: 0 },
    purchases: { count: 0, total: 0 },
    customers: { count: 0 },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("token"));
    } catch (e) {
      return null;
    }
  }, []);

  const formatNumber = (n) => {
    const num = Number(n || 0);
    return num.toLocaleString("en-US"); // 12,345
  };

  const fetchReport = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${baseUrl}/dashboard/report`, {
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // expected: res.data.data.orders.total etc
      const data = res?.data?.data;

      setReport({
        orders: {
          count: data?.orders?.count ?? 0,
          total: data?.orders?.total ?? 0,
        },
        purchases: {
          count: data?.purchases?.count ?? 0,
          total: data?.purchases?.total ?? 0,
        },
        customers: {
          count: data?.customers?.count ?? 0,
        },
      });
    } catch (err) {
      // console.log(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Top Alerts */}
      {loading && (
        <div className="alert alert-info">
          Loading dashboard report...
        </div>
      )}

      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>❌ {error}</span>
          <button className="btn btn-sm btn-light" onClick={fetchReport}>
            Retry
          </button>
        </div>
      )}

      <div className="row">
        <div className="col">
          <div className="h-100">
            <div className="row mb-3 pb-1">
              <div className="col-12">
                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                  <div className="flex-grow-1">
                    <h4 className="fs-16 mb-1">Dashboard</h4>
                    <p className="text-muted mb-0">
                      Here's what's happening with your store today.
                    </p>
                  </div>
                  <div className="mt-3 mt-lg-0">
                    <div className="row g-3 mb-0 align-items-center">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-soft-primary shadow-none"
                          onClick={fetchReport}
                          disabled={loading}
                        >
                          <i className="ri-refresh-line align-middle me-1" />
                          Refresh
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* REPORT CARDS */}
            <div className="row">
              {/* Total Purchase */}
              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Total Purchase
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="text-muted fs-12 mb-0">
                          Count: {report?.purchases?.count ?? 0}
                        </h6>
                      </div>
                    </div>

                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-2">
                          ৳ {formatNumber(report?.purchases?.total)}
                        </h4>
                        <span className="text-muted">Net total from purchases</span>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-success rounded fs-3">
                          <i className="bx bx-dollar-circle" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders */}
              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Orders
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="text-muted fs-12 mb-0">
                          Count: {report?.orders?.count ?? 0}
                        </h6>
                      </div>
                    </div>

                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-2">
                          ৳ {formatNumber(report?.orders?.total)}
                        </h4>
                        <span className="text-muted">Total sales (order_total)</span>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info rounded fs-3">
                          <i className="bx bx-shopping-bag" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customers */}
              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Customers
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="text-muted fs-12 mb-0">
                          Total
                        </h6>
                      </div>
                    </div>

                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-2">
                          {formatNumber(report?.customers?.count)}
                        </h4>
                        <span className="text-muted">From core_customers</span>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-warning rounded fs-3">
                          <i className="bx bx-user-circle" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance (static) */}
              <div className="col-xl-3 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          My Balance
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h5 className="text-muted fs-14 mb-0">+0.00%</h5>
                      </div>
                    </div>

                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-2">
                          ৳ 0
                        </h4>
                        <a href="#" className="text-decoration-underline">
                          Withdraw money
                        </a>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-danger rounded fs-3">
                          <i className="bx bx-wallet" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ তুমি নিচের rest UI (charts/tables) আগের মতোই রাখতে পারো */}
            {/* If you want, আমি ApexChart data bind করেও দিতে পারি */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
