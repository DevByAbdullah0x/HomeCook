import React, { useState } from 'react';
import CheckoutModal from '../components/CheckoutModal';
import {
  ShoppingBagIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon
} from '../components/Icons';

function Cart({ cartItems, updateQuantity, removeFromCart, setCurrentPage, clearCart }) {
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Delivery is complimentary for orders over Rs 600, otherwise Rs 60
  const deliveryFee = subtotal > 600 || subtotal === 0 ? 0 : 60;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (orderInfo) => {
    // Format payload for backend: item array, address, deliveryTime, total
    try {
      const orderPayload = {
        items: cartItems.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity || 1,
          serves: i.serves
        })),
        address: orderInfo.address,
        deliveryTime: orderInfo.deliveryTime,
        total: grandTotal
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      setLastOrderDetails({
        id: result._id || Math.floor(Math.random() * 10000),
        time: orderInfo.deliveryTime,
        address: orderInfo.address,
        total: grandTotal
      });

      setShowModal(false);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Could not submit your order. Please check your connection.');
    }
  };

  // 1. Order Placed Celebration View
  if (orderPlaced && lastOrderDetails) {
    return (
      <div className="cart-page-wrapper">
        <div className="empty-cart-card" style={{ maxWidth: '620px', padding: '48px 32px' }}>
          <div className="success-icon-bounce">
            <CheckIcon size={38} color="#10B981" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '8px' }}>
            Order Confirmed!
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '24px' }}>
            Thank you! Your home chef has received your order and will prepare it fresh for delivery at{' '}
            <strong style={{ color: '#E0533C' }}>{lastOrderDetails.time}</strong>.
          </p>

          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px 24px',
              textAlign: 'left',
              marginBottom: '28px',
              fontSize: '0.92rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Order Reference:</span>
              <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>
                #{String(lastOrderDetails.id).slice(-6).toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Delivery Time:</span>
              <span style={{ fontWeight: 600 }}>{lastOrderDetails.time}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Delivery Address:</span>
              <span style={{ fontWeight: 600, maxWidth: '280px', textAlign: 'right' }}>
                {lastOrderDetails.address}
              </span>
            </div>
            <div
              style={{
                borderTop: '1px dashed #CBD5E1',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 800,
                fontSize: '1rem'
              }}
            >
              <span>Amount Paid / Due:</span>
              <span style={{ color: '#E0533C' }}>Rs {lastOrderDetails.total}</span>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              setOrderPlaced(false);
              setCurrentPage('home');
            }}
          >
            Order More Dishes <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    );
  }

  // 2. Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="empty-cart-card">
          <div className="empty-cart-icon-wrap">
            <ShoppingBagIcon size={36} />
          </div>
          <h3>Your cart is empty</h3>
          <p>
            You haven't selected any home-cooked dishes yet. Explore today's freshly curated menu to get started!
          </p>
          <button className="btn-primary" onClick={() => setCurrentPage('home')}>
            Browse Today's Menu <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    );
  }

  // 3. Active Cart View with 2-column layout
  return (
    <div className="cart-page-wrapper">
      <div className="cart-header-section">
        <div>
          <h2>Your Cart</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Review your selected dishes before checkout
          </p>
        </div>
        <button className="back-to-menu-btn" onClick={() => setCurrentPage('home')}>
          <ArrowLeftIcon size={16} />
          <span>Add More Dishes</span>
        </button>
      </div>

      <div className="cart-grid-layout">
        {/* Left Column: Items List */}
        <div className="cart-items-card">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-row">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                }}
              />
              <div className="cart-item-info">
                <h3 className="cart-item-title">{item.name}</h3>
                <div className="cart-item-meta">
                  <span>Rs {item.price} each</span>
                  <span>•</span>
                  <span>Serves {item.serves}</span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="quantity-stepper">
                <button
                  className="stepper-btn"
                  onClick={() => updateQuantity(item.id, -1)}
                  aria-label="Decrease quantity"
                >
                  <MinusIcon size={14} />
                </button>
                <span className="stepper-value">{item.quantity || 1}</span>
                <button
                  className="stepper-btn"
                  onClick={() => updateQuantity(item.id, 1)}
                  aria-label="Increase quantity"
                >
                  <PlusIcon size={14} />
                </button>
              </div>

              {/* Item Total */}
              <div className="cart-item-total">
                Rs {item.price * (item.quantity || 1)}
              </div>

              {/* Remove Action */}
              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove item"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="order-summary-card">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({cartItems.reduce((s, i) => s + (i.quantity || 1), 0)} items)</span>
            <span>Rs {subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Packaging & Delivery</span>
            <span>
              {deliveryFee === 0 ? (
                <span style={{ color: '#10B981', fontWeight: 600 }}>FREE</span>
              ) : (
                `Rs ${deliveryFee}`
              )}
            </span>
          </div>

          {deliveryFee > 0 && (
            <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '-6px', marginBottom: '10px' }}>
              Free delivery on orders over Rs 600!
            </p>
          )}

          <div className="summary-divider"></div>

          <div className="total-summary-row">
            <span>Total</span>
            <span>Rs {grandTotal}</span>
          </div>

          <button className="checkout-btn" onClick={() => setShowModal(true)}>
            <span>Proceed to Checkout</span>
            <ArrowRightIcon size={18} />
          </button>

          <div className="cart-prep-note">
            <ClockIcon size={18} color="#B45309" />
            <div>
              <strong>5-Hour Notice Required</strong>
              <p>Home chefs prepare every meal fresh from scratch with authentic love.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Dialog */}
      {showModal && (
        <CheckoutModal
          items={cartItems}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitOrder}
        />
      )}
    </div>
  );
}

export default Cart;