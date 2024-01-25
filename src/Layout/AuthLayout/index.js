import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const isLoggedIn = localStorage.getItem("token") ? true : false;

const AuthLayout = (props) => {
    return isLoggedIn ? (
        <Navigate replace to="/dashboard"/>
    ) : (
        <>
            <Outlet/>
        </>
    );
};
export default AuthLayout;
