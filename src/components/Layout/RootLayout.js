import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Notification from "../UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import { uiActions } from "../../store/uiSlice";

const RootLayout = (props)=>{
    const notification = useSelector((state) => state.ui.notification);
    const dispatch = useDispatch();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(notification){
                dispatch(uiActions.removeNotification());
            }
        }, 2000);
        return ()=>clearTimeout(timer);
    }, [dispatch, notification]);

    return(
        <Card>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Header/>
            <main>
                <Outlet />
            </main>
        </Card>
    );
}

export default RootLayout;