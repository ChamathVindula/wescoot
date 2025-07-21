import express from 'express';
import * as paymentController from '../controllers/paymentController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing endpoints
 */

/**
 * @swagger
 * /payments/create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount in cents
 *               currency:
 *                 type: string
 *                 default: usd
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Payment intent created successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/create-payment-intent', paymentController.createPaymentIntent);

/**
 * @swagger
 * /payments/confirm-payment:
 *   post:
 *     summary: Confirm a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentIntentId
 *               - paymentMethod
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *               paymentMethod:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     default: card
 *                   card:
 *                     type: object
 *                     properties:
 *                       number:
 *                         type: string
 *                       exp_month:
 *                         type: number
 *                       exp_year:
 *                         type: number
 *                       cvc:
 *                         type: string
 *     responses:
 *       200:
 *         description: Payment processed
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Payment intent not found
 */
router.post('/confirm-payment', paymentController.confirmPayment);

/**
 * @swagger
 * /payments/payment-intent/{id}:
 *   get:
 *     summary: Get payment intent by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment intent details
 *       404:
 *         description: Payment intent not found
 */
router.get('/payment-intent/:id', paymentController.getPaymentIntent);

export default router;