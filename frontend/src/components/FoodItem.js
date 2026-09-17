import React, { useState } from 'react';
import { UsersIcon, PlusIcon, CheckIcon } from './Icons';

function FoodItem({ item, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.image);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const isAvailableToday = item.available && item.available.includes(today);

  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60';

  const handleAdd = () => {
    onAddToCart(item);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div className="food-card">
      <div className="food-image-wrapper">
        <img
          src={imgSrc}
          alt={item.name}
          className="food-image"
          onError={() => setImgSrc(fallbackImage)}
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