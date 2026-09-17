import React, { useState, useEffect } from 'react';
import { CloseIcon, ClockIcon, MapPinIcon, ArrowRightIcon } from './Icons';

function CheckoutModal({ items, onClose, onSubmit }) {
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [isValidTime, setIsValidTime] = useState(false);
  const [timeErrorMsg, setTimeErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  // Compute minimum recommended time (current time + 5 hours)
  const getMinDeliveryTimeString = () => {
    const minTime = new Date(Date.now() + 5 * 60 * 60 * 1000);
    const hours = String(minTime.getHours()).padStart(2, '0');
    const minutes = String(minTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    // Default suggestion for delivery time
    const suggested = getMinDeliveryTimeString();
    setDeliveryTime(suggested);
    validateTime(suggested);
  }, []);

  const validateTime = (selectedTime) => {
    if (!selectedTime) {
      setIsValidTime(false);
      setTimeErrorMsg('Please select a delivery time.');
      return;
    }

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const now = new Date();
    let target = new Date();
    target.setHours(hours, minutes, 0, 0);

    // If selected time has already passed today, assume it's for tomorrow
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const minTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    if (target < minTime) {
      setIsValidTime(false);
      setTimeErrorMsg('Our home chefs need at least 5 hours notice to cook your meal fresh from scratch.');
    } else {
      setIsValidTime(true);
      setTimeErrorMsg('');
    }
  };

  const handleTimeChange = (e) => {
    const val = e.target.value;
    setDeliveryTime(val);
    validateTime(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidTime || !address.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ address, deliveryTime });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3>Complete Your Order</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <CloseIcon size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Friendly notice on preparation time */}
            <div className="prep-notice-banner">
              <ClockIcon size={20} color="#B45309" />
              <div>
                <strong>Fresh Home-Cooked Preparation</strong>
                <p style={{ marginTop: '2px' }}>
                  Every dish is hand-prepared to order. We require a minimum 5-hour advance notice.
                </p>
              </div>
            </div>

            {/* Selected Items Summary */}
            <div className="order-items-mini-list">
              {items.map((item, idx) => (
                <div key={idx} className="mini-item-row">
                  <span>
                    <strong>{item.quantity || 1}x</strong> {item.name}
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    Rs {item.price * (item.quantity || 1)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: '1px dashed #CBD5E1',
                  paddingTop: '10px',
                  marginTop: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: '#0F172A'
                }}
              >
                <span>Total Amount</span>
                <span style={{ color: '#E0533C' }}>Rs {calculateTotal()}</span>
              </div>
            </div>

            {/* Delivery Time Input */}
            <div className="form-group-modern">
              <label className="form-label-modern">
                <ClockIcon size={16} color="#E0533C" />
                <span>Delivery Time (Minimum 5 hours from now)</span>
              </label>
              <input
                type="time"
                value={deliveryTime}
                onChange={handleTimeChange}
                className="form-input-modern"
                required
              />
              {!isValidTime && timeErrorMsg && (
                <div className="input-error-msg">
                  ⚠️ {timeErrorMsg}
                </div>
              )}
            </div>

            {/* Delivery Address Input */}
            <div className="form-group-modern">
              <label className="form-label-modern">
                <MapPinIcon size={16} color="#E0533C" />
                <span>Delivery Address</span>
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-textarea-modern"
                placeholder="Apartment / House #, Street, Landmark, Area..."
                rows="3"
                required
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!isValidTime || !address.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>Confirm & Place Order</span>
                  <ArrowRightIcon size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;