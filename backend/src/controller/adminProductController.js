const Product = require('../model/Product');

// ➕ Add Product with multiple Cloudinary image URLs
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const images = req.files?.map(file => file.path) || [];

    const newProduct = new Product({
      name,
      description,
      price: parseFloat(price),
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
    const { name, description, price } = req.body;

    const updateData = {
      name,
      description,
      price: parseFloat(price),
    };

    if (req.files?.length > 0) {
      updateData.images = req.files.map(file => file.path);
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
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({
      success: true,
      message: '🗑️ Product deleted successfully',
    });
  } catch (err) {
    console.error('❌ Delete product error:', err);
    return res.status(500).json({ success: false, message: 'Delete failed' });
  }
};