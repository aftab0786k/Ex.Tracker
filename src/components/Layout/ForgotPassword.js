import React, { useRef, useState } from "react";
import styles from './ForgotPassword.module.css';

const ForgotPassword = ()=>{
    const emailInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const forgotPasswordHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCGqRkQcMzcqVnOxhIZYXQszqerlN_ooIA";
        try{
          setIsLoading(true);
          const res = await fetch(url,{
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });
          setIsLoading(false);
          const data = await res.json();
          console.log(data);
          if(!res.ok){
            throw new Error('Failed to send reset password link!');
          }
        }catch(error){
          console.log(error);
        }
      }
    return(
        <section className={styles.main}>
            <h1>Forgot Password</h1>
            <form onSubmit={forgotPasswordHandler}>
            <div className={styles.control}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailInputRef} required />
            </div>
            <div className={styles.actions}>
            {!isLoading && (
                <button type="submit">Update Password</button>
            )}
            {isLoading && <p>Sending request...</p>}
            </div>
        </form>
      </section>
    );
}

export default ForgotPassword;