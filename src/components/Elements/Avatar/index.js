import React from "react"
import "./index.css"

const AvatarComponent = (props) => {
    let {size = 40, style = null, children, shape = 'circle'} = props;
    let styles = {
        ...style,
        height: size,
        width: size,
        lineHeight: size + 'px',
        fontSize: size / 2
    }
    let classes = `avatar avatar-${shape}`
    return (
        <>
            <span className={classes} style={styles}>
                {children}
            </span>
        </>
    )
}
export default AvatarComponent
