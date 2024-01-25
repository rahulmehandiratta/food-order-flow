import React from "react";

export const titleComponent = ({title, rightContent = null, lg, sm, customClass = ''}) => {
    let titleStyle = {fontSize: 16};
    if (lg) {
        titleStyle = {fontSize: 22}
    }
    if (sm) {
        titleStyle = {fontSize: 13}
    }
    return (
        <div className={'flexTitle'}>
            <h4 className={`card-title bold ${customClass}`} style={titleStyle}>{title}</h4>
            {rightContent}
        </div>
    )
}
