// src/admin/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'images') {
      const fileArray = Array.from(files);
      if (fileArray.length > 5) {
        toast.warn('You can upload up to 5 images.');
        return;
      }
      setForm({ ...form, images: fileArray });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, images } = form;

    if (!name || !description || !price || images.length === 0) {
      toast.error('All fields and at least one image are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      images.forEach((img) => formData.append('images', img));

      setUploading(true);

      const res = await axios.post(
        'http://localhost:5000/api/admin/products',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      toast.success('✅ Product added');
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <ToastContainer />
      <h3 className="mb-4 text-center">➕ Add New Product</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Upload Images (up to 5)</label>
          <input
            type="file"
            className="form-control"
            name="images"
            multiple
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        {/* Image Previews */}
        {form.images.length > 0 && (
          <div className="mb-3 d-flex flex-wrap gap-3">
            {form.images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
              />
            ))}
          </div>
        )}

        <button type="submit" className="btn btn-dark w-100" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
