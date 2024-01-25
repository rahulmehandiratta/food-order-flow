import React from "react";
import CustomerListComponent from "../../components/customerListComponent";
import PageHeader from "../../components/Elements/pageHeader";
const CustomerList = (props) => {
    return (
        <PageHeader
      title={"Customer"}
      extraLink={[
        {
          name: "Add Customer",
          link: "/add-customer",
        },
      ]}
    >
            <div className="card">
                <div className="card-body">
                    <CustomerListComponent/>
                </div>
            </div>
            </PageHeader>
      
    );
}

export default CustomerList;
