import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutUsPage from './pages/AboutUsPage';
import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'products', element: <ProductListPage /> },
			{ path: 'scooters/:id', element: <ProductDetailsPage /> },
			{ path: 'cart', element: <CartPage /> },
			{ path: 'checkout', element: <CheckoutPage /> },
			{ path: 'order-confirmation', element: <OrderConfirmationPage /> },
			{ path: 'about', element: <AboutUsPage /> },
		],
	},
]);

const App: React.FC = () => {
	return <RouterProvider router={router} />;
};

export default App;
