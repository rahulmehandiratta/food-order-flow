import React, {Component} from 'react'

class InputBoxComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {title = '', className = '', extra, labelCls = '', customStyle = {}} = this.props
        return (
            <div className={'inputBox'} style={customStyle}>
                <div className={'labelRow'}>
                    {title ? <React.Fragment>
                        <label className={`labelNew ${labelCls}`}>{title} : </label>
                        {extra ? <div className={'extra'}>{extra}</div> : ''}
                    </React.Fragment> : ''}
                </div>
                <div>
                    <div className={`${className} innerBox rowFlex`}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default InputBoxComponent

