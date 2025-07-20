import { Model } from 'sequelize';

export interface CategoryAttributes {
  id: number;
  name: string;
}

export interface CategoryInstance extends Model<CategoryAttributes>, CategoryAttributes {}

export interface SafetyInfoAttributes {
  id: number;
  scooterId: number;
  info: string;
}

export interface SafetyInfoInstance extends Model<SafetyInfoAttributes>, SafetyInfoAttributes {}

export interface DiscountAttributes {
  id: number;
  scooterId: number;
  percentage: number;
  startDate: Date;
  endDate: Date;
}

export interface DiscountInstance extends Model<DiscountAttributes>, DiscountAttributes {}

export interface ScooterAttributes {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  motor: string;
  maxSpeed: number;
  maxRange: number;
  weight: number;
  description: string;
  imageUrl: string;
  stock: number;
  categoryId: number;
  category?: CategoryAttributes;
  safetyInfo?: SafetyInfoAttributes;
  discount?: DiscountAttributes;
}

export interface ScooterInstance extends Model<ScooterAttributes>, ScooterAttributes {}
