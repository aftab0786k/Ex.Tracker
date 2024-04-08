import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './UpdateProfile.module.css';
import { useSelector } from "react-redux";

const UpdateProfile = ()=>{
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const token = useSelector(state => state.auth.token);
    

    const nameChangeHandler = (event)=>{
        setName(event.target.value);
    }

    const urlChangeHandler = (event)=>{
        setPhotoUrl(event.target.value);
    }

    const fetchUserData = async()=>{
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCGqRkQcMzcqVnOxhIZYXQszqerlN_ooIA",{
                method: "POST",
                body: JSON.stringify({
                    idToken: token                    
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            console.log(data);
            setName(data.users[0].displayName);
            setPhotoUrl(data.users[0].photoUrl);
            if(!response.ok){
                throw new Error("Something went wrong while getting data!");
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        if(isLoggedIn){
            fetchUserData();
        }
    }, [isLoggedIn]);

    const updateProfileHandler = async(event)=>{
        event.preventDefault();
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCGqRkQcMzcqVnOxhIZYXQszqerlN_ooIA";
        try{
            const res = await fetch(url,{
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                    displayName: name,
                    photoUrl: photoUrl,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert("Successfully updated!!");
            navigate('/home');
            if(!res.ok){
                throw new Error("Something went wrong while updating!");
            }
        }catch(error){
            console.log(error);
        }
    }

    const cancelHandler = ()=>{
        navigate('/home');
    }

    return(
        <React.Fragment>
            <header>
                <div className={styles.head}>
                    <h1>
                        Winners never quite, Quitters never win.
                    </h1>
                    <p>Your Profile is 64% completed. A complete Profile has higher chances of landing a job.  <Link to="/update">Complete now</Link></p>
                </div>
                <hr />
            </header>
            <section className={styles.main}>
                <div className={styles.headbox}>
                    <h2>Contact Details</h2>
                    <button type="button" onClick={cancelHandler} className={styles.cancel}>Cancel</button>
                </div>
                <form>
                    <div className={styles.control}>
                        <label htmlFor="name">Full Name: </label>
                        <input type="text" id="name" onChange={nameChangeHandler} value={name} />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="url">Profile Photo URL: </label>
                        <input type="text" id="url" onChange={urlChangeHandler} value={photoUrl} />
                    </div>
                    <button type="submit" className={styles.action} onClick={updateProfileHandler}>Update</button>
                </form>
            </section>
        </React.Fragment>
    );
}

export default UpdateProfile;