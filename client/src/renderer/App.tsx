import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from 'components/header';
import Main from 'pages/main';
import Login from 'pages/login';
import Register from 'pages/register';

export default function App() {
  const [logged, setLogged] = useState(false);

  return (
    <Router>
      <Header logged={logged} setLogged={setLogged} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login setLogged={setLogged} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
