import { errorMessage } from "../../utils/helpers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
});

export const updateUser = createAsyncThunk('auth/update', async (user, thunkAPI) => {
    try {
        return await authService.updateUser(user);
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
});

export const getProfile = createAsyncThunk('auth/profile/get', async (_, thunkAPI) => {
    try {
        return await authService.getProfile();
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
        logout: (state) => {
            localStorage.removeItem("user");
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.user = null;
            state.message = '';
        },
        spend: (state, action) => {
            state.user.balance -= action.payload; 
        },
        setUser: (state, action) => {
            console.log("setUser");
            state.user =  {...state.user, ...action.payload};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.user = null;
            state.message = action.payload;
            toast.error(action.payload.resonse?.data.message);
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if (action.payload)
                toast.success("Successfully registered");
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const token = JSON.parse(localStorage.getItem("user")).token;
            state.user = {token: token, ...action.payload };
            localStorage.setItem("user", JSON.stringify({token: token, ...action.payload }));
            state.isError = false;
            toast.success("Successfuly updated");

        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload.message;
            toast.error("Error occured while updating");
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
});

export const { reset, logout, spend, setUser } = authSlice.actions;
export default authSlice.reducer;