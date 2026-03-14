import {apiSlice} from './apiSlice'
import { ORDERS_URL, VNPAY_URL } from '../constants'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order
            })
        }),

        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`
            })
        }),

        createVnpayUrl: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/vnpay-url`,
                method: "GET",
            }),
        }),

        verifyVnpayReturn: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/vnpay-return?${data.queryString}`,
                method: "PUT",
            }),
        }),

        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`
            }),
            keepUnusedDataFor: 5
        }),

        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL
            })
        }),

        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT'
            })
        }),

        getTotalOrders: builder.query({
            query: () => `${ORDERS_URL}/total-orders`
        }),

        getTotalSales: builder.query({
            query: () => `${ORDERS_URL}/total-sales`
        }),

        getTotalSalesByDate: builder.query({
            query: () => `${ORDERS_URL}/total-sales-by-date`
        })
        
    })
})

export const {
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    // -------------------
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useCreateVnpayUrlMutation,
    useVerifyVnpayReturnMutation,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
    useGetOrdersQuery
} = orderApiSlice