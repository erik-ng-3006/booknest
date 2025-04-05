import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineUser } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RxAvatar } from 'react-icons/rx';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';

const navigation = [
	{
		name: 'Dashboard',
		href: '/dashboard',
	},
	{
		name: 'Orders',
		href: '/orders',
	},
	{
		name: 'About',
		href: '/about',
	},
	{
		name: 'Checkout',
		href: '/checkout',
	},
];
const Navbar = () => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const cartItems = useSelector((state) => state.cart.cartItems);

	const currentUser = false;
	return (
		<header className='max-w-screen-2xl mx-auto px-4 py-6 sticky top-0 z-50 bg-zinc-50 opacity-90'>
			<nav className='flex justify-between items-center'>
				{/* Left Side */}
				<div className='flex items-center md:gap-16 gap-4'>
					<Link to='/' className='flex items-center gap-2'>
						<img src={logo} alt='logo' className='w-20' />
					</Link>
					{/* Search Bar */}
					<div className='relative sm:w-72 w-40 space-x-2'>
						<IoSearchOutline className='absolute inline-block left-3 inset-y-2' />
						<input
							type='text'
							placeholder='Search Here'
							className='bg-[#EAEAEA] py-1 w-full px-8 rounded-md focus:outline-none'
						/>
					</div>
				</div>

				{/* Right Side */}
				<div className='relative flex items-center md:space-x-3 space-x-2 '>
					<div>
						{currentUser ? (
							<>
								<button
									type='button'
									className='p-1 hover:cursor-pointer'
									onClick={() =>
										setIsDropDownOpen(!isDropDownOpen)
									}
								>
									<RxAvatar className='size-7' />
								</button>
								{/* Dropdown */}
								{isDropDownOpen && (
									<div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
										<ul>
											{navigation.map((item) => (
												<li
													onClick={() =>
														setIsDropDownOpen(false)
													}
													key={item.name}
													className='blog px-4 py-2 text-sm hover:bg-gray-100'
												>
													<Link to={item.href}>
														{item.name}
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
							</>
						) : (
							<Link to='/login'>
								<HiOutlineUser className='size-6' />
							</Link>
						)}
					</div>
					<button className='hidden md:block'>
						<HiOutlineHeart className='size-6' />
					</button>
					<Link
						to='/cart'
						className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'
					>
						<HiOutlineShoppingCart className='size-6' />
						{cartItems.length > 0 ? (
							<span className='text-sm font-semibold sm:ml-1'>
								{cartItems.length}
							</span>
						) : (
							<span className='text-sm font-semibold sm:ml-1'>
								0
							</span>
						)}
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
