import React, {useState, useEffect} from "react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "./index.css"
import moment from "moment";
import ReactDOM from 'react-dom';

const defaultFormat = "DD-MM-YYYY"

function disabledDate(current) {
    if (!current) {
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf(); // can not select days before today
}


class TimePickerComponent extends React.Component {
    constructor(props) {
        super(props);
        let {value} = props
        this.state = {
            time: value ? moment(value) : null,
        };
        this.timePickerRef = React.createRef()
    }

    componentDidMount() {

    }

    onChange = time => {
        let {onChange} = this.props;
        this.setState({time: time}, () => {
            onChange(this.state.time)
        });
    };

    render() {
        let {item} = this.props;
        let {placeholder = "Please select Time", disabled = false, allowClear = false} = item;
        return (
            <TimePicker
                ref={this.timePickerRef}
                value={this.state.time}
                showSecond={false}
                onChange={this.onChange}
                placeholder={placeholder}
                format={"hh:mm a"}
                use12Hours={true}
                allowEmpty={allowClear}
            />
        )
    }
}


export default TimePickerComponent;
