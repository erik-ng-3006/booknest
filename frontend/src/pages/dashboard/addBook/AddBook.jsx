import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import { toast } from 'react-toastify';

const AddBook = () => {
	const {
		register,
		handleSubmit,
		formState: { _errors },
		reset,
	} = useForm();
	const [_imageFile, setImageFile] = useState(null);
	const [AddBook, { isLoading }] = useAddBookMutation();
	const [imageFileName, setImageFileName] = useState('');
	const onSubmit = async (data) => {
		const newBookData = {
			...data,
			coverImage: imageFileName,
		};
		console.log(newBookData);

		try {
			await AddBook(newBookData).unwrap();
			toast.success('Book added successfully');
			reset();
			setImageFileName('');
			setImageFile(null);
		} catch (error) {
			console.error(error);
			toast.error('Failed to add book. Please try again.');
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setImageFileName(file.name);
		}
	};
	return (
		<div className='max-w-xl mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold text-gray-800 mb-4'>
				Add New Book
			</h2>

			{/* Form starts here */}
			<form onSubmit={handleSubmit(onSubmit)} className=''>
				{/* Reusable Input Field for Title */}
				<InputField
					label='Title'
					name='title'
					placeholder='Enter book title'
					register={register}
				/>

				{/* Reusable Textarea for Description */}
				<InputField
					label='Description'
					name='description'
					placeholder='Enter book description'
					type='textarea'
					register={register}
				/>

				{/* Reusable Select Field for Category */}
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

				{/* Old Price */}
				<InputField
					label='Old Price'
					name='oldPrice'
					type='number'
					placeholder='Old Price'
					register={register}
				/>

				{/* New Price */}
				<InputField
					label='New Price'
					name='newPrice'
					type='number'
					placeholder='New Price'
					register={register}
				/>

				{/* Cover Image Upload */}
				<div className='mb-4'>
					<label className='block text-sm font-semibold text-gray-700 mb-2'>
						Cover Image
					</label>
					<input
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						className='mb-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 p-2'
					/>
					{imageFileName && (
						<p className='text-sm text-gray-500'>
							Selected: {imageFileName}
						</p>
					)}
				</div>

				{/* Trending Checkbox */}
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

				{/* Submit Button */}
				<button
					type='submit'
					className='w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 hover:cursor-pointer'
				>
					{isLoading ? (
						<span>Adding... </span>
					) : (
						<span>Add Book</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default AddBook;
