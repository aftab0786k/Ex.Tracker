import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { expenseActions } from "../../store/expenseSlice";
import styles from './PremiumFeature.module.css';

const PremiumFeature = ()=>{
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const fetchHandler = async()=>{
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/expenses${email.replace(/[@.]/g, "")}.json`;
        try{
          const res = await fetch(url);
          if(!res.ok){
            throw new Error("Something went wrong while fetching expenses!");
          }
          const data = await res.json();
          const expenses = [];
          for(const key in data){
            expenses.push({
              id: key,
              category: data[key].category,
              description: data[key].description,
              price: data[key].price
            })
          }
          const totalAmount = expenses.reduce((current, item) => current + item.price, 0);
          dispatch(expenseActions.setItem({expenses, totalAmount}));
        }catch(error){
          console.log(error);
        }
      };
      useEffect(()=>{
        if(isLoggedIn){
          fetchHandler();
        }
      },[isLoggedIn]);

    const themeChangeHandler = ()=>{
        dispatch(uiActions.toggleTheme());
    }
    const handleDownloadExpenses = ()=>{
        dispatch(expenseActions.downloadExpenses());
    }
    return(
        <div className={styles.main}>
            <button onClick={themeChangeHandler}>Toggle Dark Mode</button>
            <button onClick={handleDownloadExpenses}>Download Expenses</button>
        </div>
    );
}

export default PremiumFeature;