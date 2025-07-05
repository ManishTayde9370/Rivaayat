import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // ✅ For navigation
import '../css/CartIcon.css'; // ✅ Import your CSS for styling

const CartIcon = () => {
  const items = useSelector(state => state.cart.items);
  const navigate = useNavigate(); // ✅ Hook from react-router-dom

  const totalQuantity = Array.isArray(items)
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const handleClick = () => {
    navigate('/cart'); // ✅ Navigate to the cart page
  };

  return (
    <div className="cart-icon" onClick={handleClick} style={{ cursor: 'pointer' }}>
      🛒
      <span>{totalQuantity}</span>
    </div>
  );
};

export default CartIcon;
