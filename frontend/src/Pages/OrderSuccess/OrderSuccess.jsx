import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdCheck } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get order data from navigation OR localStorage
  const orderData =
    location.state || JSON.parse(localStorage.getItem("lastOrder"));

  if (!orderData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl">No Order Found ❌</h1>
      </div>
    );
  }

  const { product, paymentId, date } = orderData;

  return (
    <div className="min-h-[80vh] flex justify-center items-center bg-gray-100 ">

      <div className="bg-white shadow-lg rounded-lg  max-w-xl w-full text-center">

        {/* ✅ Success Icon */}
        <div className="bg-green-500 my-6 text-5xl p-5 mb-3 justify-center items-center flex rounded-full w-15 h-15 mx-auto"><GiCheckMark className="text-white text-3xl"/></div>

        <h1 className="text-2xl font-bold mb-2">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mb-4">
          Thank you for your purchase!
        </p>

        {/* Product Info */}
        <div className="flex gap-4 items-center justify-center mb-4 px-6">

          <img
            src={product.image}
            alt={product.title}
            className="h-20 object-contain"
          />

          <div className="text-left">
            <p className="font-semibold">{product.title}</p>
            <p className="text-sm text-gray-500">₹ {product.price}</p>
          </div>

        </div>

        <hr className="my-3 w-full p-0" />

        {/* Order Details */}
        <div className="text-sm text-gray-700 space-y-1 px-6">

          <p>
            <strong>Payment ID:</strong> {paymentId}
          </p>

          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(date).toLocaleString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-semibold">
              Success
            </span>
          </p>

        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-5 pb-6">

          <button
            onClick={() => navigate("/")}
            className="bg-rose-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer"
          >
            Go to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;