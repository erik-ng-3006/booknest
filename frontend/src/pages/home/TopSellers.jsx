import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const categories = [
	'Choose a Genre',
	'Self-Help',
	'Fantasy',
	'Young Adult',
	'Romance',
	"Children's",
	'Thriller',
	'Science Fiction',
	'Mystery',
	'Fiction',
	'Literary Fiction',
	'Historical Fiction',
];

const TopSellers = () => {
	const [books, setBooks] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('Choose a Genre');

	useEffect(() => {
		fetch('books.json')
			.then((res) => res.json())
			.then((data) => setBooks(data));
	}, []);

	const filteredBooks =
		selectedCategory === 'Choose a Genre'
			? books
			: books.filter((book) => book.category === selectedCategory);

	return (
		<div className='py-10'>
			<h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
			{/* Category filter */}
			<div className='mb-8 flex items-center'>
				<select
					name='category'
					id='category'
					className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					{categories.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
			<Swiper
				spaceBetween={30}
				slidesPerView={1}
				breakpoints={{
					640: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 40,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1280: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				modules={[Pagination, Navigation]}
				className='mySwiper'
				navigation
			>
				{filteredBooks.map((book) => (
					<SwiperSlide>
						<BookCard key={book.id} book={book} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default TopSellers;
