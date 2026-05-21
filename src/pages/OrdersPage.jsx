import React, { useState, useEffect } from 'react';

const OrdersPage = ({ notify }) => {
  const [orders, setOrders] = useState([]);
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const key = `orders_${parsedUser.name}`;
      const savedOrders = JSON.parse(localStorage.getItem(key)) || [];
      setOrders(savedOrders);
    }
  }, []);

  const handlePay = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const key = `orders_${user.name}`;
    const updated = orders.map(o => {
      if (o.id === id) return { ...o, status: 'В разработке' };
      return o;
    });
    setOrders(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setPayingId(null);
    notify("Оплачено! Проект передан в работу.");
  };

  const cancelOrder = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const key = `orders_${user.name}`;
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    notify("Заказ удален");
  };

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <div className="container"><h1>Войдите для просмотра</h1></div>;

  return (
    <div className="container">
      <h1>История заказов</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.length === 0 ? <p>Список пуст</p> : orders.map(order => (
          <div key={order.id} className="card" style={{ padding: '25px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <img src={order.img} alt="" style={{ width: '80px', height: '80px', borderRadius: '15px', objectFit: 'cover' }} />
            
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: 0 }}>{order.title}</h3>
              <p style={{ margin: '5px 0' }}>
                Статус: <span style={{ color: order.status === 'В разработке' ? '#27ae60' : '#f39c12', fontWeight: 'bold' }}>
                  {order.status || 'Ожидает оплаты'}
                </span>
              </p>

              {/* ЛОГИКА КНОПОК */}
              {order.status === 'В разработке' ? (
                // Если оплачено - только текст
                <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>Проект закреплен за вами</p>
              ) : payingId === order.id ? (
                // Форма оплаты
                <div style={{ marginTop: '10px' }}>
                  <input className="search-input" style={{ width: '200px', marginRight: '10px', marginBottom: 0 }} placeholder="Номер карты" />
                  <button className="order-btn" style={{ width: 'auto' }} onClick={() => handlePay(order.id)}>Оплатить {order.price} ₽</button>
                </div>
              ) : (
                // Если не оплачено - показываем обе кнопки
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="order-btn" style={{ width: 'auto' }} onClick={() => setPayingId(order.id)}>Оплатить</button>
                  <button className="order-btn" style={{ width: 'auto', background: '#ff4d4d' }} onClick={() => cancelOrder(order.id)}>Удалить</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;