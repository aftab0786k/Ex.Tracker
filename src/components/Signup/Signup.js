import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Signup.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (!isLogin) {
      const enteredConfPassword = cPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfPassword) {
        alert("Password and confirm password should be matched!");
        return;
      }
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGqRkQcMzcqVnOxhIZYXQszqerlN_ooIA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGqRkQcMzcqVnOxhIZYXQszqerlN_ooIA";
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      if(isLogin){
        console.log("User has successfully logged in!");
        const email = data.email;
        const idToken = data.idToken;
        dispatch(authActions.login({email, idToken})); 
        navigate('/home');
      }else{
        console.log("User has successfully signed up!");
        setIsLogin(true);
      }
    }catch(error) {
      console.log(error);
    }
  };

  
  return (
    <section className={styles.main}>
      <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        {!isLogin && (
          <div className={styles.control}>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              ref={cPasswordInputRef}
              required
            />
          </div>
        )}
        <div className={styles.actions}>
          {!isLoading && (
            <button type="submit">{isLogin ? "Login" : "Sign up"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          {isLogin && <Link to='/forgot'>Forgot password</Link>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Don't have an account? Signup" : "Have an account? Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
