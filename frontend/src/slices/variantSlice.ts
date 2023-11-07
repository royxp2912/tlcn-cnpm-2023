import variantsApi from '@/apis/variants';
import { User, getSizeOfColor, upAvatar, updatePassword } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getColorOfSize = createAsyncThunk(
    'variants/getColorOfSize',
    async (item: getSizeOfColor, { rejectWithValue }) => {
        try {
            const res = await variantsApi.getColorOfSize(item);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const variantSlice = createSlice({
    name: 'variants',
    initialState: {
        variant: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getColorOfSize.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getColorOfSize.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getColorOfSize.fulfilled, (state, action) => {
            state.loading = false;
            state.variant = action.payload.data.data;
        });
    },
});

export default variantSlice.reducer;
