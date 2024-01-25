import React from "react";
import Calendar from "rc-calendar";
import DatePicker from "rc-calendar/lib/Picker";
import RangeCalendar from "rc-calendar/lib/RangeCalendar";
import moment from "moment";
import "rc-calendar/assets/index.css";
import "./index.css";

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


const DateTimePicker = (props) => {
    let {value = null, onChange, format = defaultFormat, item = {}, placeholder: customPlaceholder} = props;
    let {placeholder = "Please select Date", disabled = false} = item;
    const finalPlaceholder = customPlaceholder ? customPlaceholder : placeholder;
    const calendar = (
        <Calendar
            style={{zIndex: 1000}}
            showClear={false}
            dateInputPlaceholder="Choose Date"
            format={format}
            animation={'slide-up'}
            // disabledDate={disabledDate}
        />
    );

    return (
        <DatePicker
            calendar={calendar}
            value={value}
            showClear={false}
            disabled={disabled}
            onChange={onChange}>
            {({value}) => {
                return (
                    <input
                        placeholder={finalPlaceholder}
                        // style={{width: 250}}
                        // disabled={disabled}
                        style={{backgroundColor: "white"}}
                        readOnly
                        tabIndex="-1"
                        className={"form-control"}
                        value={(value && value.format(format)) || ""}
                    />
                );
            }}
        </DatePicker>
    );
};

export default DateTimePicker;
DateTimePicker.RangePicker = RangeCalendar;
