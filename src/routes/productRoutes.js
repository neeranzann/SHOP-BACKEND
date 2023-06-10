const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const auth = require('../middleware/authRoute');
const checkFile = require('../middleware/fileCheck');

const methodNotAllowed = (req, res) => res.status(405).json({ message: 'method not allowed' });



router.get('/', productController.getAllProducts);
router.get('/api/product/:id', productController.getProductById);

router.post('/api/product_create', auth.checkAdmin, checkFile.fileCheck, productController.productAdd);

router.patch('/api/product_update/:id', auth.checkAdmin,
  checkFile.updateCheck,
  productController.productUpdate);

router.patch('/api/product_review/:id', auth.checkUser,
  productController.addReviewToProduct);


router.delete('/api/product_remove/:id', auth.checkAdmin, productController.productRemove);


module.exports = router;