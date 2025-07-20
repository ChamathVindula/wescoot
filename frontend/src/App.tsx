import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import MainLayout from './layouts/MainLayout';
import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <ProductListPage />,
			},
			{
				path: 'scooters',
				element: <ProductListPage />,
			},
			{
				path: 'scooters/:id',
				element: <ProductDetailsPage />,
			},
		],
	},
]);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
