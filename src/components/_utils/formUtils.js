import React, {Component} from "react";

import S from "string";
import {
    Checkbox,
    DatePicker,
    Form,
    Select,
    TimePicker,
} from "../Elements/appUtils";

const FormItem = Form.Item;

const styles = {
    mainDiv: {
        position: "relative",
    },
    loadingBox: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(255, 255,255, 0.5)",
        textAlign: "center",
        paddingTop: "10%",
    },
    selfAlign: {
        display: "flex",
        marginLeft: 5,
        fontWeight: 600,
        fontFamily: "Poppins",
        marginBottom: 5,
    },
    labelRow: {
        display: "flex",
        justifyContent: "space-between",
        color: "#555",
    },
};

class SelectDynamicComp extends Component {
    render() {
        let x = this.props;
        if (!x.item.showSearch) x.item.showSearch = false;
        if (!x.item.disabled) x.item.disabled = false;
        let options = x.item.options;

        let keyAccessor = x.keyAccessor
            ? x.keyAccessor
            : (val) => (val.id ? val.id : val._id);
        let valueAccessor = x.valueAccessor
            ? x.valueAccessor
            : (val) => val.display;


        return <Select {...x} />;

    }
}

class CheckBoxComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItem: "",
        };
    }

    componentWillMount() {
        let {value} = this.props;
        this.setState({
            checkedItem: value ? value : "",
        });
    }

    render() {
        let {options, value, onChange} = this.props;
        let {checkedItem} = this.state;
        return (
            <>
                {options && options.length
                    ? options.map((item, key) => {
                        return (
                            <label
                                key={key}
                                onChange={() => {
                                    this.setState({checkedItem: item}, () => {
                                        onChange(item);
                                    });
                                }}
                                style={{marginRight: 20, cursor: "pointer"}}
                            >
                                <Checkbox
                                    checked={item == checkedItem ? true : false}
                                    style={{marginRight: 10}}
                                />
                                {item}
                            </label>
                        );
                    })
                    : null}
            </>
        );
    }
}

class SimpleFormElement extends Component {
    state = {
        tempFiles: [],
        previewImage: null,
        previewVisible: false,
    };

    section = (type) => {
        let errors;
        let x = this.props;
        let {item, getFieldError} = this.props;
        let {
            placeholder = item.label ? item.label : "",
            multiple = false,
            value,
            onChange,
            urlPath,
            customText,
            customBtn,
            fileName = {},
        } = item;
        switch (type) {
            case "select":
                if (!x.options) x.options = [];
                if (!x.item.defaultValue)
                    x.item.defaultValue = {key: "Please Select"};
                let defaultValue = multiple
                    ? value !== undefined
                        ? value
                        : []
                    : value !== undefined
                        ? value
                        : undefined;
                return (
                    <Select {...x} multiple={multiple} onChange={onChange}/>
                );
            case "textarea":
                return <textarea {...x} {...item} style={{minHeight: 200}}></textarea>;

            case "checkbox":
                return <CheckBoxComponent {...x} onChange={onChange} value={value}/>;
            case "date":
                return (
                    <>
                        <DatePicker
                            {...x}
                            format={item.format}
                            className={"form-control"}
                            onChange={onChange}
                        />
                    </>
                );
            case "time":
                return (
                    <TimePicker
                        {...x}
                        format={item.format}
                        onChange={onChange}
                    />
                );
            case "file":
                return (
                    <>
                        <div className="fileUpload">
                            <input
                                type={`${item.type}`}
                                placeholder={`${placeholder}`}
                                {...x}
                                {...item}
                                className="upload"
                            />

                        </div>
                    </>
                );
            case "custom":
                return (
                    <>
                        <div className="rowFlex">
                            <input
                                type={`${item.type}`}
                                placeholder={`${placeholder}`}
                                {...item}
                                {...x}
                                className="form-control"
                            />
                            {customText ? (
                                <a
                                    className={"linkBtn"}
                                    style={{backgroundColor: "white"}}
                                    target={"_blank"}
                                    // href={urlPath}
                                >
                                    {/*<FaEye></FaEye>*/}
                                    {customText}
                                </a>
                            ) : null}
                        </div>

                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}

                    </>
                );
            default:
                return (
                    <>
                        <input
                            type={`${item.type}`}
                            placeholder={`${placeholder}`}
                            {...item}
                            {...x}
                            className="form-control"
                        />
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
        }
    };

    render() {
        const {item} = this.props;
        const {type, label, extra, required = false, customBtn = "", showStar = false} = item;
        let checkRequired = () => {
            return showStar ? <span style={{color: "red"}}>*</span> : ""
        }

        return (
            <React.Fragment>
                <div className="form-group">
                    <label>{label}</label>
                    {this.section(type)}
                </div>

            </React.Fragment>
        );
    }
}

class getAllFormFields extends Component {
    state = {
        fileUploads: [],
    };

    render() {
        const {
            inputSchema,
            getFieldDecorator,
            children,
            formItemLayout,
            item,
            getFieldError,
        } = this.props;
        let rules = [];

        let FIL = {};

        if (!formItemLayout) {
            FIL = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 8},
                    md: {span: 8},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                    md: {span: 12},
                },
            };
        } else {
            FIL = formItemLayout;
        }

        if (item.required) {
            rules.push({
                required: true,
                message: item.requiredMessage
                    ? item.requiredMessage
                    : `${item.label} a Mandatory Field`,
            });
        }

        if (item.label === undefined) {
            item.label = S(item.key).humanize().titleCase().s;
        }

        let customEvent = {};

        let inputProps = {};

        if (!!item.placeholder) inputProps.placeholder = item.placeholder;

        if (!!item.options) {
            inputProps.options = item.options;
        } else {
            // inputProps.options = ['Choose']
        }

        if (!!item.type) inputProps.type = item.type;
        if (!!item.mode) inputProps.mode = item.mode;
        if (!!item.rows) inputProps.rows = item.rows;
        if (!!item.keyAccessor) inputProps.keyAccessor = item.keyAccessor;
        if (!!item.valueAccessor) inputProps.valueAccessor = item.valueAccessor;
        if (!!item.id) inputProps.id = item.id;
        return (
            <div style={styles.mainDiv}>
                <React.Fragment key={item.key}>
                    {!item.hidden && (
                        <React.Fragment>
                            {item.prefixComp ? item.prefixComp : null}
                            {item.customExtra ? item.customExtra : null}
                            <div
                                {...FIL}
                                key={item.key}
                                style={item.itemStyle}
                                label={item.label}
                                extra={item.extra}
                            >
                                {getFieldDecorator(item.key, {rules, ...customEvent})(
                                    <SimpleFormElement
                                        item={{name: item.key, ...item}}
                                        autoComplete="off"
                                        {...inputProps}
                                        getFieldError={getFieldError}
                                        allowClear={item.allowClear}
                                    />
                                )}
                                {item.rightComp ? item.rightComp : null}
                            </div>
                        </React.Fragment>
                    )}
                </React.Fragment>

                {children}

                {this.props.loading ? (
                    <div style={styles.loadingBox}>{/*<Spin size='large' />*/}</div>
                ) : null}
            </div>
        );
    }
}

export const GetEachFormFields = getAllFormFields;
