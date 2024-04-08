import React, { useState, useEffect } from 'react';
import styles from './Categories.module.css';
import trash from '../../../assets/delete.png';
import CategoryForm from './CategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeMyCategory } from '../../../store/categoryActions';
import { fetchCategoryHandler } from '../../../store/categoryActions';

const Categories = ()=>{
    const [formIsShown, setFormIsShown] = useState(false);
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const categories = useSelector(state => state.category.category);

    const hideFormHandler = () => {
        setFormIsShown(false);
    };
    const showFormHandler = () => {
        setFormIsShown(true);
    };

    
    useEffect(()=>{
        if(isLoggedIn){
            dispatch(fetchCategoryHandler(email.replace(/[@.]/g, "")));
        }
    },[isLoggedIn]);
    

    const removeCategoryHandler = (id)=>{
        dispatch(removeMyCategory(id, email.replace(/[@.]/g, "")));
    }

    const items = categories && categories.length > 0 ? (categories.map((item => (
        <li key={item.id}>{item.name} <button onClick={removeCategoryHandler.bind(this, item.id)}><img src={trash} alt="delete" title="Delete" className={styles.trash} /></button></li>
    )))) : (<li>No Category Here</li>)

    return(
        <div className={styles.main}>
            {formIsShown && <CategoryForm onHideForm={hideFormHandler} />}
            <button onClick={showFormHandler}>Add Custom Categories</button>
            <ul className={styles.list}>
                {items}
            </ul>
        </div>
    );
}

export default Categories;