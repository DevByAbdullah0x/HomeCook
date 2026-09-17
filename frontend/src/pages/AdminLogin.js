import React, { useState } from 'react';
import { ChefHatIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowLeftIcon, ShieldIcon } from '../components/Icons';

function AdminLogin({ onLoginSuccess, onReturnToMenu }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid username or password.');
      }

      // Save token and notify parent
      localStorage.setItem('homecook_admin_token', data.token);
      if (onLoginSuccess) {
        onLoginSuccess(data.token, data.user);
      }
    } catch (err) {
      // Fallback local check if backend was offline
      if (err.message.includes('Failed to fetch')) {
        if (username === 'admin' && password === 'homecook123') {
          const fallbackToken = 'homecook_secret_token_774921a';
          localStorage.setItem('homecook_admin_token', fallbackToken);
          onLoginSuccess(fallbackToken, { username: 'admin', role: 'Kitchen Administrator' });
          return;
        }
      }
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Back Link */}
        <button className="login-back-btn" onClick={onReturnToMenu}>
          <ArrowLeftIcon size={16} />
          <span>Return to Public Menu</span>
        </button>

        {/* Brand & Security Header */}
        <div className="login-header">
          <div className="login-logo-icon">
            <ChefHatIcon size={30} />
          </div>
          <h2>Kitchen Staff Portal</h2>
          <p>Sign in with your administrator credentials to manage dishes and weekly operations.</p>
        </div>

        {/* Security Notice */}
        <div className="login-security-pill">
          <ShieldIcon size={14} color="#065F46" />
          <span>Authorized Kitchen Personnel Only</span>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="login-error-alert">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-modern">
            <label className="form-label-modern">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input-modern"
              placeholder="e.g., admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group-modern">
            <label className="form-label-modern">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input-modern password-field"
                placeholder="••••••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary login-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LockIcon size={16} />
                <span>Sign In to Kitchen Panel</span>
              </>
            )}
          </button>
        </form>

        <div className="login-hint-box">
          <span>Demo Credentials: <strong>admin</strong> / <strong>homecook123</strong></span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

