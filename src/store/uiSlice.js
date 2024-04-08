import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkModeOn: localStorage.getItem("darkmode"),
    notification: null
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.isDarkModeOn = !state.isDarkModeOn;
            if(state.isDarkModeOn){
                localStorage.setItem("darkmode",state.isDarkModeOn);
            }else{
                localStorage.removeItem("darkmode");
            }
        },
        showNotification(state, action) {
            state.notification = {
              status: action.payload.status,
              title: action.payload.title,
              message: action.payload.message,
            };
        },
        removeNotification(state) {
            state.notification = null;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;