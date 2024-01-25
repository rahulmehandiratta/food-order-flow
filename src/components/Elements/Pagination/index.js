import React, {useEffect, useState} from "react";

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const PaginationComponent = (props) => {
    let {total, page, onSubmit} = props;
    return (
        <Pagination
            onChange={(item) => {
                onSubmit(item);
            }}
            current={page || 1}
            total={total}
        />
    )
}
export default PaginationComponent
