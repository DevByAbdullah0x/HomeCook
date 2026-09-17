import React, { useState } from 'react';
import { UsersIcon, PlusIcon, CheckIcon } from './Icons';

function FoodItem({ item, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  // Reliable food fallback photography
  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
  const svgPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f1f5f9"/><circle cx="200" cy="130" r="50" fill="%23cbd5e1"/><text x="200" y="220" font-family="system-ui,sans-serif" font-size="16" font-weight="bold" fill="%2364748b" text-anchor="middle">${encodeURIComponent(item.name || 'Fresh Homemade Meal')}</text></svg>`;

  const [imgSrc, setImgSrc] = useState(item.imageUrl || item.image || fallbackImage);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const isAvailableToday = item.available && item.available.includes(today);

  const handleAdd = () => {
    onAddToCart(item);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const handleImageError = () => {
    if (imgSrc !== fallbackImage && imgSrc !== svgPlaceholder) {
      setImgSrc(fallbackImage);
    } else if (imgSrc === fallbackImage) {
      setImgSrc(svgPlaceholder);
    }
  };

  return (
    <div className="food-card">
      <div className="food-image-wrapper">
        <img
          src={imgSrc}
          alt={item.name}
          className="food-image"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="image-overlay-serves">
          <UsersIcon size={14} />
          <span>Serves {item.serves}</span>
        </div>
        <div className="image-overlay-price">
          Rs {item.price}
        </div>
      </div>

      <div className="food-details">
        <div className="food-title-row">
          <h3 className="food-name">{item.name}</h3>
        </div>

        {/* Available Days */}
        <div className="available-days-row">
          {item.available && item.available.map((day) => (
            <span
              key={day}
              className={`day-tag ${day === today ? 'today-active' : ''}`}
            >
              {day === today && '✨ '}{day}
            </span>
          ))}
        </div>

        {/* Card Action */}
        <div className="card-action-row">
          <div className="price-subtext">
            {isAvailableToday ? 'Available Today' : 'Available on schedule'}
          </div>
          <button
            className="order-btn-modern"
            onClick={handleAdd}
            style={isAdded ? { background: '#10B981' } : {}}
          >
            {isAdded ? (
              <>
                <CheckIcon size={16} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <PlusIcon size={16} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;