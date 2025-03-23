import React from 'react'
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ForgetPassword from './Pages/ForgetPassword'
import ResetPassword from './Pages/ResetPassword'
import AdminDashboard from './Pages/AdminDashboard'
import CreateProduct from './Pages/CreateProduct'
import Product from './Pages/Product'
import Cart from './Pages/Cart'

import { useSelector } from 'react-redux'
import { selectUser } from './Redux/Slices/UserSlice'
import Checkout from './Pages/Checkout'
import { layoutRoutesTerm } from './Lib/layoutRoutesTerm'
import PaymentConfirm from './Pages/PaymentConfirm'
import UpdateProduct from './Pages/UpdateProduct'

const Layout = () => {
  const { user } = useSelector(selectUser);
  const pathname = useLocation().pathname;
  const path = pathname.slice(1);
  console.log('path >>>', path, path.includes('/'));
  return (
    <>
      { (user && layoutRoutesTerm(path)) && <Header /> }
      <Outlet />
      { (user && layoutRoutesTerm(path)) && <Footer /> }
    </>
  )
};


const App = () => {
  const { user } = useSelector(selectUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={ user ? <Home /> : <Navigate to="/signin" /> } />
          <Route path='/signup' element={ user ? <Navigate to="/" /> : <Register /> } />
          <Route path='/signin' element={ user ? <Navigate to="/" /> : <Login /> } />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/resetpassword/:resetToken' element={<ResetPassword />} />
          <Route path='/admin' element={user?.data.role === 'Admin' ? <AdminDashboard /> : <Navigate to='/' />} />
          <Route path='/editproduct/:id' element={<UpdateProduct />} />
          <Route path='/newproduct' element={<CreateProduct />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<PaymentConfirm />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App