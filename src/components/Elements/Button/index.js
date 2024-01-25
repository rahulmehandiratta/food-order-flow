import React, {useEffect, useState} from "react"

const Button = (props) => {
    let {children, type = 'primary', onClick, className = '', sm = false, htmlType = 'click'} = props;
    if (type == 'default') {
        type = 'primary'
    }
    const submitBtn = (e) => {
        e.preventDefault();
        if (onClick) {
            onClick()
        }
    }
    return (

        htmlType == 'submit' ?
            <button
                className={`btn btn-${type} w-md  ${className} ${sm ? "btn-sm" : ""} ${type == 'primary' ? "main-btn" : ""}`}>
                {children}
            </button> :
            <button
                className={`btn btn-${type} w-md ${className} ${sm ? "btn-sm" : ""} ${type == 'primary' ? "main-btn" : ""}`}
                onClick={submitBtn}>
                {children}
            </button>
    )
}
export default Button

