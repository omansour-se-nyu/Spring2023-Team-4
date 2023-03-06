import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from 'components/header';
import Main from 'pages/main';
import Login from 'pages/login';
import Register from 'pages/register';
import ProductPost from 'pages/product/post';
import ProductDetail from 'pages/product/detail';
import { User } from 'types';

export default function App() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

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
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
