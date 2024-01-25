import React, {useEffect, useRef, useState} from "react";
import {DropDown} from "../../components/Elements/appUtils";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import image1 from "../img/logo.png"
import image2 from "../img/logo-white.png"
import image3 from "../img/logo-small.png"
import {Tooltip} from "../../components/Elements/appUtils";
import AddCustomerDrawer from "../../components/addCustomerDrawer";
import {Table} from "../../components/Elements/appUtils";

const $ = window.$;
const TopMenu = (props) => {
    let tableRef = useRef();
    let dispatch = useDispatch()
    const navigate = useNavigate();
    let [customerState, setCustomerState] = useState({
        visible: false,
        lead: {},
    });
    let {currentUser} = props;
    const [open, setOpen] = useState(false);
    const showModal = (id) => {

        setOpen(true);

    };
    const onClose = () => {
        setOpen(false);
    };


    const menuItems = [
        {
            name: "Edit Profile",
            icon: "fa-user",
        },
        {
            name: "Change Password",
            icon: "fa-key",
        },
        {
            name: "Feedback",
            icon: "fa-user",
        },
        {
            name: "Request for Training",
            icon: "fa-user",
        },
        {
            name: "Logout",
            icon: "fa-sign-out-alt",
        },
    ];
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

    const menuEvents = (eventName) => {
        if (eventName == "Logout") {
            logoutFxn()
        }
    }

    const events = {
        showFollowUp: (lead) => {
            setCustomerState({
                visible: true,
                lead: lead,
            });
        },
        hideFollowUp: () => {
            setCustomerState({
                visible: false,

            });
            // events.reloadTable();
        },


    };

    return (
        <>


            <div class="header">
                <div class="header-left active">
                    <a href="/" class="logo logo-normal">
                        <img src={'../assets/logos/thrones_b_nd_w.png'} alt=""/>
                    </a>
                    <a href="/" class="logo logo-white">
                        <img src={'../assets/logos/thrones_small.png'} alt=""/>
                    </a>
                    <a href="/" class="logo-small">
                        <img src={'../assets/logos/thrones_small.png'} alt=""/>
                    </a>
                    <a id="toggle_btn" href="javascript:void(0);">
                        <i data-feather="chevrons-left" class="feather-16"></i>
                    </a>
                </div>
                <a id="mobile_btn" class="mobile_btn" href="#sidebar">
					<span class="bar-icon">
						<span></span>
						<span></span>
						<span></span>
					</span>
                </a>
                <ul class="nav user-menu">
                    <li class="nav-item nav-searchinputs">
                        {/*<div class="top-nav-search">
                            <a href="javascript:void(0);" class="responsive-search">
                                <i class="fa fa-search"></i>
                            </a>
                            <form action="#">
                                <div class="searchinputs">
                                    <input type="text" placeholder="Search"></input>
                                    <div class="search-addon">
                                        <span><i data-feather="search" class="feather-14"></i></span>
                                    </div>
                                </div>
                                <a class="btn" id="searchdiv"><img src="assets/img/icons/search.svg" alt="img"/></a>
                            </form>
                        </div>*/}
                    </li>
                    {/*<li class="nav-item dropdown has-arrow flag-nav nav-item-box">

                        <a
                            className={"btn btn-link btn-xs mr-1 drawer-setting"}
                            onClick={() => events.showFollowUp()}
                        >
                            +
                        </a>

                    </li>*/}
                    {customerState.visible ? (
                        <AddCustomerDrawer
                            onClose={events.hideFollowUp}
                            onSubmit={() => {
                                events.hideFollowUp();
                                // events.reloadTable();
                            }}
                            visible={customerState.visible}

                        />
                    ) : null}
                    {/*  <li class="nav-item dropdown has-arrow flag-nav nav-item-box">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);"
                           role="button">
                            <i data-feather="globe"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="javascript:void(0);" class="dropdown-item active">
                            </a>
                            <a href="javascript:void(0);" class="dropdown-item">
                            </a>
                            <a href="javascript:void(0);" class="dropdown-item">
                            </a>
                            <a href="javascript:void(0);" class="dropdown-item">
                            </a>
                        </div>
                    </li>
                    <li class="nav-item nav-item-box">
                        <a href="javascript:void(0);" id="btnFullscreen">
                            <i data-feather="maximize"></i>
                        </a>
                    </li>
                    <li class="nav-item nav-item-box">
                        <a href="html/template/email.html">
                            <i data-feather="mail"></i>
                            <span class="badge rounded-pill">1</span>
                        </a>
                    </li>*/}
                    <li class="nav-item dropdown nav-item-box">

                    </li>
                    <li class="nav-item nav-item-box">
                    </li>
                    <li class="nav-item dropdown has-arrow main-drop">
                        <a href="javascript:void(0);" class="dropdown-toggle nav-link userset"
                           data-bs-toggle="dropdown">
							<span class="user-info">
								<span class="user-letter">
								</span>
								<span class="user-detail">
									<span class="user-name">John Smilga</span>
									<span class="user-role">Super Admin</span>
								</span>
							</span>
                        </a>
                        <div class="dropdown-menu menu-drop-user">
                            <div class="profilename">
                                <div class="profileset">
                                    <span class="status online"></span>
                                    <div class="profilesets">
                                        <h6>John Smilga</h6>
                                        <h5>Super Admin</h5>
                                    </div>
                                </div>
                                <a class="dropdown-item" href="/"> <i class="me-2"
                                                                      data-feather="user"></i> My
                                    Profile</a>
                                <a class="dropdown-item" href="/"><i class="me-2"
                                                                     data-feather="settings"></i>Settings</a>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="dropdown mobile-user-menu">
                    <a href="javascript:void(0);" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                       aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="/">My Profile</a>
                        <a class="dropdown-item" href="/">Settings</a>
                        <a class="dropdown-item" href="/">Logout</a>
                    </div>
                </div>
            </div>

        </>
    );
};
export default TopMenu;
