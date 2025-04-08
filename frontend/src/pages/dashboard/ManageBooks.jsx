import React from 'react';
import {
	useDeleteBookMutation,
	useGetAllBooksQuery,
} from '../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { RiEditFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

const ManageBooks = () => {
	const { data: books, refetch } = useGetAllBooksQuery();

	const [deleteBook] = useDeleteBookMutation();

	const handleDeleteBook = async (id) => {
		try {
			const shouldDelete = window.confirm(
				'Are you sure you want to delete this book?'
			);

			if (!shouldDelete) {
				return;
			}

			await deleteBook(id).unwrap();
			toast.success('Book deleted successfully!');
			refetch();
		} catch (error) {
			console.error('Failed to delete book:', error.message);
			toast.error('Failed to delete book. Please try again.');
		}
	};

	return (
		<section>
			<div className='w-full mb-12 xl:mb-0 px-4 mx-auto'>
				<div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded '>
					<div className='rounded-t mb-0 px-4 py-3 border-0'>
						<div className='flex flex-wrap items-center'>
							<div className='relative w-full px-4 max-w-full flex-grow flex-1'>
								<h3 className='font-semibold text-base text-gray-700'>
									All Books
								</h3>
							</div>
							<div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
								<button
									className='bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
									type='button'
								>
									See all
								</button>
							</div>
						</div>
					</div>

					<div className='block w-full overflow-x-auto'>
						<table className='items-center bg-transparent w-full border-collapse '>
							<thead>
								<tr>
									<th className='px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
										#
									</th>
									<th className='px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
										Book Title
									</th>
									<th className='px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
										Category
									</th>
									<th className='px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
										Old Price
									</th>
									<th className='px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
										Price
									</th>
									<th className='px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
										On Trending
									</th>
									<th className='px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
										Actions
									</th>
								</tr>
							</thead>

							<tbody>
								{books &&
									books.map((book, index) => (
										<tr key={index}>
											<th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-gray-700 '>
												{index + 1}
											</th>
											<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 '>
												{book.title}
											</td>
											<td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
												{book.category}
											</td>
											<td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
												${book.oldPrice}
											</td>
											<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
												${book.newPrice}
											</td>
											<td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
												{book.trending ? (
													<span className='text-green-500'>
														Yes
													</span>
												) : (
													<span className='text-red-500'>
														No
													</span>
												)}
											</td>
											<td className='border-t-0 px-6 border-l-0 border-r-0 text-sm whitespace-nowrap p-4 space-x-4 flex items-center justify-start'>
												<Link
													to={`/dashboard/edit-book/${book._id}`}
													className='text-indigo-600 hover:text-indigo-700 mr-2 hover:cursor-pointer'
												>
													<RiEditFill className='size-5' />
												</Link>
												<button
													onClick={() =>
														handleDeleteBook(
															book._id
														)
													}
													className='text-red-600 hover:text-red-700 mr-2 hover:cursor-pointer'
												>
													<FaTrash className='size-5' />
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ManageBooks;
