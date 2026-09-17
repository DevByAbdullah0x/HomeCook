import React from 'react';
import { ChefHatIcon, LockIcon, ClockIcon, MapPinIcon, HeartIcon } from './Icons';

function Footer({ setCurrentPage }) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="brand-section" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
            <div className="brand-logo-icon" style={{ width: '38px', height: '38px' }}>
              <ChefHatIcon size={22} />
            </div>
            <div className="brand-info">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                Home<span style={{ color: '#E0533C' }}>Cook</span>
              </h2>
            </div>
          </div>
          <p className="footer-tagline">
            Bringing authentic, hand-cooked family recipes right to your dining table. Made with fresh ingredients, zero artificial preservatives, and authentic love.
          </p>
        </div>

        {/* Operating & Delivery Info */}
        <div className="footer-col">
          <h4 className="footer-col-title">Our Kitchen</h4>
          <ul className="footer-list">
            <li className="footer-list-item">
              <ClockIcon size={15} color="#E0533C" />
              <span>Orders must be placed 5 hours in advance</span>
            </li>
            <li className="footer-list-item">
              <ClockIcon size={15} color="#10B981" />
              <span>Deliveries scheduled 12:00 PM – 9:00 PM</span>
            </li>
            <li className="footer-list-item">
              <MapPinIcon size={15} color="#3B82F6" />
              <span>Locally sourced fresh daily ingredients</span>
            </li>
          </ul>
        </div>

        {/* Promise */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quality Promise</h4>
          <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: '1.6' }}>
            Every dish is prepared in certified hygienic home kitchens by passionate culinary artisans following authentic heritage recipes.
          </p>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#E0533C', fontWeight: 600 }}>
            <HeartIcon size={14} color="#E0533C" />
            <span>Made with passion & purity</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Staff Link */}
      <div className="footer-bottom-bar">
        <div>
          © {new Date().getFullYear()} HomeCook Inc. All culinary rights reserved.
        </div>

        {/* Discrete, subtle staff portal entry */}
        <div>
          <button
            className="staff-portal-link"
            onClick={() => setCurrentPage('admin')}
            title="Kitchen Administrator Login"
          >
            <LockIcon size={13} />
            <span>Kitchen Staff Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

