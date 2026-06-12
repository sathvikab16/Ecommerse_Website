import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import { LuDelete } from "react-icons/lu";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

function Cart() {
  const { cart } = useContext(CartContext);
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="min-h-[80vh] p-8 bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >

              {/* Image */}
              <img
                src={item.image}
                className="h-20 w-20 object-contain"
              />

              {/* Title */}
              <h2 className="w-[300px] text-sm font-semibold">
                {item.title}
              </h2>

              {/* Price */}
              <p className="font-bold text-rose-600">
                ₹ {item.price}
              </p>
              <div className="flex  justify-between items-center  gap-2 cursor-pointer">

              <FaMinus onClick={decrement} className="text-sm font-light" />
              <p>{count}</p>
              <FaPlus onClick={increment} className="text-sm font-light"/>
              </div>

              {/* Button */}
              <div className="flex  justify-between items-center  gap-2">

                <button className="bg-black cursor-pointer text-[14px] hover:text-[13px] transition-all  text-white px-4 py-2 rounded">
                  Buy Now
                </button>
                <RiDeleteBin6Fill className="text-rose-500 w-6 h-6 cursor-pointer"  />
              </div>
              

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Cart;

