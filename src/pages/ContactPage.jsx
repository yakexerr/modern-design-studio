import React, { useState } from 'react';

const ContactPage = ({ notify }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Сайт',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Имитируем отправку: сохраняем в историю заявок (чтобы потом показать в Профиле)
    const history = JSON.parse(localStorage.getItem('requests')) || [];
    history.push({ ...formData, date: new Date().toLocaleDateString() });
    localStorage.setItem('requests', JSON.stringify(history));

    setSubmitted(true);
    notify("Заявка успешно отправлена! 🚀");
  };

  if (submitted) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '48px' }}>Спасибо!</h1>
        <p style={{ fontSize: '20px', color: '#666' }}>Мы уже получили вашу заявку и свяжемся с вами в течение часа.</p>
        <button className="order-btn" style={{ width: 'auto', marginTop: '20px' }} onClick={() => setSubmitted(false)}>
          Отправить еще одну
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h1>Обсудить проект</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Расскажите нам о вашей идее, и мы поможем воплотить её в жизнь.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label>Ваше имя</label>
          <input 
            className="search-input" style={{ maxWidth: '100%', marginBottom: 0, marginTop: '8px' }}
            type="text" required 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div>
          <label>Email для связи</label>
          <input 
            className="search-input" style={{ maxWidth: '100%', marginBottom: 0, marginTop: '8px' }}
            type="email" required 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label>Тип проекта</label>
          <select 
            className="search-input" style={{ maxWidth: '100%', marginBottom: 0, marginTop: '8px' }}
            onChange={(e) => setFormData({...formData, projectType: e.target.value})}
          >
            <option>Сайт под ключ</option>
            <option>Брендинг</option>
            <option>Мобильное приложение</option>
            <option>Дизайн интерфейса</option>
          </select>
        </div>

        <div>
          <label>О проекте</label>
          <textarea 
            className="search-input" 
            style={{ maxWidth: '100%', marginBottom: 0, marginTop: '8px', height: '150px', borderRadius: '15px', resize: 'none' }}
            placeholder="Опишите вашу задачу..."
            required
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" className="order-btn">Отправить заявку</button>
      </form>
    </div>
  );
};

export default ContactPage;