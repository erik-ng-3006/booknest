import React from 'react';
import { href, Link } from 'react-router-dom';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineUser } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RxAvatar } from 'react-icons/rx';
import { useState } from 'react';

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
	const currentUser = true;
	return (
		<header className='max-screen-2xl mx-auto px-4 py-6 '>
			<nav className='flex justify-between items-center'>
				{/* Left Side */}
				<div className='flex items-center md:gap-16 gap-4'>
					<Link to='/'>
						<HiMiniBars3CenterLeft className='size-6 ' />
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
						<span>0</span>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
