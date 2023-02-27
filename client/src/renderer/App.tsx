import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from 'components/header';
import Main from 'pages/main';
import Login from 'pages/login';
import Register from 'pages/register';

export default function App() {
  const [loggedUser, setLoggedUser] = useState<string | null>(null);

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
      </Routes>
    </Router>
  );
}
