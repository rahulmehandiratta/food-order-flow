import React from 'react'

const RowTable = (props) => {
    let {title, value} = props
    return (
        <div className={'tableRow'}>
            <div className={'title'}>
                {title ? `${title} : ` : ''}
            </div>
            <div>
                {value}
            </div>
        </div>
    )
}

const CustomCardTitle = (props) => {
    let {title} = props

    return (
        <div className={'customTitle'}>
            {title}
        </div>
    )

}
const CustomRowTable = (props) => {
    let {title, value} = props
    return (
        <div className={'tableRow'}>
            <div className={'title1'}>
                {title} -
            </div>
            <div>
                {value}
            </div>
        </div>
    )
}


export {RowTable, CustomCardTitle, CustomRowTable}
