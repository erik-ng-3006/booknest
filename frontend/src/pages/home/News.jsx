import React from 'react';
import { Link } from 'react-router-dom';

import news1 from '../../assets/news/news1.jpeg';
import news2 from '../../assets/news/news2.jpeg';
import news3 from '../../assets/news/news3.jpeg';
import news4 from '../../assets/news/news4.png';
import news5 from '../../assets/news/news5.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const news = [
	{
		id: 1,
		title: 'NASA Successfully Lands First Humans on Mars',
		description:
			'NASA has successfully landed the first group of astronauts on Mars, marking a historic milestone in space exploration and paving the way for future colonization efforts.',
		image: news1,
	},
	{
		id: 2,
		title: 'Breakthrough in Cancer Treatment Shows Promising Results',
		description:
			'Scientists have announced a groundbreaking new treatment for cancer, with clinical trials showing unprecedented success in eliminating tumors without severe side effects.',
		image: news2,
	},
	{
		id: 3,
		title: 'AI-Powered Robots Now Assist in Daily Household Tasks',
		description:
			'A major tech company has launched AI-powered home robots that can cook, clean, and even engage in basic conversations, revolutionizing home automation.',
		image: news3,
	},
	{
		id: 4,
		title: 'Global Agreement Reached to Combat Climate Change',
		description:
			'World leaders have signed a new international agreement committing to aggressive carbon reduction goals and increased investment in renewable energy.',
		image: news4,
	},
	{
		id: 5,
		title: 'Self-Driving Cars Become Mainstream in Major Cities',
		description:
			'Several major cities have officially approved self-driving cars for public transportation, leading to a shift in urban mobility and a reduction in traffic accidents.',
		image: news5,
	},
];

const News = () => {
	return (
		<div className='py-16'>
			<h2 className='text-3xl font-semibold mb-6'>News </h2>
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
				}}
				modules={[Navigation]}
				className='mySwiper'
				navigation
			>
				{news.map((item, index) => (
					<SwiperSlide key={index}>
						<div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
							<div className='py-4'>
								<Link to='/'>
									<h3 className='text-lg font-medium hover:text-lime-600 mb-4'>
										{item.title}
									</h3>
								</Link>
								<div className='w-10 h-[4px] bg-primary mb-5'></div>
								<p className='text-gray-600 text-sm'>
									{item.description}
								</p>
							</div>
							<div className='flex-shrink-0'>
								<img
									src={item.image}
									alt='news image'
									className='w-full object-cover'
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default News;
