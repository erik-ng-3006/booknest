import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
const PrivateRoute = ({ children }) => {
	const { currentUser, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<LoadingSpinner />
			</div>
		);
	}

	if (currentUser) {
		return children;
	}

	return <Navigate to='/login' />;
};

export default PrivateRoute;
