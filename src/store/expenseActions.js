import { uiActions } from "./uiSlice";
import { expenseActions } from "./expenseSlice";

export const addExpenseItem = (item, email)=>{
    return async(dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Adding...",
              message: "Adding expense data!",
            })
        );
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/expenses${email}.json`;
        const addItem = async()=>{
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
            return resdata;
        }
        try{
            const resdata = await addItem();
            const data = {...item, id: resdata.name};
            dispatch(expenseActions.addItem(data)); 
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Added expense data successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Adding expense data failed!",
                })
            )
            console.log(error);
        }
    }
};

export const editExpenseItem = (item, id, email)=>{
    return async (dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Sending...",
              message: "Editing expense data!",
            })
        );
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/expenses${email}/${id}.json`;
        const editItem = async ()=>{
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
            const data = await res.json();
            return data;
        }
        try{
            const data = await editItem();
            dispatch(expenseActions.editItem({data, id}));
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Edited expense data successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Editing expense data failed!",
                })
            )
            console.log(error);
        }
    }
};


export const removeExpenseItem = (id, email)=>{
    return async (dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Sending...",
              message: "Deleting expense data!",
            })
        );
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/expenses${email}/${id}.json`;
        const removeItem = async ()=>{
            const res = await fetch(url, {
                method: "DELETE",
            });
            if(!res.ok){
                throw new Error("Something went wrong while deleting expense!!");
            }
        }
        try{
            await removeItem();
            dispatch(expenseActions.removeItem(id));
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Removed expense data successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Removing expense data failed!",
                })
            )
            console.log(error);
        }
    }
};