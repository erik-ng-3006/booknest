import React from 'react';

const StackedImages = ({ images }) => {
	return (
		<div className='relative w-[200px] h-[300px]'>
			{images.map((src, index) => (
				<img
					key={index}
					src={src}
					alt={`stacked-image-${index}`}
					className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 rounded-lg shadow-lg ${
						index === 0
							? 'z-30'
							: index === 1
							? 'z-20 left-30 top-4'
							: 'z-10 left-60 top-10'
					}`}
				/>
			))}
		</div>
	);
};

export default StackedImages;
