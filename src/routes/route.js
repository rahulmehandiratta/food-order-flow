import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";

import Login from "../containers/auths/login";

import {history} from "../reducers/store";

import {menuData, settingData} from "./menu";
import PrintDesign from "../containers/print/printDesign";
import PLayout from "../Layout/MainLayout/printLayout"

const RouteList = (props) => {
    let {currentUser = {}} = props;

    return (
        <Router history={history}>
            <Routes>
                <Route path={"/"} element={<MainLayout {...props} />}>
                    {menuData.map((item) => {
                        let {component: Component} = item;
                            if (!item.subMenu && currentUser) {
                                let routeRow = (
                                    <Route
                                        exact
                                        path={item.path}
                                        key={item.key}
                                        element={<Component {...props} />}
                                    />
                                );
                                if (item.authority) {
                                    return item.authority.includes(currentUser.userType)
                                    ? routeRow
                                    : null;
                            } else {
                                return routeRow;
                            }
                        }
                    })}
                    {menuData.map((item) => {
                        if (
                            item.subMenu &&
                            item.subMenu.length &&
                            currentUser &&
                            item.authority
                        ) {
                            return item.subMenu.map((child, k) => {
                                let {component: Component} = child;
                                let routeRow = (
                                    <Route
                                        exact
                                        path={child.path}
                                        key={child.key}
                                        element={<Component {...props} />}
                                    />
                                );
                                return child.authority && child.authority.length
                                    ? child.authority.includes(currentUser.userType)
                                        ? routeRow
                                        : null
                                    : routeRow;
                            });
                        }
                    })}

                    {settingData.map((item) => {
                        let {component: Component} = item;
                        if (!item.subMenu && currentUser) {
                            let routeRow = (
                                <Route
                                    exact
                                    path={item.path}
                                    key={item.key}
                                    element={<Component {...props} />}
                                />
                            );
                            if (item.authority) {
                                return item.authority.includes(currentUser.userType)
                                    ? routeRow
                                    : null;
                            } else {
                                return routeRow;
                            }
                        }
                    })}
                    {settingData.map((item) => {
                        if (
                            item.subMenu &&
                            item.subMenu.length &&
                            currentUser &&
                            item.authority
                        ) {
                            return item.subMenu.map((child, k) => {
                                let {component: Component} = child;
                                let routeRow = (
                                    <Route
                                        exact
                                        path={child.path}
                                        key={child.key}
                                        element={<Component {...props} />}
                                    />
                                );
                                return child.authority && child.authority.length
                                    ? child.authority.includes(currentUser.userType)
                                        ? routeRow
                                        : null
                                    : routeRow;
                            });
                        }
                    })}
                </Route>
                <Route element={<PLayout/>}>
                    <Route exact path="/prescription-detail" element={<PrintDesign/>}/>
                </Route>
                <Route path={"/"} element={<AuthLayout/>}>
                    <Route index element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Route>
                <Route path="*" element={<Navigate replace to="/dashboard"/>}/>

            </Routes>
        </Router>
    );
};

export default RouteList;
