import React, { useState, useEffect } from 'react';
import {
  UtensilsIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  CalendarIcon,
  UsersIcon,
  CloseIcon,
  SparklesIcon,
  LogOutIcon,
  ShieldIcon,
  ArrowLeftIcon
} from '../components/Icons';

function Admin({ showToast, onLogout, onReturnToMenu }) {
  const [foodItems, setFoodItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [filterSearch, setFilterSearch] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: '',
    serves: '',
    available: []
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foods/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFoodItems(data);
    } catch (err) {
      console.error('Error fetching food items:', err);
      setError('Failed to fetch food items from server.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      available: prev.available.includes(day)
        ? prev.available.filter(d => d !== day)
        : [...prev.available, day]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.available.length === 0) {
      setError('Please select at least one available day.');
      return;
    }
    if (Number(formData.price) < 1) {
      setError('Price must be at least 1.');
      return;
    }
    if (Number(formData.serves) < 1) {
      setError('Serves must be at least 1 person.');
      return;
    }

    const foodData = {
      ...formData,
      price: Number(formData.price),
      serves: Number(formData.serves)
    };

    try {
      const url = editingItem
        ? `http://localhost:5000/api/foods/${editingItem.id}`
        : 'http://localhost:5000/api/foods';

      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save food item');
      }

      await fetchFoodItems();
      if (showToast) {
        showToast(
          editingItem ? 'Dish updated successfully!' : 'New dish added to menu!'
        );
      }
      resetForm();
    } catch (err) {
      console.error('Error saving food item:', err);
      setError(err.message || 'Failed to save food item. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      image: item.image,
      price: item.price.toString(),
      serves: item.serves.toString(),
      available: item.available || []
    });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      const response = await fetch(`http://localhost:5000/api/foods/${deleteConfirmId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete food item');
      }

      await fetchFoodItems();
      if (showToast) showToast('Dish removed from catalog');
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error deleting food item:', err);
      setError('Failed to delete dish.');
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      image: '',
      price: '',
      serves: '',
      available: []
    });
    setError(null);
  };

  // KPIs
  const totalDishes = foodItems.length;
  const availableTodayCount = foodItems.filter(i => i.available && i.available.includes(todayName)).length;
  const prices = foodItems.map(i => i.price).filter(p => typeof p === 'number');
  const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;

  // Filtered inventory
  const displayedItems = foodItems.filter(item => {
    if (!filterSearch.trim()) return true;
    return item.name.toLowerCase().includes(filterSearch.toLowerCase());
  });

  return (
    <div className="admin-view">
      {/* Header */}
      <div className="admin-header-row">
        <div>
          <h2>Kitchen Management Panel</h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            Manage menu dishes, recipes, pricing, and weekly schedule
          </p>
        </div>

        <div className="admin-actions-top">
          <div className="admin-staff-badge">
            <ShieldIcon size={14} color="#065F46" />
            <span>Chef Admin</span>
          </div>

          {onReturnToMenu && (
            <button className="btn-secondary" onClick={onReturnToMenu}>
              <ArrowLeftIcon size={15} />
              <span>Public Menu</span>
            </button>
          )}

          {onLogout && (
            <button
              className="btn-secondary"
              onClick={onLogout}
              style={{ color: '#EF4444', borderColor: '#FCA5A5' }}
            >
              <LogOutIcon size={15} color="#EF4444" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: '#FFF2EE', color: '#E0533C' }}>
            <UtensilsIcon size={24} />
          </div>
          <div>
            <div className="kpi-label">Total Dishes</div>
            <div className="kpi-value">{totalDishes}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <CalendarIcon size={24} />
          </div>
          <div>
            <div className="kpi-label">Available Today ({todayName})</div>
            <div className="kpi-value">{availableTodayCount}</div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
            <SparklesIcon size={24} />
          </div>
          <div>
            <div className="kpi-label">Avg Dish Price</div>
            <div className="kpi-value">Rs {avgPrice}</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Form & Inventory */}
      <div className="admin-split-layout">
        {/* Left Column: Form */}
        <div className="admin-form-card">
          <div className="admin-card-title">
            <span>{editingItem ? 'Edit Dish' : 'Add New Dish'}</span>
            {editingItem && (
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

          {error && (
            <div
              style={{
                color: '#991B1B',
                backgroundColor: '#FEE2E2',
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '18px',
                fontSize: '0.86rem'
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group-modern">
              <label className="form-label-modern">Dish Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input-modern"
                placeholder="e.g., Shahi Paneer, Lamb Dum Biryani"
                required
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="form-input-modern"
                placeholder="https://images.unsplash.com/..."
                required
              />
              {formData.image && (
                <div className="image-preview-box">
                  <img
                    src={formData.image}
                    alt="Preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group-modern">
                <label className="form-label-modern">Price (Rs)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input-modern"
                  placeholder="350"
                  min="1"
                  required
                />
              </div>

              <div className="form-group-modern">
                <label className="form-label-modern">Servings</label>
                <input
                  type="number"
                  name="serves"
                  value={formData.serves}
                  onChange={handleInputChange}
                  className="form-input-modern"
                  placeholder="2"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">Available Days</label>
              <div className="weekdays-toggle-grid">
                {days.map(day => (
                  <div
                    key={day}
                    className={`day-checkbox-chip ${formData.available.includes(day) ? 'selected' : ''}`}
                    onClick={() => handleDayToggle(day)}
                  >
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {editingItem ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
                <span>{editingItem ? 'Update Dish' : 'Publish Dish'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Inventory List */}
        <div className="inventory-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
              Dish Catalog ({displayedItems.length})
            </h3>
            <input
              type="text"
              placeholder="Filter catalog..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="search-input"
              style={{ maxWidth: '220px', padding: '8px 14px' }}
            />
          </div>

          <div className="inventory-items-grid">
            {displayedItems.map(item => (
              <div key={item.id} className="inventory-dish-card">
                <div className="dish-thumb-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                    }}
                  />
                  <div className="dish-thumb-badge">Rs {item.price}</div>
                </div>

                <div className="dish-info-padded">
                  <h4>{item.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <UsersIcon size={13} /> Serves {item.serves}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {item.available && item.available.map(d => (
                      <span
                        key={d}
                        style={{
                          fontSize: '0.7rem',
                          background: d === todayName ? '#ECFDF5' : '#F1F5F9',
                          color: d === todayName ? '#065F46' : '#64748B',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}
                      >
                        {d.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="dish-actions-footer">
                  <button
                    className="dish-action-btn edit-action"
                    onClick={() => handleEdit(item)}
                  >
                    <EditIcon size={15} />
                    <span>Edit</span>
                  </button>
                  <button
                    className="dish-action-btn delete-action"
                    onClick={() => setDeleteConfirmId(item.id)}
                  >
                    <TrashIcon size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-dialog" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="modal-close-btn" onClick={() => setDeleteConfirmId(null)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color: '#475569', fontSize: '0.95rem' }}>
                Are you sure you want to remove this dish from the menu? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button
                className="btn-primary"
                style={{ background: '#EF4444' }}
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;