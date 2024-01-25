import React from "react"
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const TooltipComponent = (props) => {
    let {children, position = 'top', title} = props;
    return (
        <Tooltip overlay={title} placement={position} overlayStyle={{cursor: "pointer"}}>
            {children}
        </Tooltip>
    )
}
export default TooltipComponent
