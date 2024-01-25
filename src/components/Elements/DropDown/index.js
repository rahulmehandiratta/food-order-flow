import React from "react";
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import "./index.css"


const DropDownComponent = (props) => {
    let {children, options, onClick, className = ''} = props;
    let submitFxn = (action) => {
        if (onClick) {
            onClick(action)
        }
    }
    let MenuCall = (
        <ul className={'menuBox'}>
            {options && options.length ? options.map((item, index) => {
                return (
                    <li key={index} onClick={() => submitFxn(item.name)}>
                        {item.icon ? <i className={`fa ${item.icon} mr-5`}></i> : null} {item.name}
                    </li>
                )
            }) : ""}
        </ul>
    )
    return (
        <>
            <Dropdown
                trigger={['click']}
                overlay={MenuCall}
                overlayClassName={className}
                animation="slide-up">
                {children}
            </Dropdown>
        </>
    )
}
export default DropDownComponent
