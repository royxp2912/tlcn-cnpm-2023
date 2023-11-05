import productsApi from '@/apis/products';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllProduct = createAsyncThunk('products/getAllProduct', async (_, { rejectWithValue }) => {
    try {
        const res = await productsApi.getAllProduct();
        return res;
    } catch (err: any) {
        return rejectWithValue(err);
    }
});
export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (productId: string, { rejectWithValue }) => {
        try {
            const res = await productsApi.getProductById(productId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);
export const getAllProductByCateId = createAsyncThunk(
    'products/getAllProductByCateId',
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const res = await productsApi.getAllProductByCateId(categoryId);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const findProductByKeyword = createAsyncThunk(
    'products/findProductByKeyword',
    async (params: { keyword: string; sort: string }, { rejectWithValue }) => {
        try {
            const { keyword, sort } = params;
            const res = await productsApi.findProductByKeyword(keyword, sort);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const findProductByColor = createAsyncThunk(
    'products/findProductByColor',
    async (params: { color: string; sort: string }, { rejectWithValue }) => {
        try {
            const { color, sort } = params;
            const res = await productsApi.findProductByKeyword(color, sort);
            return res;
        } catch (err: any) {
            return rejectWithValue(err);
        }
    },
);

export const getProductHotDeal = createAsyncThunk('products/getProductHotDeal', async (_, { rejectWithValue }) => {
    try {
        const res = await productsApi.getProductHotDeal();
        return res;
    } catch (err: any) {
        return rejectWithValue(err);
    }
});

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productHots: [],
        productDetail: {},
        variants: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data.data;
        });
        builder.addCase(getProductById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.productDetail = action.payload.data.data.product;
            state.variants = action.payload.data.data.variants;
        });
        builder.addCase(getAllProductByCateId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProductByCateId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getAllProductByCateId.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
        });
        builder.addCase(findProductByKeyword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(findProductByKeyword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(findProductByKeyword.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
        });
        builder.addCase(findProductByColor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(findProductByColor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(findProductByColor.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.data;
        });

        builder.addCase(getProductHotDeal.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductHotDeal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getProductHotDeal.fulfilled, (state, action) => {
            state.loading = false;
            state.productHots = action.payload.data.data;
        });
    },
});

export default productSlice.reducer;
