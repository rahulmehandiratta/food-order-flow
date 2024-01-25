import React, {Component} from 'react'

class InputComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {title = '', className = '', extra, labelCls = '', children, type} = this.props
        let extraCls = type == "select" ? "select-box" : ""
        return (
            <>
                <div className="form-group">
                    <label>{title}</label>
                    {children}
                </div>
            </>
        )
    }
}

export default InputComponent

