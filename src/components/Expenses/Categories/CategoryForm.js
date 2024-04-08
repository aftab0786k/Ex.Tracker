import { useRef } from "react";
import Modal from "../../UI/Modal";
import styles from './CategoryForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from "../../../store/categoryActions";

const CategoryForm = (props)=>{
    const inputRef = useRef();
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const submitHandler = (event)=>{
        event.preventDefault();
        const category = inputRef.current.value;
        dispatch(addNewCategory(category, email.replace(/[@.]/g, "")));
        props.onHideForm();
    }
    return(
        <Modal onHideForm={props.onHideForm}>
            <section className={styles.main}>
            <div onClick={props.onHideForm} className={styles.close}>X</div>
                <h1>Add Custom Category</h1>
                <form onSubmit={submitHandler} className={styles.control}>
                    <input type="text" placeholder="Custom Category" ref={inputRef} required />
                    <button type="submit">Add Category</button>
                </form>
            </section>
        </Modal>
    );
}

export default CategoryForm;