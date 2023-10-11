const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { uploadImage, createProduct, getProducts, getMyProducts, getProduct, editProduct, deleteProduct } = require('../controllers/productController');

router.post('/', protect, createProduct);
router.get('/upload_image', uploadImage);
router.get('/', protect, getProducts);
router.get('/my', protect, getMyProducts);
router.get('/:id', protect, getProduct);
router.put('/:id', protect, editProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;