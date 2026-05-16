import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    products: [],
    checked: [],
    priceFilter: "",
    minPriceFilter: "",
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setChecked: (state, action) => {
            state.checked = action.payload
        },
        setRadio: (state, action) => {
            state.radio = action.payload
        },
        setPriceFilter: (state, action) => {
            state.priceFilter = action.payload;
        },
        setMinPriceFilter: (state, action) => {
            state.minPriceFilter = action.payload;
        },
    }
})

export const { setCategories, setProducts, setChecked, setRadio } = shopSlice.actions
export default shopSlice.reducer;