import { Link } from 'react-router-dom';

const Navbar = ({ user, logout, currency }) => (
  <nav className="navbar">
    <Link to="/" className="logo">СОВРЕМЕННАЯ СТУДИЯ</Link>
    <div className="nav-links">
      <Link to="/services">Услуги</Link>
      <Link to="/orders">Заказы</Link>
      <Link to="/favorites">Избранное</Link>
      <Link to="/contact">Обсудить проект</Link>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link to="/profile" className="user-name">{user.name}</Link>
          <button onClick={logout} className="order-btn" style={{ padding: '8px 15px', width: 'auto', fontSize: '12px', background: '#eee', color: '#000' }}>Выйти</button>
        </div>
      ) : (
        <Link to="/login">Вход</Link>
      )}
      <span className="currency">USD: {currency} ₽</span>
    </div>
  </nav>
);

export default Navbar;