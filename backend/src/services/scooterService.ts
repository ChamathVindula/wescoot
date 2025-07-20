import { Op } from 'sequelize';
import { ScooterInstance, ScooterAttributes } from '../types/models';
const { Scooter, Category, SafetyInfo, Discount } = require('../models');

interface GetScootersParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
  brand?: string;
  category?: string;
  motor?: string;
  maxSpeed?: number;
  maxRange?: number;
  price?: string;
}

interface GetScootersResult {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  scooters: ScooterInstance[];
}

export const getScooters = async (params: GetScootersParams): Promise<GetScootersResult> => {
  const { page = 1, limit = 10, sortBy, order, ...filters } = params;
  const offset = (page - 1) * limit;
  const where: any = {};

  if (filters.brand) {
    where.brand = filters.brand;
  }
  if (filters.category) {
    const category = await Category.findOne({ where: { name: filters.category } });
    if (category) {
      where.categoryId = category.id;
    }
  }
  if (filters.motor) {
    where.motor = filters.motor;
  }
  if (filters.maxSpeed) {
    where.maxSpeed = { [Op.gte]: filters.maxSpeed };
  }
  if (filters.maxRange) {
    where.maxRange = { [Op.gte]: filters.maxRange };
  }
  if (filters.price) {
    const [minPrice, maxPrice] = filters.price.split('-').map(Number);
    where.price = { [Op.between]: [minPrice, maxPrice] };
  }

  const { count, rows } = await Scooter.findAndCountAll({
    where,
    offset,
    limit,
    order: [[sortBy || 'createdAt', order || 'DESC']],
    include: [
      { model: Category, as: 'category' },
      { model: SafetyInfo, as: 'safetyInfo' },
      { model: Discount, as: 'discount' },
    ],
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    scooters: rows,
  };
};

export const getScooterById = async (id: number): Promise<ScooterInstance> => {
  const scooter = await Scooter.findByPk(id, {
    include: [
      { model: Category, as: 'category' },
      { model: SafetyInfo, as: 'safetyInfo' },
      { model: Discount, as: 'discount' },
    ],
  });
  if (!scooter) {
    throw new Error('Scooter not found');
  }
  return scooter;
};
