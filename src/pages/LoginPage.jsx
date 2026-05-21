import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin, notify }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    // Получаем список всех пользователей из базы (или пустой массив)
    const allUsers = JSON.parse(localStorage.getItem('users_db')) || [];

    if (isRegister) {
      // ЛОГИКА РЕГИСТРАЦИИ
      const userExists = allUsers.find(u => u.name === name);
      if (userExists) {
        notify("Пользователь с таким именем уже есть!");
        return;
      }
      
      const newUser = { name, password };
      allUsers.push(newUser);
      localStorage.setItem('users_db', JSON.stringify(allUsers));
      notify("Регистрация успешна! Теперь войдите.");
      setIsRegister(false); // Переключаем на экран входа
    } else {
      // ЛОГИКА ВХОДА
      const user = allUsers.find(u => u.name === name && u.password === password);
      
      if (user) {
        onLogin(name);
        navigate('/');
      } else {
        notify("Неверное имя или пароль! (Или вы еще не зарегистрированы)");
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>
        {isRegister ? 'Регистрация' : 'Вход'}
      </h2>
      
      <form onSubmit={handleAuth}>
        <input 
          className="search-input"
          style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: '15px' }}
          type="text" 
          placeholder="Имя пользователя" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          className="search-input"
          style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: '20px' }}
          type="password" 
          placeholder="Пароль" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button className="order-btn" style={{ width: '100%', padding: '15px' }}>
          {isRegister ? 'Создать аккаунт' : 'Войти'}
        </button>
      </form>
      
      <button 
        onClick={() => setIsRegister(!isRegister)}
        style={{ background: 'none', border: 'none', color: '#666', marginTop: '20px', cursor: 'pointer', width: '100%' }}
      >
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </button>
    </div>
  );
};

export default LoginPage;