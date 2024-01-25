import React from 'react'

const ColumnWidth = (props) => {
    let {width, children} = props
    return (
        <div>
            {children}
        </div>
    )
}

export {ColumnWidth}