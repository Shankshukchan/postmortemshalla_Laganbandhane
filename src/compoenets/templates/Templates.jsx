 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Using jsonplaceholder as a free mock API for demonstration
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        // Map the mock data to fit the template structure
        // We'll use userId as category, title as title, body as description
        // Add a placeholder image for demonstration
        const placeholderImages = [
          '/images/banner.png',
          '/images/leaf.png',
          '/images/service.png',
          '/images/temp.png',
          '/images/banner(1)(1).png',
        ];
        const mapped = res.data.map((item, idx) => ({
          id: item.id,
          title: item.title,
          description: item.body,
          category: `Category ${item.userId}`,
          image: placeholderImages[idx % placeholderImages.length],
        }));
        setTemplates(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch templates');
        setLoading(false);
      });
  }, []);

  // Group templates by category
  const groupedByCategory = templates.reduce((acc, template) => {
    const cat = template.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(template);
    return acc;
  }, {});

  const handleTemplateClick = (template) => {
    navigate(`/editor/${template.id}`, { state: { template } });
  };

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="templates-section" style={{ padding: '40px 0', maxWidth: '1300px', margin: '0 auto', background: 'linear-gradient(120deg, #fdf6ec 0%, #f7e9d7 100%)', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '36px', textAlign: 'center', color: '#6E1E1E', letterSpacing: '1px', textShadow: '0 2px 12px #f7e9d7' }}>Templates</h2>
      {Object.keys(groupedByCategory).map(category => (
        <div key={category} className="template-category" style={{ marginBottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(90deg, #D4AF37 0%, #FDF6EC 100%)',
            borderRadius: '16px 16px 0 0',
            padding: '18px 32px',
            marginBottom: '0',
            boxShadow: '0 2px 12px #e2c97a33',
            display: 'inline-block',
            minWidth: '260px',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#6E1E1E', margin: 0 }}>{category}</h3>
          </div>
          <div className="template-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', background: 'rgba(255,255,255,0.7)', borderRadius: '0 0 16px 16px', padding: '32px 24px 24px 24px', boxShadow: '0 4px 24px #e2c97a22', justifyContent: 'center' }}>
            {groupedByCategory[category].map(template => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => handleTemplateClick(template)}
                style={{
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 24px #d4af3733',
                  margin: '0',
                  padding: '28px 22px 22px 22px',
                  borderRadius: '18px',
                  background: 'linear-gradient(120deg, #fffbe6 0%, #f7e9d7 100%)',
                  width: '320px',
                  minHeight: '220px',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.035)';
                  e.currentTarget.style.boxShadow = '0 10px 32px #d4af3766';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 24px #d4af3733';
                }}
              >
                <img 
                  src={template.image || '/images/temp.png'} 
                  alt={template.title}
                  style={{
                    width: '100%',
                    height: '140px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '14px',
                    boxShadow: '0 2px 8px #d4af3722',
                  }}
                />
                <h4 style={{ fontSize: '1.18rem', fontWeight: 'bold', marginBottom: '12px', color: '#6E1E1E', letterSpacing: '0.5px' }}>{template.title}</h4>
                <p style={{ color: '#7c5c1e', marginBottom: '18px', flex: 1, fontSize: '1rem', lineHeight: '1.5' }}>{template.description}</p>
                <button style={{
                  background: 'linear-gradient(90deg, #6E1E1E 0%, #D4AF37 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  alignSelf: 'flex-end',
                  marginTop: 'auto',
                  boxShadow: '0 2px 8px #d4af3733',
                  transition: 'background 0.18s',
                }}>Open in Editor</button>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: 'radial-gradient(circle at 80% 20%, #d4af37 0%, #fffbe6 80%)',
                  opacity: 0.13,
                  zIndex: 0,
                  borderRadius: '0 18px 0 40px',
                }}></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Templates;
