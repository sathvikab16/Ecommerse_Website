import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {

    const alreadyExists = cart.find((item) => item.id === product.id);

    if (alreadyExists) {
      toast.error("Item already added ❌");
      return;
    }

    setCart((prev) => [...prev, product]);
    // toast.success("Item added to cart ✅");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
    
  );
}

export default CartProvider;