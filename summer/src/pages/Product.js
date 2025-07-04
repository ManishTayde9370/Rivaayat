import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products', {
          withCredentials: true,
        });
        setProducts(res.data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5" style={{ fontFamily: 'Georgia', fontWeight: 'bold', color: '#4b2e2e' }}>
        🛍️ Explore Our Royal Collection
      </h2>

      <div className="row justify-content-center">
        {products.map((product, i) => (
          <ProductCard key={product._id || i} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const fallbackImage = '/fallback.jpg'; // Replace with your actual fallback path

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-lg h-100 border-0" style={{ borderRadius: '20px' }}>
        <div className="text-center p-3">
          <Zoom>
            <img
              src={product.images[activeIndex] || fallbackImage}
              alt={product.name}
              onError={(e) => (e.target.src = fallbackImage)}
              className="img-fluid rounded"
              style={{
                height: '250px',
                objectFit: 'cover',
                border: '1px solid #fcecc5',
                borderRadius: '10px',
              }}
            />
          </Zoom>
        </div>

        <div className="d-flex justify-content-center mb-2 flex-wrap px-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setActiveIndex(index)}
              onError={(e) => (e.target.src = fallbackImage)}
              className={`m-1 border ${index === activeIndex ? 'border-warning' : 'border-light'}`}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                cursor: 'pointer',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>

        <div className="card-body text-center">
          <h5 className="card-title" style={{ color: '#3e1f1f', fontWeight: 'bold' }}>{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <h6 className="mb-3" style={{ color: '#7b3f00', fontWeight: 'bold' }}>₹{product.price}</h6>
          <button
            className="btn btn-outline-dark rounded-pill px-4"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
