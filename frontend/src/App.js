import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { CheckIcon, ArrowRightIcon } from './components/Icons';

function App() {
  // Determine initial page from URL pathname, query, or hash
  const getInitialPage = () => {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('/admin') || search.includes('page=admin') || hash === '#admin') {
      return 'admin';
    }
    if (path.includes('/cart') || search.includes('page=cart') || hash === '#cart') {
      return 'cart';
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('homecook_admin_token'));
  });

  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, actionLabel, actionCallback) => {
    setToast({
      message,
      actionLabel,
      actionCallback
    });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });

    showToast(
      `Added "${item.name}" to cart!`,
      'View Cart',
      () => navigateTo('cart')
    );
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleAdminLogin = (token) => {
    setIsAdminAuthenticated(true);
    showToast('Welcome back, Kitchen Administrator!');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('homecook_admin_token');
    setIsAdminAuthenticated(false);
    showToast('Logged out of Kitchen Staff Portal');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-root">
      {/* If visiting admin, render admin portal / login */}
      {currentPage === 'admin' ? (
        <div className="admin-portal-wrapper">
          {isAdminAuthenticated ? (
            <main className="app-container" style={{ paddingTop: '28px' }}>
              <Admin
                showToast={showToast}
                onLogout={handleAdminLogout}
                onReturnToMenu={() => navigateTo('home')}
              />
            </main>
          ) : (
            <AdminLogin
              onLoginSuccess={handleAdminLogin}
              onReturnToMenu={() => navigateTo('home')}
            />
          )}
        </div>
      ) : (
        /* Public Customer Experience */
        <>
          <Header
            currentPage={currentPage}
            setCurrentPage={navigateTo}
            cartItemCount={totalCartCount}
          />

          <main className="app-container">
            {currentPage === 'home' && (
              <Home addToCart={addToCart} setCurrentPage={navigateTo} />
            )}
            {currentPage === 'cart' && (
              <Cart
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                setCurrentPage={navigateTo}
                clearCart={clearCart}
              />
            )}
          </main>

          <Footer setCurrentPage={navigateTo} />
        </>
      )}

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-toast-wrapper">
          <div className="toast-pill">
            <div className="toast-icon-circle">
              <CheckIcon size={14} />
            </div>
            <span>{toast.message}</span>
            {toast.actionLabel && (
              <button
                className="toast-view-cart-link"
                onClick={() => {
                  if (toast.actionCallback) toast.actionCallback();
                  setToast(null);
                }}
              >
                {toast.actionLabel} <ArrowRightIcon size={12} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;