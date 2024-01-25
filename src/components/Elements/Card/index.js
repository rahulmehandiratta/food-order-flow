import React from "react";
import {TableButton} from "../appUtils";

const CardOld = (props) => {
    let {
        title,
        description,
        children,
        actions,
        className = "",
        rightContent = null,
        type = "default",
        cardStyle = "",
        padding = true,
        customStyle = {},
        bordered = false,
        extraBtn = [],
        shadow = true
    } = props;

    return (
        <div className={`information-box card-box ${padding ? "p-4" : ""}  mb-4 ${shadow ? "shadow" : ""}`}>
            {extraBtn && extraBtn.length ?
                <>
                    <div className="inner-head">
                        <h4>{title}</h4>
                        <div style={{display: "flex", marginLeft: "auto"}}>
                            {
                                extraBtn.map((item) => {
                                    return (
                                        item.type == 'icon' ?
                                            <>
                                                <TableButton
                                                    type={item.btnType}
                                                    className={'cardIcon'}
                                                    onClick={() => {
                                                        if (item && item.action) {
                                                            item.action()
                                                        }
                                                    }}/>
                                            </> :
                                            <>
                                                <a className="btn blue-btn" key={item.name} style={{marginLeft: 10}}
                                                   onClick={() => {
                                                       if (item && item.action) {
                                                           item.action()
                                                       }
                                                   }}
                                                >{item.name}</a>
                                            </>
                                    )
                                })
                            }
                        </div>

                    </div>
                </> :
                <>
                    {title ? <h4>{title}</h4> : ""}
                </>}

            {children}

        </div>
    );
};
const Card = (props) => {
    let {
        title,
        description,
        children,
        actions,
        className = "",
        rightContent = null,
        type = "default",
        cardStyle = "",
        padding = true,
        customStyle = {},
        bordered = false,
        extraBtn = [],
        shadow = true
    } = props;

    return (
        <div className="card">
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

const InnerCard = (props) => {
    let {
        children,
        className = "",
    } = props;
    return (
        <>
            <div className={`card-box border-grey p-4 mb-4`}>
                {children}
            </div>
        </>
    )
}
const TableCard = (props) => {
    let {
        children,
        className = "",
        title = "",
        extraBtn = {},
        padding = true,
        borderDark = false
    } = props;
    return (
        <>
            <div className={'table_div'}>
                <div
                    className={`card-box ${borderDark ? "border-dark" : "border-grey"} text-center table-data-box ${padding ? "py-4" : ""}`}>
                    {title ? <div
                        className="d-flex align-items-center justify-content-between mb-4 gap-3 flex-wrap px-4 flex-wrap">
                        {extraBtn && extraBtn.length ?
                            <>
                                <h6 className="mb-0">{title}</h6>

                                <div style={{display: "flex", marginLeft: "auto"}}>
                                    {
                                        extraBtn.map((item) => {
                                            return (
                                                <a className="btn blue-btn" key={item.name} style={{marginLeft: 10}}
                                                   onClick={() => {
                                                       if (item && item.action) {
                                                           item.action()
                                                       }
                                                   }}
                                                >{item.name}</a>
                                            )
                                        })
                                    }
                                </div>
                            </> :
                            <>
                                {title ? <h6 className="mb-0">{title}</h6> : null}
                            </>}
                    </div> : null}

                    <div className="table-responsive">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
Card.InnerCard = InnerCard;
Card.TableCard = TableCard;
