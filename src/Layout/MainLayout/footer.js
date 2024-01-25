import React from "react"
import {Helmet} from "react-helmet";
const Footer = (props) => {
    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="rounded-top p-4">
                    <div className="row">
                        <div className="col-12 col-sm-6 text-center text-sm-start">

                        </div>
                    </div>
                </div>
            </div>
            <Helmet>
                <script src="../assets/js/script.js" type="text/javascript"/>
            </Helmet>
        </>
    )
}
export default Footer
