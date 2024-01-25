import React from 'react';
import CheckBox from 'rc-checkbox';
import "rc-checkbox/assets/index.css";
import "./index.css"

const CheckBoxComponent = (props) => {
    let {
        defaultChecked = false, checked = false, onChange = () => {
        }, className = null, name = '', key, style = {}
    } = props
    return (
        <CheckBox
            defaultChecked={defaultChecked}
            name={name}
            key={key}
            checked={checked}
            onChange={({target}) => {
                onChange(target.checked, target.name ? target.name : "")
            }}
            className={className}
            style={style}
        />
    )
}
export default CheckBoxComponent
