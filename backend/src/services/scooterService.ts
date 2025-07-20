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
  limit: number;
}

export const getScooters = async (params: GetScootersParams): Promise<GetScootersResult> => {
  const page = params.page ? parseInt(String(params.page), 10) : 1;
  const limit = params.limit ? parseInt(String(params.limit), 10) : 10;
  const { sortBy, order, ...filters } = params;
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
    limit: limit,
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

export const getScooterBrands = async (): Promise<string[]> => {
  const brands = await Scooter.findAll({
    attributes: ['brand'],
    group: ['brand'],
    order: [['brand', 'ASC']],
  });
  return brands.map((item: { brand: string }) => item.brand);
};
