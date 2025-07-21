import { Request, Response, NextFunction } from 'express';
import * as paymentService from '../services/paymentService';
import { CreatePaymentIntentRequest, ConfirmPaymentRequest } from '../types/payment';

export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestData: CreatePaymentIntentRequest = req.body;
    
    // Validate required fields
    if (!requestData.amount || requestData.amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required',
      });
    }

    const result = await paymentService.createPaymentIntent(requestData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestData: ConfirmPaymentRequest = req.body;
    
    // Validate required fields
    if (!requestData.paymentIntentId || !requestData.paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID and payment method are required',
      });
    }

    const result = await paymentService.confirmPayment(requestData);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const paymentIntent = await paymentService.getPaymentIntent(id);
    
    if (!paymentIntent) {
      return res.status(404).json({
        success: false,
        message: 'Payment intent not found',
      });
    }

    res.json({
      paymentIntent,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};