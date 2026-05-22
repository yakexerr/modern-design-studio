import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import ContactPage from './pages/ContactPage';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState(null); // Пункт 12 (Запросы) курс доллара
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
  }, []); // [] значит что при загрузке страницы выполнится и всё

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
      <div className="app-wrapper"> {/* Обертка для всего */}
        <Navbar user={user} logout={logout} currency={currency} />

        {toast && ( // && проверяет есть ли что то в teast, если нет то блок не выполнится
          <div className="toast-container">
            <div className="toast">{toast}</div>
          </div>
        )}

        <main className="main-content"> {/* Обертка для контента страниц */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage notify={notify} />} />
            <Route path="/orders" element={<OrdersPage notify={notify} />} />
            <Route path="/favorites" element={<FavoritesPage notify={notify} />} />
            <Route path="/contact" element={<ContactPage notify={notify} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage onLogin={login} notify={notify} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;