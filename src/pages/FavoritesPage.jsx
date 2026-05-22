import React, { useState, useEffect } from 'react';

const FavoritesPage = ({ notify }) => {
  const [favs, setFavs] = useState([]);
  
  // Получаем пользователя ОДИН РАЗ при загрузке или из localStorage напрямую в эффекте
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) { // если залогинен
      const parsedUser = JSON.parse(userData);
      const key = `favs_${parsedUser.name}`;
      const savedFavs = JSON.parse(localStorage.getItem(key)) || [];
      setFavs(savedFavs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Оставляем пустым, чтобы не зацикливалось

  const removeFromFav = (id) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const key = `favs_${userData.name}`;
    const updated = favs.filter(item => item.id !== id);
    setFavs(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    notify("Удалено из избранного");
  };

  const user = localStorage.getItem('user');

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h1>Избранное</h1>
        <p>Войдите в аккаунт, чтобы просматривать свои сохраненные услуги.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Ваше избранное</h1>
      {favs.length === 0 ? (
        <p>В списке пока пусто.</p>
      ) : (
        <div className="grid">
          {favs.map(item => (
            <div key={item.id} className="card">
              {/* Добавили проверку картинки */}
              <img 
                src={item.img} 
                alt={item.title} 
                className="card-img" 
              />
              <div className="card-content">
                <h3>{item.title}</h3>
                <button 
                  className="order-btn" 
                  style={{ background: '#ff4d4d' }} 
                  onClick={() => removeFromFav(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;