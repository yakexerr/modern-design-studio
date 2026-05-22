import React from 'react';
import { PROJECTS } from '../data'; // Импортируем проекты из нашего файла данных
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '60px 0' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Мы создаем бренды будущего
        </h1>
        <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Помогаем компаниям выделяться через современный дизайн и 
          инновационные технологические решения.
        </p>
        <Link to="/contact">
          <button style={{ marginTop: '30px', padding: '15px 30px', fontSize: '16px', cursor: 'pointer' }} className="order-btn">
            Обсудить проект
          </button>
        </Link>
      </section>

      <section>
        <h2 style={{ marginBottom: '30px' }}>Наши последние проекты</h2>
        <div className="grid">
          {PROJECTS.map((project) => (
            <div key={project.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <img 
                src={project.img} 
                alt={project.title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '20px' }}>
                <span style={{ color: '#e50914', fontSize: '12px', fontWeight: 'bold' }}>
                  {project.category}
                </span>
                <h3 style={{ margin: '10px 0' }}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;