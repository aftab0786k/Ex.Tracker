import React, { useContext, useState, useEffect } from "react";
import AuthContext from "./auth-context";

const ExpenseContext = React.createContext({
    items: [],
    addItem: (item) => {},
    editItem: (item, id)=>{},
    removeItem: (id)=>{}
});

export const ExpenseContextProvider = (props)=>{
    const [items, setItems] = useState([]);
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const fetchHandler = async()=>{
    const email = authCtx.email.replace(/[@.]/g, "");
    const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/expenses${email}.json`;
    try{
      const res = await fetch(url);
      if(!res.ok){
        throw new Error("Something went wrong while fetching expenses!");
      }
      const data = await res.json();
      const loadedExpenses = [];
      for(const key in data){
        loadedExpenses.push({
          id: key,
          category: data[key].category,
          description: data[key].description,
          price: data[key].price
        })
      }
      setItems(loadedExpenses);
    }catch(error){
      console.log(error);
    }
  };
  useEffect(()=>{
    if(isLoggedIn){
      fetchHandler();
    }
  },[isLoggedIn]);

    const addItemHandler = async(item)=>{
        const email = authCtx.email.replace(/[@.]/g, "");
        const url = `https://expense-track-ddb59-default-rtdb.firebaseio.com/expenses${email}.json`;
        try{
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!res.ok){
                throw new Error("Something went wrong while storing expenses!");
            }
            const resdata = await res.json();
            // console.log(resdata); 
            setItems((prevItems)=>{
                return [...prevItems, {...item, id: resdata.name}]
            });   
        }catch(error){
            console.log(error);
        }
    }
    const editItemHandler = async(item, id)=>{
        const email = authCtx.email.replace(/[@.]/g, "");
        const url = `https://expense-track-ddb59-default-rtdb.firebaseio.com/expenses${email}/${id}.json`;
        try{
            const res = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!res.ok){
                throw new Error("Something went wrong while updating expenses!!");
            }
            const resData = await res.json();
            setItems((prevItems)=>{
                return prevItems.map((itemData)=> itemData.id === id ? {...resData, id: id} : itemData);
            })
        }catch(error){
            console.log(error);
        }
    }
    const removeItemHandler = async(id)=>{
        const email = authCtx.email.replace(/[@.]/g, "");
        const url = `https://expense-track-ddb59-default-rtdb.firebaseio.com/expenses${email}/${id}.json`;
        try{
            const res = await fetch(url, {
                method: "DELETE",
            });
            if(!res.ok){
                throw new Error("Something went wrong while deleting expense!!");
            }
            console.log("Expense successfully deleted!!");
            setItems((prevItems)=>{
                return prevItems.filter((itemData)=>itemData.id !== id);
            })
        }catch(error){
            console.log(error);
        }
    }

    const data = {
        items: items,
        addItem: addItemHandler,
        editItem: editItemHandler,
        removeItem: removeItemHandler
    }
    return(
        <ExpenseContext.Provider value={data}>
            {props.children}
        </ExpenseContext.Provider>
    );
}

export default ExpenseContext;