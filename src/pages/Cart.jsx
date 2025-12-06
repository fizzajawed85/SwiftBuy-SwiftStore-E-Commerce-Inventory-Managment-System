import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice.js";
import { createOrder } from "../redux/slices/orderSlice.js";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cart) || [];
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const orderData = {
      customer: "John Doe", // yahan auth user ka naam ya email use kar sakte ho
      items: cartItems,
      total: totalPrice,
      status: "pending", 
      date: new Date().toISOString(),
    };

    dispatch(createOrder(orderData)); // Firebase me save hoga
    dispatch(clearCart()); // cart clear ho jayega
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 text-center sm:text-left">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center mt-16 text-xl">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Cart Items */}
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.cartId}
                item={item}
                onRemove={(item) => dispatch(removeFromCart(item.cartId))}
                onIncrease={(item) =>
                  dispatch(
                    updateQuantity({
                      cartId: item.cartId,
                      quantity: item.quantity + 1,
                    })
                  )
                }
                onDecrease={(item) =>
                  item.quantity > 1
                    ? dispatch(
                        updateQuantity({
                          cartId: item.cartId,
                          quantity: item.quantity - 1,
                        })
                      )
                    : dispatch(removeFromCart(item.cartId))
                }
              />
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-yellow-400 border-b border-gray-700 pb-2">
              Order Summary
            </h2>

            <div className="flex justify-between items-center mt-2">
              <div className="text-gray-300 font-semibold">
                Items: <span className="text-white">{cartItems.length}</span>
              </div>

              <div className="text-yellow-400 font-bold text-lg">
                Total: ${totalPrice}
              </div>

              <button
                onClick={handleCheckout}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                <FaShoppingCart /> Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
