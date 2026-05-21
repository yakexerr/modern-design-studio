import React from 'react';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // Загружаем заказы текущего юзера
  const key = user ? `orders_${user.name}` : '';
  const allOrders = JSON.parse(localStorage.getItem(key)) || [];
  
  // Фильтруем те, что уже в разработке (оплачены)
  const activeProjects = allOrders.filter(o => o.status === 'В разработке');

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '24px', textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>👤</div>
        <h1>{user.name}</h1>
        <p style={{ color: '#666' }}>Клиент студии Modern Design</p>
      </div>

      <h2>Мои активные проекты</h2>
      {activeProjects.length === 0 ? (
        <p>У вас пока нет оплаченных проектов.</p>
      ) : (
        <div className="grid">
          {activeProjects.map(project => (
            <div key={project.id} className="card" style={{ padding: '20px' }}>
              <h3>{project.title}</h3>
              <p>Статус: <span style={{ color: '#27ae60', fontWeight: 'bold' }}>В разработке</span></p>
              <div style={{ fontSize: '12px', color: '#888' }}>Дата запуска: {new Date().toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;