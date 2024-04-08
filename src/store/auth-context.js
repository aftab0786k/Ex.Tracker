import React, { useState } from "react"

const AuthContext = React.createContext({
    token: "",
    email: "",
    isLoggedIn: false,
    login: (email, token)=>{},
    logout: ()=>{}
});

export const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem("token");
    const initialEmail = localStorage.getItem("email");
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(initialEmail);
    const loggingIn = !!token;
    const loginHandler = (email, token)=>{
        setToken(token);
        setEmail(email);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    }
    const logoutHandler = ()=>{
        setEmail(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }
    const data = {
        token : token,
        email: email,
        isLoggedIn: loggingIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={data}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;