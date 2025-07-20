import { Request, Response, NextFunction } from 'express';
import * as scooterService from '../services/scooterService';

export const getAllScooters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scooters = await scooterService.getScooters(req.query as any);
    res.json(scooters);
  } catch (error) {
    next(error);
  }
};

export const getScooterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const scooter = await scooterService.getScooterById(Number(id));
    res.json(scooter);
  } catch (error) {
    next(error);
  }
};

export const getScooterBrands = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await scooterService.getScooterBrands();
    res.json(brands);
  } catch (error) {
    next(error);
  }
};
