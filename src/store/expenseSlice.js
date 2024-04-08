import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalAmount: 0 };

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload);
            state.totalAmount += action.payload.price;
        },
        editItem(state, action) {
            const elementIndex = state.items.findIndex(item => item.id === action.payload.id);
            if(elementIndex !== -1){
                const oldPrice = state.items[elementIndex].price;
                state.items[elementIndex] = {...action.payload.data, id: action.payload.id};
                // state.items = state.items.map((item)=> item.id === action.payload.id ? {...action.payload.data, id: action.payload.id} : item);
                state.totalAmount = state.totalAmount - oldPrice + action.payload.data.price;
            }
        },
        removeItem(state, action) {
            const element = state.items.find(item => item.id === action.payload);
            if(element){
                state.items = state.items.filter((item)=>item.id !== action.payload);
                state.totalAmount -= element.price;
            }
            // state.items.splice(action.payload,1);
        },
        setItem(state, action) {
            state.items = action.payload.expenses;
            state.totalAmount = action.payload.totalAmount;
        },
        downloadExpenses(state) {
            // Logic to download expenses as CSV
            let csvContent = "Expense ID,Category,Description,Price\n";
            state.items.forEach((expense) => {
              csvContent += `${expense.id},${expense.category},${expense.description},${expense.price}\n`;
            });
      
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
      
            const a = document.createElement('a');
            a.href = url;
            a.download = 'expenses.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
    }
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;