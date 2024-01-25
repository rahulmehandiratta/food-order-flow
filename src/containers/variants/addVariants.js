import React, {useState, useRef, useEffect} from "react";
import {
    InputBox,
    Form,
    Table,
    notification,
} from "../../components/Elements/appUtils";
import {addVariantUrl} from "./api";
import {FetchVariants} from "./actions";
import {FetchCatgory} from "./actions";
import PageHeader from "../../components/Elements/pageHeader";
import axios from "axios";
import {categoryType} from "../../components/_utils/appUtils";
import {GetEachFormFields} from "../../components/_utils/formUtils";
import {fetchCategory} from "../categories/actions";

function AddVariant(props) {
    let tableRef = useRef();
    const [formData, setFormData] = useState({
        name: "",
    });
    const [allCategory, setAllCategory] = useState([])
    const handleChange = (e, fieldName) => {
        const {value} = e.target;
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };


    const handleSubmit = (e) => {
        const {form} = props;
        e.preventDefault();
        form.validateFields(async (err, valData) => {
            if (!err) {
                if (!valData.name) {
                    notification.warning({message: "Enter name"})
                    return
                }

                const response = await axios.post(addVariantUrl(), valData);
                if (response.data.success) {
                    props.form.setFieldsValue({
                        name: "",
                        category: [],
                        categoryType: []

                    });
                    notification.success({
                        message: response.data.message || "Success",
                    });

                    tableRef.current.reload();
                } else {
                    notification.error({message: response.data.message});
                }
            }
        });
    };
    useEffect(() => {
        handleState();

    }, []);

    const handleState = async () => {
        let x = await FetchCatgory();
        setAllCategory(x.data)
    };
    const apiRequest = (params) => {
        return new Promise(async (resolve) => {
            try {
                const data = await FetchVariants({...params});
                resolve(data);
                console.log(data, "dara");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text, record) => <div>
                {
                    record.category.map((item) => {
                        return (
                            <>
                                <div>{item.name}</div>
                            </>
                        )
                    })
                }

            </div>
        },
    ];

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
            /*  {
                  key: "categoryType",
                  label: "Select Category Type",
                  placeholder: "Please Choose Category Type",
                  type: "select",
                  showStar: true,
                  span: "col-md-4",
                  options: categoryType,

                  keyAccessor: (x) => x.key,
                  valueAccessor: (x) => `${x.name}`,
                  onChange: (x) => {
                      props.form.setFieldsValue({
                          categoryType: x,
                      });
                  },
              }*/
        ]

    };

    return (
        <PageHeader title={"Variants"}>
            <Form onSubmit={handleSubmit}>
                <div class="card">
                    <div class="card-body">
                        <div class="form-elements-wrapper">
                            <div className={"row"}>
                                {inputTypes.fields.map((item, key) => {
                                    return (
                                        <div
                                            className={`${item.span ? item.span : "col-md-6"}`}
                                            key={key}
                                        >
                                            <GetEachFormFields {...props.form} item={item}/>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        <button className="btn btn-success">
                            SUBMIT
                        </button>
                    </div>
                </div>
            </Form>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <Table apiRequest={apiRequest} columns={columns} ref={tableRef}/>
                        </div>
                    </div>
                </div>
            </div>
        </PageHeader>
    );
}

export default Form.create()(AddVariant);
