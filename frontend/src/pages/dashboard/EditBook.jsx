import React, { useEffect } from 'react';
import InputField from './addBook/InputField';
import SelectField from './addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../../utils/getBaseUrl';
import { useGetBookByIdQuery } from '../../redux/features/books/booksApi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const EditBook = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: bookData,
		isLoading,
		isError,
		refetch,
	} = useGetBookByIdQuery(id);

	const { register, handleSubmit, setValue, _reset } = useForm();

	useEffect(() => {
		if (bookData) {
			setValue('title', bookData.title);
			setValue('description', bookData.description);
			setValue('category', bookData?.category);
			setValue('trending', bookData.trending);
			setValue('oldPrice', bookData.oldPrice);
			setValue('newPrice', bookData.newPrice);
			setValue('coverImage', bookData.coverImage);
		}
	}, [bookData, setValue]);

	const onSubmit = async (data) => {
		const updateBookData = {
			title: data.title,
			description: data.description,
			category: data.category,
			trending: data.trending,
			oldPrice: Number(data.oldPrice),
			newPrice: Number(data.newPrice),
			coverImage: data.coverImage || bookData.coverImage,
		};
		try {
			await axios.put(`${getBaseUrl()}/api/books/${id}`, updateBookData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			toast.success('Book updated successfully');
			navigate('/dashboard/manage-books');
			await refetch();
		} catch (error) {
			console.log(error);
			toast.error('Failed to update book. Please try again.');
		}
	};

	if (isLoading)
		return (
			<div className='flex justify-center items-center h-[calc(100vh-300px)]'>
				<LoadingSpinner />
			</div>
		);

	if (isError) return <div>Error fetching book data</div>;
	return (
		<div className='max-w-xl mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold text-gray-800 mb-4'>
				Update Book
			</h2>

			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label='Title'
					name='title'
					placeholder='Enter book title'
					register={register}
				/>

				<InputField
					label='Description'
					name='description'
					placeholder='Enter book description'
					type='textarea'
					register={register}
				/>

				<SelectField
					label='Category'
					name='category'
					options={[
						{ value: '', label: 'Choose A Category' },
						{ value: 'self-help', label: 'Self-Help' },
						{ value: 'fantasy', label: 'Fantasy' },
						{ value: 'young adult', label: 'Young Adult' },
						{ value: 'romance', label: 'Romance' },
						{ value: "children's", label: "Children's" },
						{ value: 'thriller', label: 'Thriller' },
						{ value: 'science fiction', label: 'Science Fiction' },
						{ value: 'mystery', label: 'Mystery' },
						{ value: 'fiction', label: 'Fiction' },
						{
							value: 'literary fiction',
							label: 'Literary Fiction',
						},
						{
							value: 'historical fiction',
							label: 'Historical Fiction',
						},
					]}
					register={register}
				/>
				<div className='mb-4'>
					<label className='inline-flex items-center'>
						<input
							type='checkbox'
							{...register('trending')}
							className='rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500'
						/>
						<span className='ml-2 text-sm font-semibold text-gray-700'>
							Trending
						</span>
					</label>
				</div>

				<InputField
					label='Old Price'
					name='oldPrice'
					type='float'
					placeholder='Old Price'
					register={register}
				/>

				<InputField
					label='New Price'
					name='newPrice'
					type='float'
					placeholder='New Price'
					register={register}
				/>

				<InputField
					label='Cover Image URL'
					name='coverImage'
					type='text'
					placeholder='Cover Image URL'
					register={register}
				/>

				<button
					type='submit'
					className='w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 hover:cursor-pointer'
				>
					Update Book
				</button>
			</form>
		</div>
	);
};

export default EditBook;
