import authApi from '@/apis/auth';
import { SignIn, SignUp } from '@/types/type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk('auth/signIn', async (user: SignIn, { rejectWithValue }) => {
    try {
        const res = await authApi.signIn(user);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const signUp = createAsyncThunk('auth/signUp', async (user: SignUp, { rejectWithValue }) => {
    try {
        const res = await authApi.signUp(user);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const sendCode = createAsyncThunk('auth/sendCode', async (email: string, { rejectWithValue }) => {
    try {
        const res = await authApi.sendCode(email);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
    try {
        const res = await authApi.refreshToken();
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const logout = createAsyncThunk('auth/logout', async (userId: string, { rejectWithValue }) => {
    try {
        const res = await authApi.logout(userId);
        return res;
    } catch (err: any) {
        return rejectWithValue(err.res.data);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        accessToken: '',
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            localStorage.setItem('token', action.payload.data.accessToken);
        });
        builder.addCase(signUp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(sendCode.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendCode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(sendCode.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(refreshToken.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.removeItem('token');
        });
    },
});

export default authSlice.reducer;
