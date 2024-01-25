import React from "react"
import {useNavigate} from "react-router-dom";

const HyperLink = (props) => {
    const navigate = useNavigate();
    let {children, type = 'default', link, className = '', sm = false} = props;
    /* if (type == 'default') {
         type = 'primary'
     }*/
    const submitBtn = () => {
        if (link) {
            navigate(link)
        }
    }
    return (
        <a className={`btn btn-${type} w-md ${className} ${sm ? "btn-sm" : ""}`} onClick={submitBtn}>
            {children}
        </a>
    )
}
export default HyperLink

