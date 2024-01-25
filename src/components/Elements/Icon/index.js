import React from "react"

const Icon = (props) => {
    let {name = ""} = props;
    return (
        <>
            {name ? <i className="icon nav-icon" data-feather={name}></i> : null}
        </>
    )
}
export default Icon
