import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import React from "react";
import "./index.css";
import crossIcon from "./icons/cross.svg"

const DrawerComponent = (props) => {
    let {
        visible,
        onClose,
        title,
        children,
        closable = true,
        width = "35%",
        placement = "right",
        rightContent = "",
        className = ""
    } = props;
    return (
        <>
            <Drawer
                open={visible}
                onClose={onClose}
                onHandleClick={onClose}
                duration={"3s"}
                ease={""}
                className={"customDrawer"}
                // maskClosable={closable}
                showMask={true}
                contentWrapperStyle={{width}}
                placement={placement}>
                <div className={"drawer-header"}>
                    {closable ? <span onClick={onClose}>
                        <img src={crossIcon}/>
                    </span> : null}
                </div>
                <div className={"drawer-body"}>
                    <div className={`information-box ${className}`}>
                        {(title || rightContent) ? <div className="flex-box">
                            {title ? <h2>{title}</h2> : null}
                            {rightContent ? <span>{rightContent}</span> : null}
                        </div> : ""}

                        {children}

                    </div>

                </div>
            </Drawer>
        </>
    );
};
export default DrawerComponent;
