import React, {useEffect, useState} from "react"
import {Card} from "../../../components/Elements/appUtils";
import {tableListFxn} from "../actions";
import {useNavigate} from "react-router-dom";

const PosTables = (props) => {
    const navigate = useNavigate();

    let [tableList, setTableList] = useState([])
    let loadTables = async () => {
        let {data} = await tableListFxn();
        setTableList(data);
    }
    useEffect(() => {
        loadTables()
    }, [])

    const openTable = (key) => {
        navigate(`/pos/${key}`)
    }

    return (
        <>
            <Card>
                <div className={'rest-table-box'}>
                    {tableList && tableList.length ? tableList.map((item) => {
                        return (
                            <div key={item.name}>
                                <div className={'tab-header'}>
                                    <span>{item.name}</span>
                                </div>
                                <div className={'table-list'}>
                                    {item.tables.map((eachTable) => {
                                        return (
                                            <div className={`tab-box ${eachTable.totalAmount ? "selected" : ""}`}
                                                 key={eachTable.key} onClick={() => {
                                                openTable(eachTable.key)
                                            }}>
                                                {eachTable.name}
                                                {eachTable.totalAmount ? <div className={'price'}>
                                                    <strong>Rs. {eachTable.totalAmount}</strong>
                                                </div> : null}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }) : null}
                </div>
            </Card>
        </>
    )
}
export default PosTables
