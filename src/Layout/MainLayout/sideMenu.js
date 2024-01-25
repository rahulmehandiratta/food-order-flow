import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {menuData, settingData} from "../../routes/menu";
import {useDispatch} from "react-redux";

const SingleMenu = (props) => {
    let {menu, events} = props;
    return !menu.dontShowOnMenu ? (
        <>
            <li key={menu.key}
                onClick={() => events.openLink(menu.path)}>
                <a>
                    <i data-feather="grid"></i>
                    <span>{menu.name}</span>
                </a>
            </li>
        </>
    ) : null;
};
const NestedMenu = (props) => {
    let {menu, events} = props;
    let menuKey = `ui-${menu.key}`;
    return !menu.dontShowOnMenu ? (
        <>
            <li className="submenu" key={menuKey}>
                <a href="javascript:void(0);">
                    <i data-feather="smartphone"></i>
                    <span> {menu.name}</span>
                    <span className="menu-arrow"></span>
                </a>
                <ul>
                    {menu.subMenu.map((child) => {
                        return !child.dontShowOnMenu ? (
                            events.checkAuth(child) ? (
                                <>
                                    <li key={child.key} onClick={() => events.openLink(child.path)}>
                                        <a>{child.name}</a>
                                    </li>
                                </>
                            ) : null
                        ) : null;
                    })}
                </ul>
            </li>


        </>
    ) : null;
};

const SideMenu = () => {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    let user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    let events = {
        openLink: (path) => {
            navigate(path);
        },
        checkAuth: (data) => {
            return data && data.authority && data.authority.length
                ? data.authority.includes(user.userType)
                    ? true
                    : false
                : true;
        },
    };

    const logoutFxn = () => {
        localStorage.clear();
        setTimeout(() => {
            dispatch({
                type: "SET_CURRENT_USER",
                user: {},
            });
            window.location.href = "/login";
        }, 100);
    };
    return (
        <>
            <div class="sidebar" id="sidebar">
                <div class="sidebar-inner slimscroll">
                    <div id="sidebar-menu" class="sidebar-menu">
                        <ul>


                            <li class="submenu-open">
                                <h6 class="submenu-hdr">Main</h6>
                                <ul>
                                    {menuData.map((item) => {
                                        let {subMenu = []} = item;
                                        let checkM = ((subMenu && subMenu.length ? (
                                            <NestedMenu menu={item} events={events} key={item.key}/>
                                        ) : (
                                            <SingleMenu menu={item} events={events} key={item.key}/>
                                        )));
                                        return events.checkAuth(item) ? checkM : null;
                                    })}

                                </ul>
                            </li>
                            <li class="submenu-open">
                                <h6 class="submenu-hdr">Settings</h6>
                                <ul>
                                    {settingData.map((item) => {
                                        let {subMenu = []} = item;
                                        let checkM = ((subMenu && subMenu.length ? (
                                            <NestedMenu menu={item} events={events} key={item.key}/>
                                        ) : (
                                            <SingleMenu menu={item} events={events} key={item.key}/>
                                        )));
                                        return events.checkAuth(item) ? checkM : null;
                                    })}

                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SideMenu;
