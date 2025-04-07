import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../utils/getBaseUrl';

const AdminLogin = () => {
	const [message, setMessage] = useState('');
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				`${getBaseUrl()}/api/auth/admin`,
				data,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status === 200) {
				localStorage.setItem('token', response.data.token);
				setTimeout(() => {
					localStorage.removeItem('token');
					toast.error('Session Expired, Please login again');
				}, 3600 * 1000);
				navigate('/dashboard');
				toast.success('Login successful');
			}
		} catch (error) {
			setMessage(error.response.data.message);
			console.log(error);
			if (error.response.status === 401) {
				toast.error('Invalid credentials');
			}
		}
	};
	return (
		<div className='h-[calc(100vh-120px)] flex items-center justify-center'>
			<div className='w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<h2 className='text-xl font-semibold mb-4'>Admin Login</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='username'
						>
							Username
						</label>
						<input
							{...register('username', { required: true })}
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='username'
							type='text'
							placeholder='Username'
						/>
					</div>
					<div className='mb-6'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'
						>
							Password
						</label>
						<input
							{...register('password', { required: true })}
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							type='password'
							placeholder='Password'
						/>
					</div>
					{message && (
						<p className='text-red-500 text-xs italic mb-3'>
							{message}
						</p>
					)}

					<div>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:cursor-pointer'
							type='submit'
						>
							Login
						</button>
					</div>
				</form>
				<p className='mt-5 text-center text-gray-500 text-xs'>
					&copy; {new Date().getFullYear()} Booknest. All rights
					reserved.
				</p>
			</div>
		</div>
	);
};

export default AdminLogin;
