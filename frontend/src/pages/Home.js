import React, { useState, useEffect } from 'react';
import FoodItem from '../components/FoodItem';
import { SearchIcon, SparklesIcon, CalendarIcon, UtensilsIcon } from '../components/Icons';

function Home({ addToCart, setCurrentPage }) {
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [selectedDay, setSelectedDay] = useState('today'); // 'today', 'all', or 'Monday', etc.

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchAllFoods = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/foods/all');
        if (!response.ok) throw new Error('Failed to fetch menu');
        const data = await response.json();
        setAllFoods(data);
      } catch (error) {
        console.error('Error fetching foods:', error);
        // Fallback to local data if backend is unreachable
        try {
          const { foodItems } = await import('../data');
          setAllFoods(foodItems);
        } catch (e) {
          setAllFoods([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAllFoods();
  }, []);

  // Filter foods by day and search query
  const filteredFoods = allFoods.filter(item => {
    // Day filter
    if (selectedDay === 'today') {
      if (!item.available || !item.available.includes(todayName)) return false;
    } else if (selectedDay !== 'all') {
      if (!item.available || !item.available.includes(selectedDay)) return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchServes = item.serves.toString().includes(q);
      return matchName || matchServes;
    }

    return true;
  });

  return (
    <div className="home-view">
      {/* Hero Welcome Banner */}
      <section className="hero-card">
        <div className="hero-content">
          <div className="hero-pill">
            <SparklesIcon size={14} />
            <span>Pure Homemade & Handcrafted</span>
          </div>
          <h1 className="hero-title">
            Authentic Home-Cooked Meals, Delivered Fresh.
          </h1>
          <p className="hero-subtitle">
            Slow-cooked traditional recipes made fresh in local home kitchens.
            Prepared to order with 5 hours of care and authentic passion.
          </p>
          <div className="hero-highlights">
            <div className="hero-highlight-item">
              <span>🌿 100% Home Cooked</span>
            </div>
            <div className="hero-highlight-item">
              <span>⏱️ Made Fresh to Order</span>
            </div>
            <div className="hero-highlight-item">
              <span>🍲 Family Sized Portions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Filter & Search Controls */}
      <section className="menu-controls">
        <div className="search-and-status">
          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <span className="search-icon-pos">
              <SearchIcon size={18} />
            </span>
            <input
              type="text"
              placeholder="Search dishes or portions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="date-badge" style={{ fontSize: '0.9rem' }}>
            <CalendarIcon size={16} />
            <span>Today is <strong>{todayName}</strong></span>
          </div>
        </div>

        {/* Day Filter Pills */}
        <div className="day-filters-scroll">
          <button
            className={`day-pill-btn today-indicator ${selectedDay === 'today' ? 'active' : ''}`}
            onClick={() => setSelectedDay('today')}
          >
            <span>Today's Menu</span>
            <span className="today-star-badge">{todayName.slice(0, 3)}</span>
          </button>

          <button
            className={`day-pill-btn ${selectedDay === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedDay('all')}
          >
            All Dishes ({allFoods.length})
          </button>

          {daysList.map(day => (
            <button
              key={day}
              className={`day-pill-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Header */}
      <div className="menu-header-row">
        <h2>
          {selectedDay === 'today'
            ? `Today's Specials (${todayName})`
            : selectedDay === 'all'
            ? 'Full Weekly Menu'
            : `${selectedDay} Menu`}
        </h2>
        <span className="dishes-count-badge">
          Showing {filteredFoods.length} {filteredFoods.length === 1 ? 'dish' : 'dishes'}
        </span>
      </div>

      {/* Food Items Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
          <p>Loading fresh kitchen dishes...</p>
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="empty-cart-card" style={{ maxWidth: '600px', margin: '40px auto' }}>
          <div className="empty-cart-icon-wrap">
            <UtensilsIcon size={36} />
          </div>
          <h3>No dishes found</h3>
          <p>
            {searchQuery
              ? `No dishes matching "${searchQuery}". Try a different keyword.`
              : `No dishes scheduled for ${selectedDay}. Check out today's menu or the full week.`}
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              setSelectedDay('today');
              setSearchQuery('');
            }}
          >
            View Today's Menu
          </button>
        </div>
      ) : (
        <div className="food-grid">
          {filteredFoods.map(item => (
            <FoodItem key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;