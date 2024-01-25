import React, {useRef, useState} from "react";
// import { customAxios as axios, getToken } from "../../request";
import {useNavigate} from "react-router-dom";
import {
    Form,
    InputBox,
    Table,
    notification, Card,
} from "../../components/Elements/appUtils";
import {category, categoryType} from "../../components/_utils/appUtils";
import PageHeader from "../../components/Elements/pageHeader";
import {GetEachFormFields} from "../../components/_utils/formUtils";
import {appAxios as axios} from "../../request";
import {fetchCategory} from "./actions";
import {addCategoryUrl} from "./api";
import Image from "../../edit (1).png"

function AddCategory(props) {
    let tableRef = useRef();
    const {getFieldValue} = props.form;

    const [formData, setFormData] = useState({
        name: "",
    });
    const [categoryFile, setCategoryFile] = useState("");

    const handleFileChange = (e) => {
        const file = e.files[0];
        setCategoryFile(file);
    };
    const navigate = useNavigate();
    const handleChange = (e, fieldName) => {
        const {value} = e.target;
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleSubmit = async (e) => {
        const {form} = props;

        e.preventDefault();
        console.log(formData, "formdata");
        form.validateFields(async (err, valData) => {
            if (!err) {
                if (!valData.menu) {
                    notification.warning({message: "Please select menu"});
                    return;
                }
                if (!valData.name) {
                    notification.warning({message: "Enter Name"});
                    return;
                }

                /*  if (!(categoryFile && categoryFile.name)) {
                    notification.warning({
                      message: "Choose select Category-file",
                    });
                    return;
                  }*/
                let fd = new FormData();
                fd.append("obj", JSON.stringify(valData));
                if (categoryFile && categoryFile.name) {
                    fd.append("categoryFile", categoryFile);
                }

                const response = await axios.post(addCategoryUrl(), fd);
                if (response.data.success) {
                    notification.success({
                        message: response.data.message || "Success",
                    });
                    form.setFieldsValue({name: "", menu: undefined});

                    setCategoryFile("");

                    tableRef.current.reload();
                } else {
                    notification.error({message: response.data.message});
                }
            }
        });

        // Send the data to the backend using Axios
    };
    // const handleSubmit = async (e) => {
    //     const { form } = props;

    //     e.preventDefault();
    //     console.log(formData, "formdata");

    //     if (!formData.name) {
    //         notification.warning({message: "Enter Category Name"});
    //         return;
    //     }
    //     if (!(categoryFile && categoryFile.name)) {
    //         notification.warning({
    //           message: "Choose select Product-file",
    //         });
    //         return;
    //       }
    //     // Send the data to the backend using Axios
    //     const response = await axios.post(addCategoryUrl(), formData);
    //     if (response.data.success) {
    //         notification.success({
    //             message: response.data.message || "Success",
    //         });
    //         setFormData({name: ""});
    //         tableRef.current.reload();
    //     } else {
    //         notification.error({message: response.data.message});
    //     }
    // };

    const apiRequest = (params) => {
        return new Promise(async (resolve) => {
            try {
                const data = await fetchCategory({...params});
                resolve(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    };

    const columns = [
        {
            title: "Food Menu",
            dataIndex: "menu",
            key: "menu",
        },
        {
            title: "Category Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (v, item) => {
                return (
                    <>

                        <a onClick={() => {
                            navigate(`/editCategory?_id=${item._id}`)
                        }}>

                            <img src={Image} style={{height: '20px', width: '20px'}}/>
                        </a>

                    </>
                );
            },
        },
    ];
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
        <PageHeader title={"Categories"}>
            <Form onSubmit={handleSubmit}>
                <div className="form-elements-wrapper">
                    <div className="card-body">
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
                    </div>
                    {/* <Card title={"Varients"} size={"small"}>
            <div>
              <div>
                {formData?.map((data, index) => (
                  <div key={index} className={"row"}>
                    <div className={"col-md-3"}>
                      <InputBox title={"Varients"}>
                        <select
                          className="form-control"
                          value={data.varientId}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "varientId",
                              e.target.value
                            )
                          }
                          required="true"
                        >
                          <option value="">Select Varient</option>
                          {variant?.map((item) => (
                            <option key={item._id} value={item._id}>
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
          </Card> */}
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </Form>
            <div class="row mt-3">
                <div class="col-lg-12 grid-margin stretch-card">
                    <Card title={'Category List'}>
                        <Table apiRequest={apiRequest} columns={columns} ref={tableRef}/>
                    </Card>
                </div>
            </div>
        </PageHeader>
    );
}

export default Form.create()(AddCategory);
