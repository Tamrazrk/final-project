import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { errorMessage } from "../../utils/helpers";
import { toast } from "react-toastify";


const initialState = {
    products: [],
    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
    isError: false,
    isLoading: false,
}

export const createProduct = createAsyncThunk("products/create", async (product, thunkAPI) => {
    try {
        return await productService.createProduct(product);
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
});

export const getProducts = createAsyncThunk("products/get", async (params, thunkAPI) => {
    try {
        return await productService.getProducts(params);
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
})

export const updateProduct = createAsyncThunk("products/update", async (data, thunkAPI) => {
    try {
        return await productService.updateProduct(data);
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteProduct = createAsyncThunk("products/delete", async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
    } catch(error) {
        const message = errorMessage(error);

        return thunkAPI.rejectWithValue(message);
    }
})


export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.products = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products.push(action.payload);
            toast.success("Product created");
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.totalProducts = action.payload.totalProducts;
            state.isLoading = false;  
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
        .addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success("Product updated successfully");
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            const id = action.payload;
            state.products = state.products.filter((i) => i._id !== id);
            toast.success("Successfully deleted");
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            toast.error(action.payload);
        });
    }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;