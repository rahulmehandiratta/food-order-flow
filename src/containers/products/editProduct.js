import React, {useEffect, useState} from "react";
import {
    Form,
    HyperLink,
    notification,
    InputBox,
    Card
} from "../../components/Elements/appUtils";
import {FetchCatgory} from "../variants/actions";
import {Boolean} from "../../components/_utils/_utils";
import PageHeader from "../../components/Elements/pageHeader";
import {useDispatch} from "react-redux";
import {FetchVariants} from "../variants/actions";
import {GetEachFormFields} from "../../components/_utils/formUtils";
import _, {update} from "lodash";
import {useNavigate} from "react-router-dom";
import {singleProductFxn, updateProductFxn} from "./actions";
import {category} from "../../components/_utils/appUtils";
import {vegNonVeg} from "../../components/_utils/_utils";
import moment from "moment";

const EditProduct = (props) => {
    let {onClose} = props;
    const [formData, setFormData] = useState([
        {variantId: "", price: "", name: ""},
    ]);
    const [allCategory, setAllCategory] = useState([])
    const [productFile, setproductFile] = useState("");
    const [showDeleteButtons, setShowDeleteButtons] = useState([false]);
    const [variant, setVariant] = useState([]);
    const {getFieldValue, setFieldsValue} = props.form;
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [productId, setproductId] = useState("");
    useEffect(() => {
        checkproductId();
        getVariant();
    }, []);

    const getVariant = (params) => {
        return new Promise(async (resolve) => {
            try {
                const data = await FetchVariants({...params});
                resolve(data);
                setVariant(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };


    let id;

    const handleInputChange = (index, field, value) => {
        const newData = [...formData];
        newData[index][field] = value;
        setFormData(newData);
        setShowDeleteButtons((prevButtons) =>
            prevButtons?.map((btn, idx) => (idx === index ? true : btn))
        );
    };

    const handleDelete = (index) => {
        const newPayments = [...formData];
        newPayments.splice(index, 1);
        setFormData(newPayments);
        setShowDeleteButtons((prevButtons) =>
            prevButtons?.filter((_, idx) => idx !== index)
        );
    };

    const handleAddField = () => {
        let lastData = {};
        if (formData && formData.length) {
            lastData = formData[formData.length - 1];
            if (!lastData.variantId) {
                notification.warning({message: "Please Choose Variant"});
                return;
            }
            if (!lastData.price) {
                notification.warning({message: "Please Enter Price"});
                return;
            }
        }

        setFormData([...formData, {variantId: "", price: "", name: ""}]);

        setShowDeleteButtons([...showDeleteButtons, true]);
    };
    const handleFileChange = (e) => {
        const file = e.files[0];
        setproductFile(file);
    };

    const checkproductId = async () => {
        let searchParams = new URLSearchParams(window.location.search);
        id = searchParams.get("_id");
        if (id) {
            getSingleproduct(id);
            setproductId(id);
        }
    };
    const getSingleproduct = async (id) => {
        let {data, success} = await dispatch(singleProductFxn(id));
        if (success) {
            setTimeout(() => {
                props.form.setFieldsValue({
                    name: data.name,
                    code: data.code,
                    price: data.price,
                    categoryId: data.categoryId,
                    gst: data.gst,
                    vegNonVeg: data.vegNonVeg,
                    coupon: data.coupon
                })
                setFormData(data.variants)
            }, 300);


        }
    };
    useEffect(() => {
        handleState();

    }, []);

    const handleState = async () => {
        let x = await FetchCatgory({results: 500});
        setAllCategory(x.data)
    };

    const handleSubmit = (e) => {
        const {form} = props;
        e.preventDefault();

        form.validateFields(async (err, valData) => {
            if (!err) {
                valData._id = productId
                valData.variants = formData;
                let fd = new FormData();
                fd.append("obj", JSON.stringify(valData));
                if (productFile && productFile.name) {
                    fd.append("productFile", productFile);
                }

                let x = await dispatch(updateProductFxn(fd));
                if (x && x.success) {
                    navigate('/productList')
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
                key: "name",
                label: "Name *",
                span: "col-md-4",
                // placeholder: "Name",
            },
            {
                key: "categoryId",
                label: "Select Category *",
                span: "col-md-4",
                // placeholder: "Categories",
                type: "select",
                options: allCategory,
                showSearch: true,
                keyAccessor: (x) => x._id,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        categoryId: x,
                    });
                },
            },
            {
                key: "code",
                label: "Code *",
                span: "col-md-4",
                // placeholder: "Product Code",
            },
            {
                key: "price",
                label: "Price *",
                type: "number",
                span: "col-md-4",
                // placeholder: "Price",
                hidden: getFieldValue("type") === "Product",
            },
            {
                key: "gst",
                label: "GST*",
                span: "col-md-4",
                // placeholder: "GST Rate",
                type: "select",
                options: Boolean,
                showSearch: true,
                keyAccessor: (x) => x.value,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        gst: x,
                    });
                },
                // required: true,
            },
            {
                key: "coupon",
                label: "Apply-Discount/Coupon*",
                span: "col-md-4",
                // placeholder: "GST Rate",
                type: "select",
                options: Boolean,
                showSearch: true,
                keyAccessor: (x) => x.value,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        coupon: x,
                    });
                },
                // required: true,
            },
            {
                key: "vegNonVeg",
                label: "Veg/Non-Veg/Egg*",
                span: "col-md-4",
                type: "select",
                options: vegNonVeg,
                showSearch: true,
                keyAccessor: (x) => x.name,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        vegNonVeg: x,
                    });
                },
                // required: true,
            },

            {
                key: "productFile",
                label: "Product File",
                required: false,
                type: "file",
                fileName: productFile,
                onChange: ({target}) => {
                    handleFileChange(target);
                },
                span: "col-md-4",
            },
        ],
    };


    return (
        <>
            <PageHeader title={"Edit Product"}>
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
                            <Card title={"Variants"} size={"small"}>
                                <div>
                                    <div>
                                        {formData?.map((data, index) => (
                                            <div key={index} className={"row"}>
                                                <div className={"col-md-3"}>
                                                    <InputBox title={"Variants"}>
                                                        <select
                                                            className="form-control"
                                                            value={data.variantId}
                                                            onChange={(e) => {
                                                                e = JSON.parse(e.target.value);
                                                                handleInputChange(index, "variantId", e._id);
                                                                handleInputChange(index, "name", e.name);
                                                            }}
                                                            required="true"
                                                        >
                                                            <option value="">
                                                                {data.variantId
                                                                    ? ` ${data.name}`
                                                                    : "Select Variant"}
                                                            </option>
                                                            {variant?.map((item) => (
                                                                <option key={item._id} value={JSON.stringify(item)}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </InputBox>
                                                </div>
                                                <div className={"col-md-3"}>
                                                    <InputBox title={"Price"}>
                                                        <input
                                                            className={"form-control"}
                                                            type="number"
                                                            value={data.price}
                                                            onChange={(e) =>
                                                                handleInputChange(index, "price", e.target.value)
                                                            }
                                                            placeholder="Amount"
                                                        />
                                                    </InputBox>
                                                </div>
                                                <div className={"col-md-3"}>
                                                    <InputBox className="deleteBtn">
                                                        <div key={index} className={"item-flex mt-3"}>
                                                            {index > 0 &&
                                                            showDeleteButtons[index] && ( // Condition added to not show delete button for zero index
                                                                <a
                                                                    className="empty_btn"
                                                                    onClick={() => handleDelete(index)}
                                                                >
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </InputBox>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <InputBox className={"pb-2"}>
                                            <a className="addBtn  btn-link" onClick={handleAddField}>
                                                Add More
                                            </a>
                                        </InputBox>
                                    </div>
                                </div>
                            </Card>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                            <HyperLink
                                className=" ms-4 btn btn-danger"
                                link={"/productList"}
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

export default Form.create()(EditProduct);
