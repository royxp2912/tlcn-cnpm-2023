import cartsApi from '@/apis/carts';
import { ItemCart } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCartByUserId = createAsyncThunk(
    'carts/getCartByUserId',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await cartsApi.getCartByUserId(userId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const createCart = createAsyncThunk('carts/createCart', async (user: string, { rejectWithValue }) => {
    try {
        const res = await cartsApi.createCart(user);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const addItemToCartByUserId = createAsyncThunk(
    'carts/addItemToCartByUserId',
    async (params: { userId: string; item: ItemCart }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, item } = params;
            const res = await cartsApi.addItemToCartByUserId(userId, item);
            await dispatch(getCartByUserId(userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const removeItemFromCartByUserId = createAsyncThunk(
    'carts/removeItemFromCartByUserId',
    async (params: { userId: string; productId: string }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, productId } = params;
            const res = await cartsApi.removeItemFromCartByUserId(userId, productId);
            await dispatch(getCartByUserId(userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        cartItem: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(createCart.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addItemToCartByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addItemToCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(addItemToCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItem = action.payload.data;
        });
        builder.addCase(getCartByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItem = action.payload.data;
        });
        builder.addCase(removeItemFromCartByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeItemFromCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(removeItemFromCartByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItem = action.payload.data;
        });
    },
});

export default cartSlice.reducer;