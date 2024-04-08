import { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import styles from "./Expenses.module.css";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import { useNavigate } from "react-router-dom";
import { fetchCategoryHandler } from "../../store/categoryActions";

const Expenses = (props) => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const items = useSelector(state => state.expense.items);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const email = useSelector(state => state.auth.email);
  const totalAmt = useSelector(state => state.expense.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cat = useSelector(state => state.category.category);
  const darkMode = useSelector(state => state.ui.isDarkModeOn);

  const hideFormHandler = () => {
    setFormIsShown(false);
  };
  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const categoryChangeHandler = (event)=>{
    setSelectedCategory(event.target.value);
  }

  const premiumHandler = ()=>{
    navigate('/premium');
  }

  const addCategoryHandler = ()=>{
    navigate('/categories');
  }

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

  useEffect(()=>{
    if(isLoggedIn){
        dispatch(fetchCategoryHandler(email.replace(/[@.]/g, "")));
    }
  },[isLoggedIn]);


  const categories = cat && cat.length > 0 && (cat.map((item) => (
    <option key={item.id} value={item.name}>{item.name}</option>
  )));

  const filteredItems = selectedCategory === "All" ?
   items : 
   items.filter((item)=>(item.category === selectedCategory));

  const item = filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            category={item.category}
            description={item.description}
            price={item.price}
          />
        ))
      ) : (
      <tr className={styles.tr} key="no-expenses">
        <td colSpan="4">No Expenses Here</td>
      </tr>
    );


  return (
    <section className={styles.main}>
      {formIsShown && <ExpenseForm expenseId={null} onHideForm={hideFormHandler} />}
      <div className={styles.actions}>
        <button onClick={showFormHandler}>Add Expense</button>
        {totalAmt>10000 && <button onClick={premiumHandler}>Activate Premium</button>}
        <button onClick={addCategoryHandler}>Add Categories</button>
      </div>
      <div className={styles.totalAmt}>
        <span>
          <select value={selectedCategory} id="category" onChange={categoryChangeHandler}>
            <option value="All">Select All Category</option>
            {categories}
          </select>
        </span>
        <span className={darkMode ? styles.dark : styles.light}>Total Amount: {totalAmt} Rs</span>
      </div>
        <table className={styles.container}>
          <thead>
            <tr key="expense-head" className={darkMode ? styles.dark : styles.light}>
              <th>Category<hr/></th>
              <th>Description<hr/></th>
              <th>Price<hr/></th>
              <th>Actions<hr/></th>
            </tr>
          </thead>
          <tbody>{item}</tbody>
        </table>
    </section>
  );
};

export default Expenses;
