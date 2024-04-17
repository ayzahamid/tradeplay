import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.registerProduct);
router.put('/products/:id/purchase', productController.purchaseProduct);
router.put('/products/:id/counter-offer', productController.makeCounterOffer);

export default router;
