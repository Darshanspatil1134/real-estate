import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('real_estate_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('real_estate_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (property) => {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === property.id)) {
        return prevItems;
      }
      return [...prevItems, property];
    });
  };

  const removeFromCart = (propertyId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== propertyId));
  };

  const isInCart = (propertyId) => {
    return cartItems.some((item) => item.id === propertyId);
  };

  const toggleCart = (property) => {
    if (isInCart(property.id)) {
      removeFromCart(property.id);
    } else {
      addToCart(property);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
