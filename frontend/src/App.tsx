import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
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
			// Add other routes here, e.g., about, contact, cart
		],
	},
]);

const App: React.FC = () => {
	return <RouterProvider router={router} />;
};

export default App;
