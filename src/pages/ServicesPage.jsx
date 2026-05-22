import React, { useState } from 'react';
import { SERVICES } from '../data';

const ServicesPage = ({notify}) => {
  const [search, setSearch] = useState('');

  const filteredServices = SERVICES.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleOrder = (service) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      notify("Чтобы сделать заказ, нужно войти!");
      return;
    }

    const key = `orders_${user.name}`;
    const currentOrders = JSON.parse(localStorage.getItem(key)) || [];
    
    if (!currentOrders.find(o => o.id === service.id)) {
      const updated = [...currentOrders, service];
      localStorage.setItem(key, JSON.stringify(updated));
      notify("Заказ успешно оформлен! 📦");
    } else {
      notify("Эта услуга уже в ваших заказах");
    }
  };


  const addToFav = (service) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      notify("Сначала войдите!");
      return;
    }
    
    const key = `favs_${user.name}`; // ТОТ ЖЕ КЛЮЧ
    const currentFavs = JSON.parse(localStorage.getItem(key)) || [];
    
    if (!currentFavs.find(f => f.id === service.id)) {
      const updated = [...currentFavs, service];
      localStorage.setItem(key, JSON.stringify(updated));
      notify("Добавлено юзеру " + user.name);
    } else {
      notify("Уже в списке");
    }
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>Наши услуги</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Выберите направление для вашего бизнеса</p>
      
      <input 
        type="text" 
        placeholder="Поиск услуги..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="grid">
        {filteredServices.map(service => (
          <div key={service.id} className="card">
            <img src={service.img} alt={service.title} className="card-img" />
            <div className="card-content">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="price-tag">{service.price} ₽</span>
              <button className="order-btn" style={{background: '#eee', color: '#000', marginTop: '10px'}} onClick={() => addToFav(service)}>
                ❤️ В избранное
              </button>
              <hr />
              <button className="order-btn" onClick={() => handleOrder(service)}>
                Заказать проект
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;