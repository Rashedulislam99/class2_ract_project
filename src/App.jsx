import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';

import CustomersList from './Pages/Customers/CustomersList';
import CreateCustomer from './Pages/Customers/CreateCustomer';
import EditCustomer from './Pages/Customers/EditCustomer';

import ProductsList from './Pages/Products/ProductsList';
import EditProduct from './Pages/Products/EditProduct';
import CreateProduct from './Pages/Products/CreateProduct';

import CreateRole from './Pages/Role/CreateRole';
import RoleList from './Pages/Role/RoleList';
import EditRole from './Pages/Role/EditRole';
import Dashboard from './Pages/dashboard/Dashboard';

import OrderList from './Pages/Orders/OrderList';
import CreateOrder from './Pages/Orders/CreateOrder';
import OrderInvoice from './Pages/Orders/Invoice';


import SupplierList from './Pages/Supplier/SupplierList';
import EditSupplier from './Pages/Supplier/EditSupplier';
import CreateSupplier from './Pages/Supplier/CreateSupplier';



import WarehouseList from './Pages/warehouse/warehouseList';
import CreateWarehouse from './Pages/warehouse/CreateWarehouse';


import EditUser from './Pages/Users/EditUser';
import CreateUser from './Pages/Users/CreateUser';
import UserList from './Pages/Users/UserList';


import CreatePurchase from './Pages/Purchase/CreatePurchase';


import Login from './Login/Login';
import PurchasesList from './Pages/Purchase/PurchasesList';




import StockList from './Pages/Stocks/StockList';
import LowStock from './Pages/Stocks/LowStock';
import OverStock from './Pages/Stocks/OverStock';
import Counter from './components/Counter';
















function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Customer routes */}
          <Route path="/customerlist" element={<CustomersList />} />
          <Route path="/customer/create" element={<CreateCustomer />} />
          <Route path="/customer/edit/:customerID" element={<EditCustomer />} />

          {/* Product routes */}
          <Route path="/productList" element={<ProductsList />} />
         <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:productID" element={<EditProduct />} />


          {/* Order routes */}
          <Route path="/orderList" element={< OrderList/>} />
          <Route path="/order/create" element={<CreateOrder />} />
          <Route path="/order/invoice/:id" element={<OrderInvoice/>} />

        

          {/* supplier routes */}
          <Route path="/supplierList" element={< SupplierList/>} />
          <Route path="/supplier/create" element={<CreateSupplier />} />
          <Route path="/supplier/edit/:supplierID" element={<EditSupplier />} />
        
        
        
          {/* Warehouse routes */}
          <Route path="/warehouseList" element={< WarehouseList/>} />
          <Route path="/warehouse/create" element={<CreateWarehouse/>} />
          {/* <Route path="/warehouse/edit/:warehouseID" element={<Editwarehouse />} /> */}
        



          {/* Role routes */}
          <Route path="/role" element={<RoleList />} />
          <Route path="/role/create" element={<CreateRole />} />
          <Route path="/role/edit/:roleId" element={<EditRole />} />
         
         
         
          {/* Users routes */}
          <Route path="/user" element={<UserList />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/edit/:userId" element={<EditUser />} />



           {/* Purchases routes */}
         <Route path="/purchase/create" element={<CreatePurchase />} />

         <Route path="/purchaseList" element={< PurchasesList/>} />
         {/* <Route path="/orderList" element={< OrderList/>} /> */}
      
         

            {/* Stock routes */}
          {/* <Route path="/stocksList" element={<StockList />} /> */}
         
          {/* Login routes */}




        {/* Stock routes */}
          <Route path="/stockslist" element={<StockList />} />
          <Route path="/lowstock" element={<LowStock />} />
          <Route path="/overstock" element={<OverStock />} />






          <Route path="/counter" element={<Counter />} />
          
         




        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
