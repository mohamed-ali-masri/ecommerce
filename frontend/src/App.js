import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
  return (
    <Router>

      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/admin/orderlist' Component={OrderListScreen} />
            <Route path='/admin/product/:id/edit' Component={ProductEditScreen} />
            <Route path='/admin/productlist' Component={ProductListScreen} exact />
            <Route path='/admin/productlist/:pageNumber' Component={ProductListScreen} exact />
            <Route path='/admin/user/:id/edit' Component={UserEditScreen} />
            <Route path='/admin/userlist' Component={UserListScreen} />
            <Route path='/Order/:id' Component={OrderScreen} />
            <Route path='/PlaceOrder' Component={PlaceOrderScreen} />
            <Route path='/shipping' Component={ShippingScreen} />
            <Route path='/profile' Component={ProfileScreen} />
            <Route path='/register' Component={RegisterScreen} />
            <Route path='/login' Component={LoginScreen} />
            <Route path='/product/:id' Component={ProductScreen} />
            <Route path='/cart/:id?' Component={CartScreen} />
            <Route path='/' Component={HomeScreen} exact />
            <Route path='/search/:Keyword' Component={HomeScreen} />
            <Route path='/page/:pageNumber' Component={HomeScreen} />
            <Route path='search/:keyword/page/:pageNumber' Component={HomeScreen} />
          </Routes>
        </Container>

      </main>
      <Footer />
    </Router>

  );
}

export default App;
