import revenueApi from '@/apis/revenue';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getRevenueToday = createAsyncThunk('revenue/getRevenueToday', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getRevenueToday();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getRevenueThisMonth = createAsyncThunk('revenue/getRevenueThisMonth', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getRevenueThisMonth();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const getDetailRevenueOfMonth = createAsyncThunk(
    'revenue/getDetailRevenueOfMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailRevenueOfMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getRevenueThisWeek = createAsyncThunk('revenue/getRevenueThisWeek', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getRevenueThisWeek();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getDetailRevenueThisWeek = createAsyncThunk(
    'revenue/getDetailRevenueThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailRevenueThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getToTalUser = createAsyncThunk('revenue/getToTalUser', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getToTalUser();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getToTalUserThisMonth = createAsyncThunk(
    'revenue/getToTalUserThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getToTalUserThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getUserRevenueThisWeek = createAsyncThunk(
    'revenue/getUserRevenueThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getUserRevenueThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getDetailTotalNewUserOfMonth = createAsyncThunk(
    'revenue/getDetailTotalNewUserOfMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalNewUserOfMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTop5UserThisMonth = createAsyncThunk('revenue/getTop5UserThisMonth', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getTop5UserThisMonth();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getTotalOrderToday = createAsyncThunk('revenue/getTotalOrderToday', async (_, { rejectWithValue }) => {
    try {
        const res = await revenueApi.getTotalOrderToday();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});
export const getTotalOrderThisWeek = createAsyncThunk(
    'revenue/getTotalOrderThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalOrderThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getTotalOrderThisMonth = createAsyncThunk(
    'revenue/getTotalOrderThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalOrderThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getDetailTotalOrderThisWeek = createAsyncThunk(
    'revenue/getDetailTotalOrderThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalOrderThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getDetailTotalOrderOfMonth = createAsyncThunk(
    'revenue/getDetailTotalOrderOfMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalOrderOfMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTotalProductSoldToday = createAsyncThunk(
    'revenue/getTotalProductSoldToday',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalProductSoldToday();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTotalProductSoldThisWeek = createAsyncThunk(
    'revenue/getTotalProductSoldThisWeek',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalProductSoldThisWeek();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const getTotalProductSoldThisMonth = createAsyncThunk(
    'revenue/getTotalProductSoldThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTotalProductSoldThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getTop5TotalProductSoldThisMonth = createAsyncThunk(
    'revenue/getTop5TotalProductSoldThisMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getTop5TotalProductSoldThisMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);
export const getDetailTotalProductSoldOfMonth = createAsyncThunk(
    'revenue/getDetailTotalProductSoldOfMonth',
    async (_, { rejectWithValue }) => {
        try {
            const res = await revenueApi.getDetailTotalProductSoldOfMonth();
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const userSlice = createSlice({
    name: 'revenue',
    initialState: {
        today: {},
        thisWeek: {},
        thisMonth: {},
        detailMonth: {},
        detailWeek: {},
        top5: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        //Revenue
        builder.addCase(getRevenueToday.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueToday.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getRevenueToday.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getRevenueThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getRevenueThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getDetailRevenueOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailRevenueOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailRevenueOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getRevenueThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getRevenueThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getDetailRevenueThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailRevenueThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailRevenueThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });

        //User
        builder.addCase(getToTalUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getToTalUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getToTalUser.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getToTalUserThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getToTalUserThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getToTalUserThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getUserRevenueThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserRevenueThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getUserRevenueThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getDetailTotalNewUserOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalNewUserOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalNewUserOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getTop5UserThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTop5UserThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTop5UserThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });

        //Orders
        builder.addCase(getTotalOrderToday.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalOrderToday.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalOrderToday.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getTotalOrderThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalOrderThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalOrderThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getTotalOrderThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalOrderThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalOrderThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getDetailTotalOrderThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalOrderThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalOrderThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getDetailTotalOrderOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalOrderOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalOrderOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });

        //Products
        builder.addCase(getTotalProductSoldToday.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalProductSoldToday.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalProductSoldToday.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getTotalProductSoldThisWeek.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalProductSoldThisWeek.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalProductSoldThisWeek.fulfilled, (state, action) => {
            state.loading = false;
            state.today = action.payload.data.data;
        });
        builder.addCase(getTotalProductSoldThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTotalProductSoldThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTotalProductSoldThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.thisMonth = action.payload.data.data;
        });
        builder.addCase(getDetailTotalProductSoldOfMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDetailTotalProductSoldOfMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getDetailTotalProductSoldOfMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
        builder.addCase(getTop5TotalProductSoldThisMonth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTop5TotalProductSoldThisMonth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getTop5TotalProductSoldThisMonth.fulfilled, (state, action) => {
            state.loading = false;
            state.detailMonth = action.payload.data.data;
        });
    },
});

export default userSlice.reducer;
