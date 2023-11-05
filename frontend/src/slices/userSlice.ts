import usersApi from '@/apis/users';
import { Password, User } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type Params = {
    userId: string;
    password: Password;
};

export const getUser = createAsyncThunk('users/getUser', async (userId: string, { rejectWithValue }) => {
    try {
        const res = await usersApi.getUser(userId);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (params: { userId: string; user: User }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, user } = params;
            const res = await usersApi.updateUser(userId, user);
            await dispatch(getUser(userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const uploadAvatar = createAsyncThunk(
    'users/uploadAvatar',
    async (params: { userId: string; img: string }, { dispatch, rejectWithValue }) => {
        try {
            const { userId, img } = params;
            const res = await usersApi.uploadAvatar(userId, img);
            await dispatch(getUser(userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const updateUserPasswordByUserId = createAsyncThunk(
    'users/updateUserPasswordByUserId',
    async ({ userId, password }: { userId: string; password: Password }, { rejectWithValue }) => {
        try {
            const res = await usersApi.updateUserPasswordByUserId(userId, password);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.res.data);
        }
    },
);

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: {},
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(uploadAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadAvatar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateUserPasswordByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserPasswordByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(updateUserPasswordByUserId.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});

export default userSlice.reducer;
