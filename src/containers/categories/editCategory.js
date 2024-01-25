import React, {useEffect, useState, useRef} from "react";
import {
    Form,
    HyperLink,
    notification,
} from "../../components/Elements/appUtils";
import {category} from "../../components/_utils/appUtils";
import {FetchCatgory} from "../variants/actions";
import PageHeader from "../../components/Elements/pageHeader";
import {useDispatch} from "react-redux";
import {GetEachFormFields} from "../../components/_utils/formUtils";
import _ from "lodash";
import {useNavigate} from "react-router-dom";
import {singleCategoryFxn, updateCategoryFxn} from "./actions";
import {updateCategoryUrl} from "./api";
import axios from "axios";
import moment from "moment";

const EditCategory = (props) => {
    let tableRef = useRef();
    let {onClose} = props;
    const [formData, setFormData] = useState({
        name: "",
    });
    const [categoryFile, setCategoryFile] = useState("");

    const handleFileChange = (e) => {
        const file = e.files[0];
        setCategoryFile(file);
    };
    const [allCategory, setAllCategory] = useState([])
    const {getFieldValue, setFieldsValue} = props.form;
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [categoryId, setcategoryId] = useState("");
    useEffect(() => {
        checkcategoryId();
    }, []);

    let id;

    const checkcategoryId = async () => {
        let searchParams = new URLSearchParams(window.location.search);
        id = searchParams.get("_id");
        if (id) {
            getSinglecategory(id);
            setcategoryId(id);
        }
    };
    const getSinglecategory = async (id) => {
        let {data, success} = await dispatch(singleCategoryFxn(id));
        if (success) {
            setTimeout(() => {
                props.form.setFieldsValue({
                    name: data.name,
                    menu: data.menu,

                });

            }, 300);


        }
    };
    useEffect(() => {
        handleState();

    }, []);

    const handleState = async () => {
        let x = await FetchCatgory();
        setAllCategory(x.data)
    };

    const handleSubmit = (e) => {
        const {form} = props;
        e.preventDefault();

        form.validateFields(async (err, valData) => {
            if (!err) {
                valData._id = categoryId
                let fd = new FormData();
                fd.append("obj", JSON.stringify(valData));
                if (categoryFile && categoryFile.name) {
                    fd.append("categoryFile", categoryFile);
                }
                let x = await dispatch(updateCategoryFxn(fd));
                if (x && x.success) {
                    navigate('/addCategory')
                }
            } else {
                if (err.name) {
                    notification.warning({
                        message: `Please enter Name`,
                    });
                    return;
                }


                notification.warning({
                    message: "Fill All Required Fields",
                });
            }
        });
    };
    let inputTypes = {
        fields: [
            {
                key: "menu",
                label: "Food Menu",
                span: "col-md-4",
                type: "select",
                options: category,
                keyAccessor: (x) => x.key,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        menu: x,
                    });
                },
            },
            {
                key: "name",
                label: "Name *",
                span: "col-md-4",
                // placeholder: "Name",
            },
            {
                key: "categoryFile",
                label: "Category File",
                required: false,
                type: "file",
                fileName: categoryFile,
                onChange: ({target}) => {
                    handleFileChange(target);
                },
                span: "col-md-4",
            },
        ],
    };


    return (
        <>
            <PageHeader title={"Edit Category"}>
                <div className="card">
                    <div className="card-body">
                        <Form onSubmit={handleSubmit}>
                            <div className="form-elements-wrapper">
                                <div className={"row"}>
                                    {inputTypes.fields.map((item, key) => {
                                        return !item.hidden ? (
                                            <div
                                                className={`${item.span ? item.span : "col-md-6"}`}
                                                key={key}
                                            >
                                                <GetEachFormFields {...props.form} item={item}/>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            <HyperLink
                                className=" ms-4 btn btn-danger"
                                link={"/customerList"}
                            >
                                Cancel
                            </HyperLink>
                        </Form>
                    </div>
                </div>
            </PageHeader>
        </>
    );
};

export default Form.create()(EditCategory);
