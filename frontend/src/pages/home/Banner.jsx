import React from 'react';
import StackedImages from './StackedImages';
import book1 from '../../assets/books/welcome-to-the-hyunam-dong-bookshop.jpg';
import book2 from '../../assets/books/the-wedding-people.jpg';
import book3 from '../../assets/books/wandering-stars.jpg';

const images = [book1, book2, book3];
const Banner = () => {
	return (
		<div className='flex flex-col md:flex-row py-16 items-center justify-between gap-12'>
			<div className='md:w-1/2 w-full'>
				<h1 className='md:text-5xl text-2xl font-medium mb-7'>
					Recently Releases
				</h1>
				<p className='mb-10'>
					It's time to update your reading list with some of the
					latest and greatest releases in the literary world. From
					heart-pumping thrillers to captivating memoirs and inspiring
					self-help books, there's something for everyone.
				</p>
				<button className='btn-primary'>Subscribe</button>
			</div>

			<div className='md:w-1/2 w-full md:flex lg:justify-center'>
				<StackedImages images={images} />
			</div>
		</div>
	);
};

export default Banner;
