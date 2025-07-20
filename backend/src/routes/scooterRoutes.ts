import express from 'express';
import * as scooterController from '../controllers/scooterController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Scooters
 *   description: Scooter management
 */

/**
 * @swagger
 * /scooters/brands:
 *   get:
 *     summary: Retrieve a list of unique scooter brands
 *     tags: [Scooters]
 *     responses:
 *       200:
 *         description: A list of scooter brands.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/brands', scooterController.getScooterBrands);

/**
 * @swagger
 * /scooters/{id}:
 *   get:
 *     summary: Retrieve a single scooter by ID
 *     tags: [Scooters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single scooter.
 *       404:
 *         description: Scooter not found.
 */
router.get('/:id', scooterController.getScooterById);

/**
 * @swagger
 * /scooters:
 *   get:
 *     summary: Retrieve a list of scooters
 *     tags: [Scooters]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, brand, createdAt]
 *           default: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: motor
 *         schema:
 *           type: string
 *       - in: query
 *         name: maxSpeed
 *         schema:
 *           type: integer
 *       - in: query
 *         name: maxRange
 *         schema:
 *           type: integer
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           example: 100-500
 *     responses:
 *       200:
 *         description: A list of scooters.
 */
router.get('/', scooterController.getAllScooters);

export default router;
