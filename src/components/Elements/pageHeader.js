import React from "react";
import { HyperLink } from "./appUtils";

const PageHeader = (props) => {
    let {children, title, extraLink} = props;
    return (
        <>
          <div className="page-header" >
    <h3 className="page-title" style={{ display: 'flex' }}>{title}</h3>
    {extraLink && extraLink.length ? (
        <div >
            {extraLink.map((item) => (
                <HyperLink className="btn btn-outline-info btn-sm" link={item.link} key={item.link}>
                    {item.name}
                </HyperLink>
            ))}
        </div>
    ) : null}
</div>
            {children}
        </>
    )
}
export default PageHeader
