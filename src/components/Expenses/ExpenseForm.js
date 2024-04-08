import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import styles from './ExpenseForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addExpenseItem, editExpenseItem } from "../../store/expenseActions";
import { fetchCategoryHandler } from "../../store/categoryActions";

const ExpenseForm = (props)=>{
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const expenseId = props.expenseId;
    const cat = useSelector(state => state.category.category);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const priceChangeHandler = (event)=>{
        setPrice(event.target.value);
    }
    const descChangeHandler = (event)=>{
        setDesc(event.target.value);
    }
    const categoryChangeHandler = (event)=>{
        setCategory(event.target.value);
    }

    useEffect(()=>{
        if(isLoggedIn){
          dispatch(fetchCategoryHandler(email.replace(/[@.]/g, "")));
        }
    },[isLoggedIn]);

    const fetchHandler = async()=>{
        const url = `https://expenses-tracker-74314-default-rtdb.firebaseio.com/expenses${email.replace(/[@.]/g,"")}/${expenseId}.json`;
        try{
            const res = await fetch(url);
            if(!res.ok){
                throw new Error("Something went wrong while fetching expenses!");
            }
            const resdata = await res.json(); 
            setPrice(resdata.price);
            setCategory(resdata.category);
            setDesc(resdata.description);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(expenseId){
            fetchHandler();
        }
    },[expenseId]);

    
    const submitHandler = async(event)=>{
        event.preventDefault();
        if(category === ""){
            alert("Please select a category!");
        }else{
            const data = {
                price: +price,
                description: desc,
                category: category
            }
            if(expenseId){
                dispatch(editExpenseItem(data, expenseId, email.replace(/[@.]/g, "")));
            }else{
                dispatch(addExpenseItem(data, email.replace(/[@.]/g, "")));
            }
            setPrice("");
            setDesc("");
            setCategory("");
            props.onHideForm();
        }
    }

    const categories = cat && cat.length > 0 && (cat.map((item) => (
        <option key={item.id} value={item.name}>{item.name}</option>
    )));
    
    return(
        <Modal onHideForm={props.onHideForm}>
            <section className={styles.main}>
                <div onClick={props.onHideForm} className={styles.close}>X</div>
                <h1>Add Your Expenses</h1>
                <form onSubmit={submitHandler}>
                    <div className={styles.control}>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" value={price} onChange={priceChangeHandler} required />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" value={desc} onChange={descChangeHandler} required />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="category">Category</label>
                        <select value={category} id="category" onChange={categoryChangeHandler}>
                            <option value="" disabled>Select Category</option>
                            {categories}
                        </select>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">{expenseId ? "Save" : "Submit"}</button>
                    </div>
                </form>
            </section>
        </Modal>
    );
}

export default ExpenseForm;