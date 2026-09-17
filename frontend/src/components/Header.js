import React from 'react';
import { ChefHatIcon, ShoppingBagIcon, CalendarIcon, UtensilsIcon } from './Icons';

function Header({ currentPage, setCurrentPage, cartItemCount = 0 }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="header-wrapper">
      <div className="header-content">
        {/* Brand Logo & Name */}
        <div className="brand-section" onClick={() => setCurrentPage('home')}>
          <div className="brand-logo-icon">
            <ChefHatIcon size={26} />
          </div>
          <div className="brand-info">
            <h1>Home<span>Cook</span></h1>
            <p>Authentic Homemade Food</p>
          </div>
        </div>

        {/* Center Live Badge & Date */}
        <div className="header-center-info">
          <div className="kitchen-badge">
            <span className="kitchen-pulse"></span>
            <span>Kitchen Open Today</span>
          </div>
          <div className="date-badge">
            <CalendarIcon size={15} />
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            <UtensilsIcon size={16} />
            <span>Menu</span>
          </button>

          <button
            className={`nav-tab-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            <ShoppingBagIcon size={16} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-count-badge">
                {cartItemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;