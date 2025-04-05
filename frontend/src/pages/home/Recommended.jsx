import React from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useGetAllBooksQuery } from '../../redux/features/books/booksApi';
const Recommended = () => {
	const { data: books = [] } = useGetAllBooksQuery();

	return (
		<div className='py-10'>
			<h2 className='text-3xl font-semibold mb-6'>Recommended for You</h2>
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
				{books.slice(8, 18).map((book) => (
					<SwiperSlide>
						<BookCard key={book.id} book={book} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Recommended;
