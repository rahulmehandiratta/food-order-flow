import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {menuData} from "../../routes/menu";
import {useDispatch} from "react-redux";

const SingleMenu = (props) => {
  let {menu, events} = props;
  return !menu.dontShowOnMenu ? (
      <>
        <a
            onClick={() => events.openLink(menu.path)}
            className="nav-item nav-link"
            key={menu.key}
        >
          <img src="../app/img/dashboard-ico.svg" className="me-2" alt=""/>
          {menu.name}
        </a>
      </>
  ) : null;
};
const NestedMenu = (props) => {
  let {menu, events} = props;
  let menuKey = `ui-${menu.key}`;
  return !menu.dontShowOnMenu ? (
      <>
        <div className="nav-item dropdown" key={menuKey}>
          <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
          >
            <img src="../app/img/setting-ico.svg" className="me-2" alt=""/>
            {menu.name}
          </a>
          <div className="dropdown-menu border-0">
            {menu.subMenu.map((child) => {
              return !child.dontShowOnMenu ? (
                  events.checkAuth(child) ? (
                      <div key={child.key}>
                        {child.type == "link" ? (
                            <a
                                key={child.key}
                                href={child.path}
                                target={"_blank"}
                                className="nav-item nav-link dropdown-item"
                            >
                              {child.name}
                            </a>
                        ) : (
                            <a
                                key={child.key}
                                onClick={() => events.openLink(child.path)}
                                className="nav-item nav-link dropdown-item"
                            >
                              {child.name}
                            </a>
                        )}
                      </div>
                  ) : null
              ) : null;
            })}
          </div>
        </div>
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
                    <li class="active">
                      <Link to="/dashboard">
                        <i data-feather="grid"></i>
                        <span>Dashboard</span>
                      </Link>
                    </li>
                    <li class="active">
                      <Link to="/newpage">
                        <i data-feather="grid"></i>
                        <span>New</span>
                      </Link>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="smartphone"></i>
                        <span>Application</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/chat.html">Chat</a>
                        </li>
                        <li>
                          <a href="html/template/calendar.html">Calendar</a>
                        </li>
                        <li>
                          <a href="html/template/email.html">Email</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Products</h6>
                  <ul>
                    <li>
                      <a href="html/template/productlist.html">
                        <i data-feather="box"></i>
                        <span>Products</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/addproduct.html">
                        <i data-feather="plus-square"></i>
                        <span>Create Product</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/categorylist.html">
                        <i data-feather="codepen"></i>
                        <span>Category</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/brandlist.html">
                        <i data-feather="tag"></i>
                        <span>Brands</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/subcategorylist.html">
                        <i data-feather="speaker"></i>
                        <span>Sub Category</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/barcode.html">
                        <i data-feather="align-justify"></i>
                        <span>Print Barcode</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/importproduct.html">
                        <i data-feather="minimize-2"></i>
                        <span>Import Products</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Sales</h6>
                  <ul>
                    <li>
                      <a href="html/template/saleslist.html">
                        <i data-feather="shopping-cart"></i>
                        <span>Sales</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/invoicereport.html">
                        <i data-feather="file-text"></i>
                        <span>Invoices</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/salesreturnlists.html">
                        <i data-feather="copy"></i>
                        <span>Sales Return</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/quotationList.html">
                        <i data-feather="save"></i>
                        <span>Quotation</span>
                      </a>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="shuffle"></i>
                        <span>Transfer</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/transferlist.html">
                            Transfer List
                          </a>
                        </li>
                        <li>
                          <a href="html/template/importtransfer.html">
                            Import Transfer{" "}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="corner-up-left"></i>
                        <span>Return</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/salesreturnlist.html">
                            Sales Return
                          </a>
                        </li>
                        <li>
                          <a href="html/template/purchasereturnlist.html">
                            Purchase Return
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Purchases</h6>
                  <ul>
                    <li>
                      <a href="html/template/purchaselist.html">
                        <i data-feather="shopping-bag"></i>
                        <span>Purchases</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/importpurchase.html">
                        <i data-feather="minimize-2"></i>
                        <span>Import Purchases</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/purchaseorderreport.html">
                        <i data-feather="file-minus"></i>
                        <span>Purchase Order</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/purchasereturnlist.html">
                        <i data-feather="refresh-cw"></i>
                        <span>Purchase Return</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Finance & Accounts</h6>
                  <ul>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="file-text"></i>
                        <span>Expense</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/expenselist.html">Expenses</a>
                        </li>
                        <li>
                          <a href="html/template/expensecategory.html">
                            Expense Category
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Peoples</h6>
                  <ul>
                    <li>
                      <a href="html/template/customerlist.html">
                        <i data-feather="user"></i>
                        <span>Customers</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/supplierlist.html">
                        <i data-feather="users"></i>
                        <span>Suppliers</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/userlist.html">
                        <i data-feather="user-check"></i>
                        <span>Users</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/storelist.html">
                        <i data-feather="home"></i>
                        <span>Stores</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Reports</h6>
                  <ul>
                    <li>
                      <a href="html/template/salesreport.html">
                        <i data-feather="bar-chart-2"></i>
                        <span>Sales Report</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/purchaseorderreport.html">
                        <i data-feather="pie-chart"></i>
                        <span>Purchase report</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/inventoryreport.html">
                        <i data-feather="credit-card"></i>
                        <span>Inventory Report</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/invoicereport.html">
                        <i data-feather="file"></i>
                        <span>Invoice Report</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/purchasereport.html">
                        <i data-feather="bar-chart"></i>
                        <span>Purchase Report</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/supplierreport.html">
                        <i data-feather="database"></i>
                        <span>Supplier Report</span>
                      </a>
                    </li>
                    <li>
                      <a href="html/template/customerreport.html">
                        <i data-feather="pie-chart"></i>
                        <span>Customer Report</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">User Management</h6>
                  <ul>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="users"></i>
                        <span>Manage Users</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/newuser.html">New User </a>
                        </li>
                        <li>
                          <a href="html/template/userlists.html">Users List</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Pages</h6>
                  <ul>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="shield"></i>
                        <span>Authentication</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/signin.html">Log in</a>
                        </li>
                        <li>
                          <a href="html/template/signup.html">Register</a>
                        </li>
                        <li>
                          <a href="html/template/forgetpassword.html">
                            Forgot Password
                          </a>
                        </li>
                        <li>
                          <a href="html/template/resetpassword.html">
                            Reset Password
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="file-minus"></i>
                        <span>Error Pages</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/error-404.html">404 Error </a>
                        </li>
                        <li>
                          <a href="html/template/error-500.html">500 Error </a>
                        </li>
                      </ul>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="map"></i>
                        <span>Places</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/countrieslist.html">Countries</a>
                        </li>
                        <li>
                          <a href="html/template/statelist.html">States</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="html/template/blankpage.html">
                        <i data-feather="file"></i>
                        <span>Blank Page</span>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="html/template/components.html">
                        <i data-feather="pen-tool"></i>
                        <span>Components</span>{" "}
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">UI Interface</h6>
                  <ul>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="layers"></i>
                        <span>Elements</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/sweetalerts.html">
                            Sweet Alerts
                          </a>
                        </li>
                        <li>
                          <a href="html/template/tooltip.html">Tooltip</a>
                        </li>
                        <li>
                          <a href="html/template/popover.html">Popover</a>
                        </li>
                        <li>
                          <a href="html/template/ribbon.html">Ribbon</a>
                        </li>
                        <li>
                          <a href="html/template/clipboard.html">Clipboard</a>
                        </li>
                        <li>
                          <a href="html/template/drag-drop.html">Drag & Drop</a>
                        </li>
                        <li>
                          <a href="html/template/rangeslider.html">
                            Range Slider
                          </a>
                        </li>
                        <li>
                          <a href="html/template/rating.html">Rating</a>
                        </li>
                        <li>
                          <a href="html/template/toastr.html">Toastr</a>
                        </li>
                        <li>
                          <a href="html/template/text-editor.html">Text Editor</a>
                        </li>
                        <li>
                          <a href="html/template/counter.html">Counter</a>
                        </li>
                        <li>
                          <a href="html/template/scrollbar.html">Scrollbar</a>
                        </li>
                        <li>
                          <a href="html/template/spinner.html">Spinner</a>
                        </li>
                        <li>
                          <a href="html/template/notification.html">
                            Notification
                          </a>
                        </li>
                        <li>
                          <a href="html/template/lightbox.html">Lightbox</a>
                        </li>
                        <li>
                          <a href="html/template/stickynote.html">Sticky Note</a>
                        </li>
                        <li>
                          <a href="html/template/timeline.html">Timeline</a>
                        </li>
                        <li>
                          <a href="html/template/form-wizard.html">Form Wizard</a>
                        </li>
                      </ul>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="bar-chart-2"></i>
                        <span>Charts</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/chart-apex.html">Apex Charts</a>
                        </li>
                        <li>
                          <a href="html/template/chart-js.html">Chart Js</a>
                        </li>
                        <li>
                          <a href="html/template/chart-morris.html">
                            Morris Charts
                          </a>
                        </li>
                        <li>
                          <a href="html/template/chart-flot.html">Flot Charts</a>
                        </li>
                        <li>
                          <a href="html/template/chart-peity.html">
                            Peity Charts
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="database"></i>
                        <span>Icons</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/icon-fontawesome.html">
                            Fontawesome Icons
                          </a>
                        </li>
                        <li>
                          <a href="html/template/icon-feather.html">
                            Feather Icons
                          </a>
                        </li>
                        <li>
                          <a href="html/template/icon-ionic.html">Ionic Icons</a>
                        </li>
                        <li>
                          <a href="html/template/icon-material.html">
                            Material Icons
                          </a>
                        </li>
                        <li>
                          <a href="html/template/icon-pe7.html">Pe7 Icons</a>
                        </li>
                        <li>
                          <a href="html/template/icon-simpleline.html">
                            Simpleline Icons
                          </a>
                        </li>
                        <li>
                          <a href="html/template/icon-themify.html">
                            Themify Icons
                          </a>
                        </li>
                        <li>
                          <a href="html/template/icon-weather.html">
                            Weather Icons
                          </a>
                        </li>
                        <li>
                          <a href="html/template/icon-typicon.html">
                            Typicon Icons
                          </a>
                        </li>
                        <li>
                          <a href="html/template/icon-flag.html">Flag Icons</a>
                        </li>
                      </ul>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="edit"></i>
                        <span>Forms</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/form-basic-inputs.html">
                            Basic Inputs{" "}
                          </a>
                        </li>
                        <li>
                          <a href="html/template/form-input-groups.html">
                            Input Groups{" "}
                          </a>
                        </li>
                        <li>
                          <a href="html/template/form-horizontal.html">
                            Horizontal Form{" "}
                          </a>
                        </li>
                        <li>
                          <a href="html/template/form-vertical.html">
                            {" "}
                            Vertical Form{" "}
                          </a>
                        </li>
                        <li>
                          <a href="html/template/form-mask.html">Form Mask </a>
                        </li>
                        <li>
                          <a href="html/template/form-validation.html">
                            Form Validation{" "}
                          </a>
                        </li>
                        <li>
                          <a href="html/template/form-select2.html">
                            Form Select2{" "}
                          </a>
                        </li>
                        <li>
                          <a href="html/template/form-fileupload.html">
                            File Upload{" "}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="columns"></i>
                        <span>Tables</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/tables-basic.html">
                            Basic Tables{" "}
                          </a>
                        </li>
                        <li>
                          <a href="html/template/data-tables.html">Data Table </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="submenu-open">
                  <h6 class="submenu-hdr">Settings</h6>
                  <ul>
                    <li class="submenu">
                      <a href="javascript:void(0);">
                        <i data-feather="settings"></i>
                        <span>Settings</span>
                        <span class="menu-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="html/template/generalsettings.html">
                            General Settings
                          </a>
                        </li>
                        <li>
                          <a href="html/template/emailsettings.html">
                            Email Settings
                          </a>
                        </li>
                        <li>
                          <a href="html/template/paymentsettings.html">
                            Payment Settings
                          </a>
                        </li>
                        <li>
                          <a href="html/template/currencysettings.html">
                            Currency Settings
                          </a>
                        </li>
                        <li>
                          <a href="html/template/grouppermissions.html">
                            Group Permissions
                          </a>
                        </li>
                        <li>
                          <a href="html/template/taxrates.html">Tax Rates</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="html/template/signin.html">
                        <i data-feather="log-out"></i>
                        <span>Logout</span>{" "}
                      </a>
                    </li>
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
