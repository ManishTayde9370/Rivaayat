// src/admin/ManageProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = 'http://localhost:5000/api/admin/products';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API, { withCredentials: true });
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error('Failed to load products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    formData.images.forEach((file) => data.append('images', file));

    try {
      if (editingProduct) {
        await axios.put(`${API}/${editingProduct._id}`, data, {
          withCredentials: true,
        });
        toast.success('Product updated');
      } else {
        await axios.post(API, data, {
          withCredentials: true,
        });
        toast.success('Product added');
      }
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`${API}/${id}`, { withCredentials: true });
        toast.success('Product deleted');
        fetchProducts();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price || '',
        images: [],
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', images: [] });
    setEditingProduct(null);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Products</h3>
      <Button variant="success" className="mb-3" onClick={() => openModal()}>
        ➕ Add Product
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ minWidth: '150px' }}>Images</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                {p.images?.map((img, i) => (
                  <Image
                    key={i}
                    src={`http://localhost:5000/${img}`}
                    alt="img"
                    width={60}
                    height={60}
                    className="me-1 mb-1 rounded"
                    style={{ objectFit: 'cover', border: '1px solid #ccc' }}
                  />
                ))}
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => openModal(p)}>
                  Edit
                </Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(p._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 1299"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{editingProduct ? 'Replace Images' : 'Upload Images'}</Form.Label>
              <Form.Control type="file" name="images" onChange={handleChange} multiple />
              <Form.Text className="text-muted">
                {editingProduct ? 'Uploading new images will replace old ones' : 'Upload multiple images'}
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageProducts;