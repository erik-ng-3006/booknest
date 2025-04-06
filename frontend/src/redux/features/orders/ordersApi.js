import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/getBaseUrl';

const baseQuery = fetchBaseQuery({
	baseUrl: `${getBaseUrl()}/api/orders`,
	credentials: 'include',
});

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery,
	tagTypes: ['Orders'],
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: '/create',
				method: 'POST',
				body: order,
			}),
			invalidatesTags: ['Orders'],
		}),
		findAllOrders: builder.query({
			query: () => '/',
			providesTags: ['Orders'],
		}),
		findOrderById: builder.query({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: 'Orders', id }],
		}),
		updateOrder: builder.mutation({
			query: ({ id, ...order }) => ({
				url: `/${id}`,
				method: 'PUT',
				body: order,
				headers: { 'Content-type': 'application/json' },
			}),
			invalidatesTags: ['Orders'],
		}),
		findOrdersByEmail: builder.query({
			query: (email) => ({
				url: `/email/${email}`,
				method: 'GET',
			}),
			providesTags: ['Orders'],
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useFindAllOrdersQuery,
	useFindOrderByIdQuery,
	useUpdateOrderMutation,
	useDeleteOrderByIdMutation,
	useFindOrdersByEmailQuery,
} = ordersApi;

export default ordersApi;
