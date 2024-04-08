import { categoryActions } from "./categorySlice";
import { uiActions } from "./uiSlice";


export const addNewCategory = (item, email) => {
    return async(dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Adding...",
              message: "Adding category!",
            })
        );
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/category${email}.json`;
        const addItem = async()=>{
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({name: item}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!res.ok){
                throw new Error("Something went wrong while storing category!");
            }
            const resdata = await res.json();
            return resdata;
        }
        try{
            const resdata = await addItem();
            const data = {name: item, id: resdata.name};
            dispatch(categoryActions.addCategory(data)); 
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Added category successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Adding category failed!",
                })
            )
            console.log(error);
        }
    }
};

export const removeMyCategory = (id, email)=>{
    return async (dispatch)=>{
        dispatch(
            uiActions.showNotification({
              status: "Pending",
              title: "Sending...",
              message: "Removing Category!",
            })
        );
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/category${email}/${id}.json`;
        const removeItem = async ()=>{
            const res = await fetch(url, {
                method: "DELETE",
            });
            if(!res.ok){
                throw new Error("Something went wrong while deleting category!!");
            }
        }
        try{
            await removeItem();
            dispatch(categoryActions.removeCategory(id));
            dispatch(
                uiActions.showNotification({
                  status: "Success",
                  title: "Success!",
                  message: "Removed category successfully!",
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                    status: "Error",
                    title: "Error!",
                    message: "Removing category failed!",
                })
            )
            console.log(error);
        }
    }
};

export const fetchCategoryHandler = (email)=>{
    return async(dispatch)=>{
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/category${email}.json`;
        const fetchCategory = async()=>{
            const res = await fetch(url);
            if(!res.ok){
                throw new Error("Something went wrong while fetching categories!");
            }
            const data = await res.json();
            return data;
        }
        try{
            const data = await fetchCategory();
            const category = [];
            for(const key in data){
                category.push({
                    id: key,
                    name: data[key].name,
                })
            }
            dispatch(categoryActions.setCategory(category));
        }catch(error){
            console.log(error);
        }
    }
};