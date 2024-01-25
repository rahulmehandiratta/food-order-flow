import React from "react";
import AddCustomerComponent from "../../components/addCustomerComponent";
import PageHeader from "../../components/Elements/pageHeader";
const AddCustomer = (props) => {
    return (
        <PageHeader title={"Add Customer"}>
            <div className="card">
                <div className="card-body">
                    <AddCustomerComponent/>
                </div>
            </div>
            </PageHeader>
      
    );
}

export default AddCustomer;
