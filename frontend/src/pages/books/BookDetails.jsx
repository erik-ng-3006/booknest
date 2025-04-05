import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useGetBookByIdQuery } from '../../redux/features/books/booksApi';

const BookDetails = () => {
	const { id } = useParams();
	const { data: book, isLoading, isError } = useGetBookByIdQuery(id);

	const dispatch = useDispatch();

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error loading book</div>;
	return (
		<section className='flex justify-center'>
			<div className='max-w-4xl shadow-md p-5'>
				<h1 className='text-2xl font-bold mb-6'>{book.title}</h1>

				<div className='flex justify-between items-start gap-10'>
					<div className='mb-5 max-w-[40%]'>
						<img
							src={`${getImageUrl(book.coverImage)}`}
							alt={book.title}
							className='mb-8'
						/>
					</div>

					<div className='mb-5'>
						<p className='text-gray-700 mb-2'>
							<strong>Author:</strong> {book.author || 'admin'}
						</p>
						<p className='text-gray-700 mb-4'>
							<strong>Published:</strong>{' '}
							{new Date(book?.createdAt).toLocaleDateString()}
						</p>
						<p className='text-gray-700 mb-4 capitalize'>
							<strong>Category:</strong> {book?.category}
						</p>
						<p className='text-gray-700 mb-4'>
							<strong>Description:</strong> {book.description}
						</p>
						<p className='text-gray-700'>
							<strong>Price:</strong> ${book.newPrice}
						</p>
					</div>
				</div>
				<button
					onClick={() => handleAddToCart(book)}
					className='btn-primary px-6 space-x-1 flex items-center gap-1 ml-auto'
				>
					<FiShoppingCart className='' />
					<span>Add to Cart</span>
				</button>
			</div>
		</section>
	);
};

export default BookDetails;
