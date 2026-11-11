"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexworld_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load cart from storage");
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("nexworld_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to storage");
    }
  }, [cart]);

  const showNotification = (message, item) => {
    setNotification({ message, item, id: Date.now() });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  };

  const addToCart = (product, quantity = 1, size = null) => {
    const selectedSize = size || product.size || "100ml / 3.4 FL. OZ.";
    const cartItemId = `${product.id}_${selectedSize}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            subtitle: product.subtitle || "Eau de Parfum",
            price: Number(product.price),
            image: product.image || "/images/zego.png",
            bottleImage: product.bottleImage || product.image,
            size: selectedSize,
            quantity,
            themeColor: product.themeColor || "#F4D7DA",
          },
        ];
      }
    });

    showNotification(`Added ${product.name} to your private collection`, product);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
