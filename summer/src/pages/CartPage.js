import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  removeFromCart,
  clearCart,
  persistCartToBackend, // ✅ Correct function name
} from '../redux/cart/actions';


function CartPage() {
  const cart = useSelector((state) => state.cart?.items || []); // ✅ cart is array of items
  const dispatch = useDispatch();

  // ✅ Save cart to backend whenever it changes (even if empty)
  useEffect(() => {
    dispatch(persistCartToBackend());
  }, [cart, dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <button
                  className="text-red-500 hover:underline mt-2"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 font-bold">Total: ₹{total}</div>

          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;