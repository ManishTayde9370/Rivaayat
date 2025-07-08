const Product = require('../model/Product');
const fs = require('fs');
const path = require('path');

// ➕ Add Product with multiple images
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name?.trim() || !description?.trim() || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (name, description, price, stock)',
      });
    }

    const images = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];

    const newProduct = new Product({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category?.trim() || '',
      images,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: '✅ Product created successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error('❌ Product creation error:', err);
    return res.status(500).json({ success: false, message: 'Error creating product' });
  }
};

// 📄 Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, products });
  } catch (err) {
    console.error('❌ Fetch products error:', err);
    return res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};

// ✏️ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const updateData = {
      name: name?.trim(),
      description: description?.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category?.trim() || '',
    };

    // If new images uploaded, replace existing
    if (Array.isArray(req.files) && req.files.length > 0) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      if (Array.isArray(product.images) && product.images.length > 0) {
        product.images.forEach((imgPath) => {
          const localPath = path.normalize(path.join(__dirname, '..', imgPath));
          fs.unlink(localPath, (err) => {
            if (err) {
              console.warn('⚠️ Failed to delete old image:', localPath, err.message);
            }
          });
        });
      }

      updateData.images = req.files.map((file) => file.path);
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({
      success: true,
      message: '✅ Product updated successfully',
      product: updated,
    });
  } catch (err) {
    console.error('❌ Update product error:', err);
    return res.status(500).json({ success: false, message: 'Update failed' });
  }
};

// ❌ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((imgPath) => {
        const localPath = path.normalize(path.join(__dirname, '..', imgPath));
        fs.unlink(localPath, (err) => {
          if (err) {
            console.warn('⚠️ Failed to delete image:', localPath, err.message);
          }
        });
      });
    }

    await product.remove();

    return res.json({
      success: true,
      message: '🗑️ Product deleted successfully',
    });
  } catch (err) {
    console.error('❌ Delete product error:', err);
    return res.status(500).json({ success: false, message: 'Delete failed' });
  }
};
