export interface Category {
  id: number;
  name: string;
}

export interface SafetyInfo {
  id: number;
  scooterId: number;
  info: string;
}

export interface Discount {
  id: number;
  scooterId: number;
  percentage: number;
  startDate: string;
  endDate: string;
}

export interface Scooter {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  motor_type: string;
  max_speed: number;
  max_range: number;
  weight: number;
  description: string;
  imageUrl: string;
  stock: number;
  categoryId: number;
  category: Category;
  safetyInfo?: SafetyInfo;
  discount?: Discount;
}
