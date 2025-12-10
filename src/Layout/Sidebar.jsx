import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  
  // state for open/close menus
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-menu navbar-menu">
      {/* LOGO */}
      <div className="navbar-brand-box">
        <Link to="/" className="logo logo-dark">
          <span className="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height={22} />
          </span>
          <span className="logo-lg">
            <img src="assets/images/logo-dark.png" alt="" height={17} />
          </span>
        </Link>
        <Link to="/" className="logo logo-light">
          <span className="logo-sm">
            <img src="assets/images/logo-sm.png" alt="" height={22} />
          </span>
          <span className="logo-lg">
            <img src="assets/images/logo-light.png" alt="" height={17} />
          </span>
        </Link>
      </div>

      <div id="scrollbar">
        <div className="container-fluid">
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">Menu</li>

            {/* Dashboards */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("dashboards")}
              >
                <i className="mdi mdi-speedometer" />
                <span>Dashboards</span>
              </div>
              {openMenus["dashboards"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className={`nav-link ${isActive("/") ? "active" : ""}`}
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Apps */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("apps")}
              >
                <i className="mdi mdi-view-grid-plus-outline" />
                <span>Apps</span>
              </div>
              {openMenus["apps"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <div
                      className="nav-link"
                      onClick={() => toggleMenu("calendar")}
                    >
                      Calendar
                    </div>
                    {openMenus["calendar"] && (
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link to="/apps-calendar" className="nav-link">
                            Main Calendar
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/apps-calendar-month" className="nav-link">
                            Month Grid
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="nav-item">
                    <Link to="/apps-chat" className="nav-link">
                      Chat
                    </Link>
                  </li>
                  {/* Add more apps submenus here... */}
                </ul>
              )}
            </li>

            {/* Sales */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("sales")}
              >
                <i className="mdi mdi-account-circle-outline" />
                <span>Sales</span>
              </div>
              {openMenus["sales"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/order/create"
                      className={`nav-link ${
                        isActive("/order/create") ? "active" : ""
                      }`}
                    >
                      Create Sale
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/orderList"
                      className={`nav-link ${
                        isActive("/orderList") ? "active" : ""
                      }`}
                    >
                      All Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="salesreport"
                      className={`nav-link ${
                        isActive("/sale/salesreport") ? "active" : ""
                      }`}
                    >
                     Date wise Sales Report
                    </Link>
                  </li>
                </ul>
              )}
            </li>

              {/* /purchase/create */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("purchase")}
              >
                <i className="mdi mdi-account-circle-outline" />
                <span>Purchase Report</span>
              </div>
              {openMenus["purchase"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/purchase/create"
                      className={`nav-link ${
                        isActive("/order/create") ? "active" : ""
                      }`}
                    >
                      Create Purchase
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/purchaseList"
                      className={`nav-link ${
                        isActive("/purchaseList") ? "active" : ""
                      }`}
                    >
                      All Purchases
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/purchasereport"
                      className={`nav-link ${
                        isActive("/sale/purchasereport") ? "active" : ""
                      }`}
                    >
                     Date wise Sales Report
                    </Link>
                  </li>
                </ul>
              )}
            </li>


            



            {/* Customers Report */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("customersReport")}
              >
                <i className="ri-rocket-line" />
                <span>Customers Report</span>
              </div>
              {openMenus["customersReport"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/customerlist"
                      className={`nav-link ${
                        isActive("/customerlist") ? "active" : ""
                      }`}
                    >
                      All Customers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/customer/create"
                      className={`nav-link ${
                        isActive("/customer/create") ? "active" : ""
                      }`}
                    >
                      Add Customers
                    </Link>
                  </li>
                </ul>
              )}
            </li>


            {/* Customers Report */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("stockReport")}
              >
            <i className="ri-pie-chart-line" />
                <span>Stock Report</span>
              </div>
              {openMenus["stockReport"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/stockslist"
                      className={`nav-link ${
                        isActive("/customerlist") ? "active" : ""
                      }`}
                    >
                      All Stocks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/lowStock"
                      className={`nav-link ${
                        isActive("/lowstock") ? "active" : ""
                      }`}
                    >
                      Low Stocks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/overstock"
                      className={`nav-link ${
                        isActive("/overstock") ? "active" : ""
                      }`}
                    >
                      Over Stocks
                    </Link>
                  </li>
                </ul>
              )}
            </li>




            

            {/* Product Report */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("productReport")}
              >
                <i className="ri-shopping-bag-line" />
                <span>Product Report</span>
              </div>
              {openMenus["productReport"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/productlist"
                      className={`nav-link ${
                        isActive("/productlist") ? "active" : ""
                      }`}
                    >
                      All Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/product/create"
                      className={`nav-link ${
                        isActive("/product/create") ? "active" : ""
                      }`}
                    >
                      Add Product
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Supplier Report */}
            <li className="nav-item">
              <div
                className="nav-link menu-link"
                onClick={() => toggleMenu("supplierReport")}
              >
                <i className="ri-user-line" />
                <span>Supplier Report</span>
              </div>
              {openMenus["supplierReport"] && (
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link
                      to="/supplierList"
                      className={`nav-link ${
                        isActive("/supplierList") ? "active" : ""
                      }`}
                    >
                      All Supplier
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/supplier/create"
                      className={`nav-link ${
                        isActive("/supplier/create") ? "active" : ""
                      }`}
                    >
                      Add Supplier
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* You can continue adding Role Management, Warehouse, etc in the same way */}
          </ul>
        </div>
      </div>
      <div className="sidebar-background" />
    </div>
  );
};

export default Sidebar;
