import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {imgPath} from "../../_utils/_utils";

const TableButton = (props) => {
    const navigate = useNavigate();
    let {children, type = '', path = '', onClick = () => null, className = ''} = props;

    return (
        <>
            <button className={`btn ${className}`} onClick={() => {
                if (path) {
                    navigate(path)
                } else {
                    if (onClick) {
                        onClick()
                    }
                }
            }}>
                {type ? <img src={imgPath[type]} style={{height: "100%"}}/> : children ? children : null}
            </button>
        </>
    )
}
export default TableButton

