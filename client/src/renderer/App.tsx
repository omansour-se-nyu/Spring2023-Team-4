import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from 'components/header';
import Main from 'pages/main';
import Login from 'pages/login';
import Register from 'pages/register';
import ProductPost from 'pages/product/post';
import ProductDetail from 'pages/product/detail';
import UserDetail from 'pages/user/detail';
import { CartProduct, User } from 'types';
import ProductList from 'pages/product/list';
import ProductEdit from 'pages/product/edit';
import Cart from 'pages/product/cart';
import TransactionHistory from 'pages/transaction-history';

export default function App() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  return (
    <Router>
      <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={<Login setLoggedUser={setLoggedUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/product/post"
          element={<ProductPost loggedUser={loggedUser} />}
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              loggedUser={loggedUser}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route path="/user" element={<UserDetail loggedUser={loggedUser} />} />
        <Route
          path="/product/list"
          element={<ProductList loggedUser={loggedUser} />}
        />
        <Route
          path="/product/edit/:id"
          element={<ProductEdit loggedUser={loggedUser} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              loggedUser={loggedUser}
            />
          }
        />
        <Route path="/transaction-history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
}
