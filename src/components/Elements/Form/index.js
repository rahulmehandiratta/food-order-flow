import React from "react"
import {createForm, formShape} from 'rc-form';
import _ from "lodash"
import {notification} from "../appUtils";

const formValidation = (data) => {
    let findValue = _.find(data, (item, key) => {
        if (key) {
            return item
        }
    })
    if (findValue) {
        let {errors} = findValue;
        if (errors && errors.length) {
            notification.warning({message: errors[0].message})
        }
    }
}

const FormItem = (props) => {
    return (
        <>
            {props.children}
        </>
    )
}

class FormComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    submitForm = (e) => {
        e.preventDefault();
        let {onSubmit} = this.props;
        if (onSubmit) {
            onSubmit(e)
        }
    }

    render() {
        let {children, className = ""} = this.props
        return (
            <form onSubmit={this.submitForm} noValidate={true} className={className}>
                {children}
            </form>
        )
    }
}

export default FormComponent
FormComponent.Item = FormItem;
FormComponent.create = createForm;
FormComponent.formValidation = formValidation;
