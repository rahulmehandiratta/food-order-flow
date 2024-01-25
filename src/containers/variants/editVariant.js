import React, {useEffect, useState} from "react";
import {
    Form,
    HyperLink,
    notification,
} from "../../components/Elements/appUtils";
import {FetchCatgory} from "./actions";
import PageHeader from "../../components/Elements/pageHeader";
import {useDispatch} from "react-redux";
import {GetEachFormFields} from "../../components/_utils/formUtils";
import {useNavigate} from "react-router-dom";
import {singleVarientFxn, updateVarientFxn} from "./actions";

const EditVariant = (props) => {
    const [allCategory, setAllCategory] = useState([])
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [variantId, setVariantId] = useState("");
    useEffect(() => {
        checkVariantId();
    }, []);

    let id;

    const checkVariantId = async () => {
        let searchParams = new URLSearchParams(window.location.search);
        id = searchParams.get("_id");
        if (id) {
            getSingleVariant(id);
            setVariantId(id);
        }
    };
    const getSingleVariant = async (id) => {
        let {data, success} = await dispatch(singleVarientFxn(id));
        if (success) {
            setTimeout(() => {
                props.form.setFieldsValue({
                    name: data.name,
                    category: data.category,
                });

            }, 300);


        }
    };
    useEffect(() => {
        handleState();

    }, []);

    const handleState = async () => {
        let x = await FetchCatgory({results: 1000});
        setAllCategory(x.data)
    };

    const handleSubmit = (e) => {
        const {form} = props;
        e.preventDefault();

        form.validateFields(async (err, valData) => {
            if (!err) {

                valData._id = variantId

                let x = await dispatch(updateVarientFxn(valData));
                if (x && x.success) {
                    navigate('/addVariant')
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
                label: "Variant Name",
                span: "col-md-4",
                placeholder: "Variant Name",
                type: "text",

            },
            {
                key: "category",
                label: "Select Category",
                placeholder: "Please Choose Menu",
                type: "select",
                showStar: true,
                span: "col-md-4",
                options: allCategory,
                multiple: true,
                keyAccessor: (x) => x._id,
                valueAccessor: (x) => `${x.name}`,
                onChange: (x) => {
                    props.form.setFieldsValue({
                        category: x,
                    });
                },
            },

        ]

    };


    return (
        <>
            <PageHeader title={"Edit Varient"}>
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

export default Form.create()(EditVariant);
