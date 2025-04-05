import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/getBaseUrl';

const baseQuery = fetchBaseQuery({
	baseUrl: `${getBaseUrl()}/api/books`,
	credentials: 'include',
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('token');
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});
export const booksApi = createApi({
	reducerPath: 'booksApi',
	baseQuery,
	tagTypes: ['Books'],
	endpoints: (builder) => ({
		getAllBooks: builder.query({
			query: () => '/',
			providesTags: ['Books'],
		}),
		getBookById: builder.query({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: 'Books', id }],
		}),
		addBook: builder.mutation({
			query: (book) => ({
				url: '/',
				method: 'POST',
				body: book,
			}),
			invalidatesTags: ['Books'],
		}),
		updateBook: builder.mutation({
			query: ({ id, ...book }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: book,
				headers: { 'Content-type': 'application/json' },
			}),
			invalidatesTags: ['Books'],
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Books'],
		}),
	}),
});

export const {
	useGetAllBooksQuery,
	useGetBookByIdQuery,
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = booksApi;

export default booksApi;
