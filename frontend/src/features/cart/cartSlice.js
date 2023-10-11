import { createSlice } from "@reduxjs/toolkit"
import { getIndex, isInCart } from "../../utils/helpers";

const initialState = {
    products: [],
    cost: 0,
    count: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => {
            state.products = [];
            state.cost = 0;
            state.count = 0;
        },
        add: (state, action) => {
            const product = action.payload;
            const arr = state.products;

            if (isInCart(arr, product)) {
                const index = getIndex(arr, product);
                state.products[index].cnt++;
            } else {
                state.products.push({ product, cnt: 1 });
            }


            state.cost += product.price;
            state.count += 1;
        },
        remove: (state, action) => {
            const id = action.payload;
            const arr = state.products;
            for(let i=0; i<arr.length; i++) {
                const item = arr[i];
                if (item.product._id === id) {
                    if (item.cnt === 1) {
                        
                        arr.splice(i, 1);
                    } else {
                        arr[i].cnt--;
                    }
                    state.cost -= item.product.price;
                }
            }

            state.count--;
        }
    }
});

export const { add, remove, reset } = cartSlice.actions;
export default cartSlice.reducer;