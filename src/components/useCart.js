import { useState, useEffect } from "react";

const useCart = (storageKey = "cart") => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addItem = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const delItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setCart([]);

  const clearAll = () => {
    localStorage.removeItem(storageKey);
    setCart([]);
  };

  const decreaseItem = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const getCart = () => cart;

  return {
    cart,
    addItem,
    delItem,
    clear,
    clearAll,
    decreaseItem,
    getCart,
  };
};

export default useCart;
