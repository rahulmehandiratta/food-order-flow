import React, {useState, useEffect} from "react";
import {
    Form,
    HyperLink,
    notification,
    Card
} from "../../components/Elements/appUtils";
import {useNavigate} from "react-router-dom";
import {gst, gstRate, types, vegNonVeg} from "../../components/_utils/_utils";
import {GetEachFormFields} from "../../components/_utils/formUtils";
import PageHeader from "../../components/Elements/pageHeader";
import {useDispatch} from "react-redux";
// import { FetchBrand, addProductFxn, getCategory } from "./actions";
import {States} from "../../components/_utils/appUtils";
import _ from "lodash";
import {addProductFxn} from "./actions";
import {fetchCategory} from "../categories/actions";

// import { getItemLocalstorage } from "../../components/_utils/_utils";

function AddProduct(props) {
//   const userType = getItemLocalstorage("user")["userType"];
    const {getFieldValue} = props.form;
    let {onClose = null} = props;
    console.log(getFieldValue("type"));

    let dispatch = useDispatch();
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    console.log(category, "this is category");

    const api = (params) => {
        return new Promise(async (resolve) => {
            try {
                const data = await fetchCategory({...params});
                resolve(data);
                setCategory(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };

    useEffect(() => {
        api();
    }, []);

    const handleSubmit = async (e) => {
        const {form} = props;
        e.preventDefault();
        form.validateFields(async (err, valData) => {
            if (!err) {

                if (!valData.name) {
                    notification.warning({message: "Enter Name"});
                    return;
                }
                if (!valData.categoryId) {
                    notification.warning({message: "Choose Category"});
                    return;
                }
                if (!valData.code) {
                    notification.warning({message: "Enter Code"});
                    return;
                }
                if (!valData.price) {
                    notification.warning({message: "Enter Price"});
                    return;
                }
                if (!valData.gst) {
                    notification.warning({message: "Choose GST"});
                    return;
                }
                if (!valData.coupon) {
                    notification.warning({message: "Choose Coupon"});
                    return;
                }
                if (!valData.serviceTax) {
                    notification.warning({message: "Choose Service Tax"});
                    return;
                }
                if (!valData.vegNonVeg) {
                    notification.warning({message: "Choose Veg/Non-Veg"});
                    return;
                }
                console.log(valData, "this is product data");

                let x = await dispatch(addProductFxn(valData));
                if (x && x.success) {
                    props.form.setFieldsValue({});
                    if (onClose) {
                        window.location.reload();
                        onClose();
                    }
                    props.form.setFieldsValue({
                        name: "",
                        categoryId: "",
                        code: "",
                        price: "",
                    });

                    /* setTimeout(() => {
                         navigate("/productList");
                     }, 1000);*/
                }
            }
        });
    };

    let inputTypes = {
        fields: [

            {
                key: "name",
                label: "Product Name *",
                span: "col-md-4",
                // placeholder: "Name",
            },
            {
                key: "categoryId",
                label: "Select Category *",
                span: "col-md-4",
                // placeholder: "Categories",
                type: "select",
                options: category,
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
                options: gst,
                showSearch: true,
                keyAccessor: (x) => x.name,
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
                options: gst,
                showSearch: true,
                keyAccessor: (x) => x.name,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        coupon: x,
                    });
                },
                // required: true,
            },
            {
                key: "serviceTax",
                label: "Service Tax*",
                span: "col-md-4",
                // placeholder: "GST Rate",
                type: "select",
                options: gst,
                showSearch: true,
                keyAccessor: (x) => x.name,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        serviceTax: x,
                    });
                },
                // required: true,
            },
            {
                key: "vegNonVeg",
                label: "Veg/Non-Veg*",
                span: "col-md-4",
                // placeholder: "GST Rate",
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
        ],
    };

    return (
        <PageHeader title={"Add Product"}>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <div className={"row"}>
                        {inputTypes.fields.map((item, key) => {
                            return !item.hidden ? (
                                <div className={`${item.span ? item.span : "col-md-6"}`}
                                     key={key}>
                                    <GetEachFormFields {...props.form} item={item}/>
                                </div>
                            ) : null;
                        })}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <HyperLink className=" ms-4 btn btn-danger" link={"/product-list"}>
                        Cancel
                    </HyperLink>
                </Form>
            </Card>
        </PageHeader>
    );
}

export default Form.create()(AddProduct);
