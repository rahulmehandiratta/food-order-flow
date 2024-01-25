import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import AddCustomerDrawer from "../../components/addCustomerDrawer";

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


            <div className="header">
                <div className="header-left active">
                    <a href="/" className="logo logo-normal">
                        <img src={'../assets/logos/thrones_b_nd_w.png'} alt=""/>
                    </a>
                    <a href="/" className="logo logo-white">
                        <img src={'../assets/logos/thrones_small.png'} alt=""/>
                    </a>
                    <a href="/" className="logo-small">
                        <img src={'../assets/logos/thrones_small.png'} alt=""/>
                    </a>
                    <a id="toggle_btn">
                        <i data-feather="chevrons-left" className="feather-16"></i>
                    </a>
                </div>
                <a id="mobile_btn" className="mobile_btn" href="#sidebar">
					<span className="bar-icon">
						<span></span>
						<span></span>
						<span></span>
					</span>
                </a>
                <ul className="nav user-menu">
                    <li className="nav-item nav-searchinputs">
                        {/*<div className="top-nav-search">
                            <a href="javascript:void(0);" className="responsive-search">
                                <i className="fa fa-search"></i>
                            </a>
                            <form action="#">
                                <div className="searchinputs">
                                    <input type="text" placeholder="Search"></input>
                                    <div className="search-addon">
                                        <span><i data-feather="search" className="feather-14"></i></span>
                                    </div>
                                </div>
                                <a className="btn" id="searchdiv"><img src="assets/img/icons/search.svg" alt="img"/></a>
                            </form>
                        </div>*/}
                    </li>
                    {/*<li className="nav-item dropdown has-arrow flag-nav nav-item-box">

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

                    <li className="nav-item dropdown nav-item-box">

                    </li>
                    <li className="nav-item nav-item-box">
                    </li>
                    <li className="nav-item dropdown has-arrow main-drop">
                        <a className="dropdown-toggle nav-link userset"
                           data-bs-toggle="dropdown">
							<span className="user-info">
								<span className="user-letter">
								</span>
								<span className="user-detail">
									<span className="user-name">{currentUser.name}</span>
									<span className="user-role">{currentUser.userType}</span>
								</span>
							</span>
                        </a>
                        <div className="dropdown-menu menu-drop-user">
                            <div className="profilename">
                                <div className="profileset">
                                    <span className="status online"></span>
                                    <div className="profilesets">
                                        <h6>{currentUser.name}</h6>
                                        <h5>{currentUser.userType}</h5>
                                    </div>
                                </div>
                                <a className="dropdown-item" href="/"> <i className="me-2"
                                                                          data-feather="user"></i> My
                                    Profile</a>
                                <a className="dropdown-item" href="/"><i className="me-2"
                                                                         data-feather="settings"></i>Settings</a>
                                <a className="dropdown-item" onClick={logoutFxn}><i
                                    className="me-2 fa fa-sign-out-alt"></i>Logout</a>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="dropdown mobile-user-menu">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                       aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="/">My Profile</a>
                        <a className="dropdown-item" href="/">Settings</a>
                        <a className="dropdown-item" onClick={logoutFxn}>Logout</a>
                    </div>
                </div>
            </div>

        </>
    );
};
export default TopMenu;
