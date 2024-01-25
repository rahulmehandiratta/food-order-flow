import React, {Suspense, useEffect} from "react";
import {Outlet, Navigate} from "react-router-dom";
import TopNavComponent from "./topMenu";
import SideNavComponent from "./sideMenu";
// import SideNavComponent from "./sideMenuBackup";

const FooterComponent = React.lazy(() => import("./footer"));

const isLoggedIn = localStorage.getItem("token") ? true : false;

const InnerLayout = (props) => {
    return (
        isLoggedIn ? (<>
            <div className="main-wrapper">
                <TopNavComponent currentUser={props.currentUser}/>
                <SideNavComponent currentUser={props.currentUser}/>

                <div className="page-wrapper">
                    <div class="content">
                        <Outlet/>
                    </div>
                </div>
                {/* <NewPage/>   */}
                <Suspense fallback={<></>}>
                    <FooterComponent/>
                </Suspense>
            </div>
        </>) : (
            <Navigate replace to="/login"/>
        )
    );
};
export default InnerLayout;
