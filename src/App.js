import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState(null); // Пункт 12 (Запросы)
  const [toast, setToast] = useState(null); // Состояние для уведомления

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000); // Скрыть через 3 сек
  };

  useEffect(() => {
    // Проверка логина (Пункт 11)
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // Запрос курса валют (Пункт 12)
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => res.json())
      .then(data => setCurrency(data.Valute.USD.Value.toFixed(2)));
  }, []);

  const login = (name) => {
    const userData = { name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="logo">СОВРЕМЕННАЯ СТУДИЯ</Link>
        <div className="nav-links">
          <Link to="/services">Услуги</Link>
          <Link to="/orders">Мои заказы</Link> 
          <Link to="/favorites">Избранное</Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link to="/profile" className="user-name" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
                {user.name}
              </Link>
              <button 
                onClick={logout} 
                className="order-btn" 
                style={{ padding: '8px 15px', width: 'auto', fontSize: '12px', background: '#eee', color: '#000' }}
              >
                Выйти
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: '#000' }}>Вход</Link>
          )}
          <span className="currency" style={{ marginLeft: '15px', color: '#888' }}>
            USD: {currency} ₽
          </span>
        </div>
      </nav>

      {/* Вывод уведомления, если оно есть */}
      {toast && (
        <div className="toast-container">
          <div className="toast">{toast}</div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage notify={notify} />} />
        <Route path="/orders" element={<OrdersPage notify={notify} />} /> {/* ПРОВЕРЬ ЭТУ СТРОКУ */}
        <Route path="/favorites" element={<FavoritesPage notify={notify} />} />
        <Route path="/contact" element={<ContactPage notify={notify} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage onLogin={login} notify={notify} />} />
      </Routes>
    </Router>
  );
}

export default App;