import { createSlice } from "@reduxjs/toolkit";

const initialState = { category: [] };

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload;
        },
        addCategory(state, action) {
            state.category.push(action.payload);
        },
        removeCategory(state, action){
            const element = state.category.find(item => item.id === action.payload);
            if(element){
                state.category = state.category.filter(item => item.id !== action.payload);
            }
        }
    }
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;