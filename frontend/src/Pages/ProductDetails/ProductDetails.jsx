// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import API from "../../api/axios";
// import { CartContext } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import API, { BACKEND_API } from "../../api/axios";
// function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart, cart } = useContext(CartContext);

//   const [product, setProduct] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   /** with out login not proceed payment */
//   const token = localStorage.getItem("token");

//   const handleBuyNow = (e) => {
//     if (!token) {
//       toast.error("Sign in first to buy product ❌");
//       navigate("/signin");
//       return;
//     }

//     handlePayment(e); // continue payment
//   };
//   // ✅ Fetch product
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await API.get(`/products/${id}`);
//         setProduct(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // ✅ Add to Cart (with duplicate check)
//   const handleAddToCart = () => {
//     const exists = cart.find((item) => item.id === product.id);

//     if (exists) {
//       toast.error("Item already added ❌");
//       return;
//     }

//     addToCart(product);
//     toast.success("Item added to cart ✅");
//   };

//   // ✅ Fake Razorpay Payment
//   const handlePayment = async (e) => {
//   e.preventDefault();
//   if (!product) return;

//   try {
//     const res = await BACKEND_API.post("/create-order", {
//       amount: Math.round(product.price * 100),
//     });
//     const order = res.data;
//     console.log("Order created:", order); // ← check this in browser console

//     const options = {
//       key: "rzp_test_Su4WV4zdBIGTmZ",
//       amount: order.amount,
//       currency: order.currency,
//       order_id: order.id,
//       name: "Fake Store",
//       description: product.title,
//       image: product.image,
//       handler: function (response) {
//         toast.success("Payment Successful ✅");
//         setPaymentStatus("success");
//         const orderData = {
//           product,
//           paymentId: response.razorpay_payment_id,
//           status: "success",
//           date: new Date().toISOString(),
//         };
//         localStorage.setItem("lastOrder", JSON.stringify(orderData));
//         setTimeout(() => {
//           navigate("/order-success", { state: orderData });
//         }, 1500);
//       },
//       prefill: {
//         name: "Test User",
//         email: "test@example.com",
//         contact: "9999999999",
//       },
//       theme: { color: "#000000" },
//     };

//     const razorpay = new window.Razorpay(options);

//     razorpay.on("payment.failed", function (response) {
//       console.log("Payment Failed Reason:", response.error); // ← check this
//       toast.error("Payment Failed ❌");
//     });

//     razorpay.open();

//   } catch (error) {
//     console.error("Full error:", error.response?.data || error.message); // ← check this
//     toast.error("Payment init failed ❌");
//   }
// };
//   // ✅ Loading state
//   if (!product) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   return (
//     <div className="min-h-[80vh] flex justify-center items-center p-5 bg-gray-100">

//       <div className="flex gap-10 max-w-5xl bg-white shadow-lg p-6 rounded-lg">

//         {/* Image */}
//         <div className="flex justify-center items-center w-1/2">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="h-64 object-contain"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex flex-col gap-4 w-1/2">

//           <h1 className="text-2xl font-bold">
//             {product.title}
//           </h1>

//           <p className="text-gray-600 text-sm">
//             {product.description}
//           </p>

//           <p className="text-xl font-semibold text-rose-600">
//             $ {product.price}
//           </p>

//           <p className="text-sm">
//             Category: {product.category}
//           </p>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-5">

//             {/* Add to Cart */}
//             <button
//               onClick={handleAddToCart}
//               className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded"
//             >
//               Add to Cart
//             </button>

//             {/* Buy Now */}
//             <button
//               onClick={handleBuyNow}
//               disabled={paymentStatus === "success"}
//               className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded disabled:opacity-50"
//             >
//               {paymentStatus === "success" ? "Paid ✅" : "Buy Now"}
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ProductDetails;



import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { BACKEND_API } from "../../api/axios";

import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // ✅ Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      toast.error("Item already added ❌");
      return;
    }

    addToCart(product);
    toast.success("Item added to cart ✅");
  };

  // ✅ Razorpay Payment (UPDATED)
  const handlePayment = (e) => {
    e.preventDefault();

    if (!product) return;

    const options = {
      key: "rzp_test_Su4WV4zdBIGTmZ",
      amount: Math.round(product.price * 100),
      currency: "INR",
      name: "Fake Store",
      description: product.title,
      image: product.image,

      // 🔥 FORCE UPI ID INPUT
      method: {
        upi: true
      },

      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay using UPI",
              instruments: [
                {
                  method: "upi",
                  flows: ["collect", "intent"] // 👈 shows UPI ID + apps
                }
              ]
            }
          },
          sequence: ["block.upi"],
          preferences: {
            show_default_blocks: true
          }
        }
      },

      handler: function (response) {
        console.log("Payment Success:", response);

        toast.success("Payment Successful ✅");
        setPaymentStatus("success");

        const orderData = {
          product,
          paymentId: response.razorpay_payment_id,
          status: "success",
          date: new Date().toISOString()
        };

        localStorage.setItem("lastOrder", JSON.stringify(orderData));

        setTimeout(() => {
          navigate("/order-success", { state: orderData });
        }, 1500);
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#000000"
      }
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      console.log("Payment Failed:", response);
      toast.error("Payment Failed ❌");
      setPaymentStatus("failure");
    });

    razorpay.open();
  };

  // ✅ Loading
  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center p-5 bg-gray-100">
      <div className="flex gap-10 max-w-5xl bg-white shadow-lg p-6 rounded-lg">

        {/* Image */}
        <div className="flex justify-center items-center w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 w-1/2">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-gray-600 text-sm">
            {product.description}
          </p>

          <p className="text-xl font-semibold text-rose-600">
            ₹ {product.price}
          </p>

          <p className="text-sm">
            Category: {product.category}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-5">

            <button
              onClick={handleAddToCart}
              className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={handlePayment}
              disabled={paymentStatus === "success"}
              className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded disabled:opacity-50"
            >
              {paymentStatus === "success" ? "Paid ✅" : "Buy Now"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;