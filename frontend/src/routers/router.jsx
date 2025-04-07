import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import CartPage from '../pages/books/CartPage';
import CheckoutPage from '../pages/books/CheckoutPage';
import BookDetails from '../pages/books/BookDetails';
import PrivateRoute from './PrivateRoute';
import OrderPage from '../pages/orders/OrderPage';
import AdminRoute from './AdminRoute';
import AdminLogin from '../components/AdminLogin';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Dashboard from '../pages/dashboard/DashBoard';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/orders',
				element: (
					<PrivateRoute>
						<OrderPage />
					</PrivateRoute>
				),
			},
			{
				path: '/about',
				element: <h1>About</h1>,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/cart',
				element: <CartPage />,
			},
			{
				path: '/checkout',
				element: (
					<PrivateRoute>
						<CheckoutPage />
					</PrivateRoute>
				),
			},
			{
				path: `/books/:id`,
				element: <BookDetails />,
			},
		],
	},
	{
		path: '/dashboard',
		element: (
			<AdminRoute>
				<DashboardLayout />
			</AdminRoute>
		),
		children: [
			{
				path: '',
				element: (
					<AdminRoute>
						<Dashboard />
					</AdminRoute>
				),
			},
			{
				path: 'create-book',
				element: (
					<AdminRoute>
						<h1>Create Book</h1>
					</AdminRoute>
				),
			},
			{
				path: 'edit-book/:id',
				element: (
					<AdminRoute>
						<h1>Edit Book</h1>
					</AdminRoute>
				),
			},
			{
				path: 'manage-books',
				element: (
					<AdminRoute>
						<h1>Manage Book</h1>
					</AdminRoute>
				),
			},
		],
	},
	{
		path: '/admin',
		element: <AdminLogin />,
	},
]);

export default router;
