import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { PaymentFormData } from '../features/payment/paymentTypes';
import { CreditCard, Lock } from 'lucide-react';

const paymentSchema = z.object({
  cardNumber: z.string()
    .min(13, 'Card number must be at least 13 digits')
    .max(19, 'Card number must be at most 19 digits')
    .regex(/^\d+$/, 'Card number must contain only digits'),
  expiryMonth: z.string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Month must be between 01 and 12'),
  expiryYear: z.string()
    .regex(/^\d{4}$/, 'Year must be 4 digits')
    .refine((year) => parseInt(year) >= new Date().getFullYear(), 'Year cannot be in the past'),
  cvc: z.string()
    .min(3, 'CVC must be at least 3 digits')
    .max(4, 'CVC must be at most 4 digits')
    .regex(/^\d+$/, 'CVC must contain only digits'),
  cardholderName: z.string().min(2, 'Cardholder name must be at least 2 characters'),
});

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isProcessing?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isProcessing = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const cardNumber = watch('cardNumber');

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <CreditCard className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Payment Information</h2>
        <Lock className="w-4 h-4 text-green-600 ml-auto" />
      </div>

      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Test Card Numbers</h3>
        <p className="text-sm text-blue-700">
          • <strong>4242424242424242</strong> - Success<br/>
          • <strong>4000000000000002</strong> - Declined
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            id="cardholderName"
            type="text"
            {...register('cardholderName')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
          {errors.cardholderName && <p className="mt-1 text-sm text-red-600">{errors.cardholderName.message}</p>}
        </div>

        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            {...register('cardNumber')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            onChange={(e) => {
              e.target.value = formatCardNumber(e.target.value);
            }}
          />
          {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700">
              Month
            </label>
            <select
              id="expiryMonth"
              {...register('expiryMonth')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, i) => {
                const month = (i + 1).toString().padStart(2, '0');
                return <option key={month} value={month}>{month}</option>;
              })}
            </select>
            {errors.expiryMonth && <p className="mt-1 text-sm text-red-600">{errors.expiryMonth.message}</p>}
          </div>

          <div>
            <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <select
              id="expiryYear"
              {...register('expiryYear')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">YYYY</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = (new Date().getFullYear() + i).toString();
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
            {errors.expiryYear && <p className="mt-1 text-sm text-red-600">{errors.expiryYear.message}</p>}
          </div>

          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              {...register('cvc')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="123"
              maxLength={4}
            />
            {errors.cvc && <p className="mt-1 text-sm text-red-600">{errors.cvc.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </div>
          ) : (
            'Complete Payment'
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;