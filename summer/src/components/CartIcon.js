// components/CartIcon.js
import React from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const cart = useSelector((state) => state.cart);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" className="position-relative text-dark me-3">
      <FaShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
