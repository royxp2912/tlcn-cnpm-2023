import ordersApi from '@/apis/orders';
import { Order } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllOrder = createAsyncThunk('orders/getAllCategory', async (_, { rejectWithValue }) => {
    try {
        const res = await ordersApi.getAllOrder();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const getAllOrderByUserId = createAsyncThunk(
    'orders/getCategoryById',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await ordersApi.getAllOrderByUserId(userId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getAllOrderByOrderStatus = createAsyncThunk(
    'orders/getAllOrderByOrderStatus',
    async (status: string, { rejectWithValue }) => {
        try {
            const res = await ordersApi.getAllOrderByOrderStatus(status);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getOrderByOrderId = createAsyncThunk(
    'orders/getOrderByOrderId',
    async (orderId: string, { rejectWithValue }) => {
        try {
            const res = await ordersApi.getOrderByOrderId(orderId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (params: { userId: string; item: Order }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, item } = params;
            const res = await ordersApi.createOrder(item);
            await dispatch(getAllOrderByUserId(userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const updateOrderStatusByOrderId = createAsyncThunk(
    'orders/updateOrderStatusByOrderId',
    async (params: { userId: string; orderId: string; status: string }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, orderId, status } = params;
            const res = await ordersApi.updateOrderStatusByOrderId(orderId, status);
            await dispatch(getAllOrderByUserId(userId));
            await dispatch(getOrderByOrderId(orderId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const cancelOrderByOrderId = createAsyncThunk(
    'orders/cancelOrderByOrderId',
    async (params: { userId: string; orderId: string }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, orderId } = params;
            const res = await ordersApi.cancelOrderByOrderId(orderId);
            await dispatch(getAllOrderByUserId(userId));
            await dispatch(getOrderByOrderId(orderId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const comfirmPaymentOrderByOrderId = createAsyncThunk(
    'orders/comfirmPaymentOrderByOrderId',
    async (params: { userId: string; orderId: string }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, orderId } = params;
            const res = await ordersApi.comfirmPaymentOrderByOrderId(orderId);
            await dispatch(getAllOrderByUserId(userId));
            await dispatch(getOrderByOrderId(orderId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        order: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrderByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrderByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllOrderByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.data;
        });
        builder.addCase(getAllOrderByOrderStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrderByOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllOrderByOrderStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.data;
        });
        builder.addCase(getOrderByOrderId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOrderByOrderId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getOrderByOrderId.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload.data;
        });
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateOrderStatusByOrderId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateOrderStatusByOrderId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateOrderStatusByOrderId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(cancelOrderByOrderId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancelOrderByOrderId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(cancelOrderByOrderId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(comfirmPaymentOrderByOrderId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(comfirmPaymentOrderByOrderId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(comfirmPaymentOrderByOrderId.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default orderSlice.reducer;
