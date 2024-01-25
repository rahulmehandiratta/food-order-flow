import React, {Component, useEffect, useState} from "react";
import Table from "rc-table";
import "rc-table/assets/index.css";
import _ from 'lodash'

import memoizeOne from 'memoize-one'
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import faSearch from "./icons/search.svg"
import darkSearch from "./icons/darkSearch.svg"
import "./index.css";

/*
const TableCamp = (props) => {
    let {columns, pagination = {}, data = []} = props;
    return (
        <Table columns={columns} data={data} size={'small'}/>
    )
}
export default TableCamp*/

/*const defaultPagination = {
    defaultPageSize: 10
}*/
const defaultPagination = {
    defaultPageSize: 10, pageSizeOptions: ['10', '25', '50', '100', '200', '500'], position: 'top'
}

class MenuCallback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    setUpdateText = (target) => {
        let value = target && target.value ? target.value : null
        this.setState({searchText: value})
    }

    handleSearch = () => {
        let {searchText} = this.state;
        let {confirm, searchTextName, toggleMenu} = this.props;
        // confirm({[searchTextName]: searchText ? [searchText] : []})
        confirm(searchText, searchTextName)
        toggleMenu()

    }
    handleClear = () => {
        let {handleReset, searchTextName, toggleMenu} = this.props;
        this.setState({
            searchText: ""
        }, () => {
            handleReset(searchTextName)
            toggleMenu()
        })
    }

    render() {
        let {searchText} = this.state;
        return (
            <div className={'filterBtnGroup'}>
                <input type={'text'}
                       placeholder={'Search'}
                       autoFocus={true}
                       className={'searchInput'}
                       value={searchText}
                       onChange={e => this.setUpdateText(e.target)}
                />
                <button className={'btn btn-search'}
                        icon="search"
                        size="small"
                        style={{width: 90, marginRight: 8}}
                        onClick={() => this.handleSearch()}
                >
                    <img src={faSearch} className={'searchIcon'}/> {' '}
                    Search
                </button>
                <button
                    className={'btn btn-reset'}
                    onClick={() => {
                        this.handleClear()
                    }}
                    style={{width: 90}}>
                    Reset
                </button>
            </div>
        )
    }
}

const GetColumnSearchTitleProps = (props) => {
    let {title} = props;
    let [visible, setVisible] = useState(false)
    let toggleMenu = () => {
        setVisible(!visible);
    }
    return (
        <>
            {title}
            <Dropdown
                trigger={['click']}
                visible={visible}
                // onBlur={() => setVisible(false)}
                overlay={<MenuCallback {...props} toggleMenu={toggleMenu}/>}
                animation="slide-up"
                onVisibleChange={(visibleValue) => {
                    toggleMenu()
                }}>
                <button className={'searchBtn'}>
                    <img src={darkSearch} className={'searchIcon'}/>
                </button>
            </Dropdown>
        </>
    )
}

class TableMain extends Component {

    state = {
        data: [],
        size: 'small',
        columns: [],
        pagination: this.props.pagination || defaultPagination,
        loading: true,
        searchText: '',
        dataSearchParams: {},
        selectedKeys: {}
    }

    constructor(props) {
        super(props)
        this.fetch2 = memoizeOne(this.fetch);
        this.setLocal2 = this.setLocal;
        // this.tableRef = React.createRef()

    }

    fetch = async (params = {}) => {
        let cloneA = Object.assign(this.state.selectedKeys, {})
        this.setState({
            loading: true,
            dataSearchParams: params
        })
        params.count = params.results || this.state.pagination.defaultPageSize
        let data = await this.props.apiRequest({...params, ...cloneA})
        let pagination = {...this.state.pagination}
        pagination.total = data.total;
        this.setState({
            loading: false,
            data: data.data,
            pagination,

        })

    }
    setLocal = () => {
        this.setState({
            loading: false,
            data: this.props.dataSource,
        })
    }

    handleSearch = (selectedKeys, confirm) => {
        confirm()
        this.setState({searchText: selectedKeys[0]})
    }


    reload = () => {
        if (!!this.props.apiRequest) {
            this.fetch(this.state.dataSearchParams)
        }
    }

    reloadOnPageChange = () => {
        this.setState({loading: true})
        if (!!this.props.apiRequest) {
            let {pagination} = this.state
            this.fetch({
                results: pagination.defaultPageSize,
                page: pagination.current,
            })
        }
    }

    setDataState = async () => {


    }


    handleReset = (key) => {
        let {selectedKeys} = this.state;
        let cloneObj = Object.assign(selectedKeys, {})
        delete cloneObj[key];
        this.setState({selectedKeys: cloneObj}, () => {
            this.fetch()
        })
    }

    confirmFxn = (value, key) => {
        let {selectedKeys} = this.state;
        let cloneObj = Object.assign(selectedKeys, {})
        if (value) {
            cloneObj[key] = [value]
        } else {
            delete cloneObj[key]
        }
        this.setState({selectedKeys: cloneObj}, () => {
            this.fetch()
        })
    }

    componentDidMount() {
        this.setFieldsDefault()
    }

    setFieldsDefault = () => {
        let {pagination = defaultPagination, apiRequest} = this.props


        let x = []
        _.each(this.props.columns, (i) => {
            if (i.searchTextName) {
                i.placeHolder = `Search ${i.title}`
                i.title = <GetColumnSearchTitleProps
                    {...i}
                    confirm={this.confirmFxn}
                    handleReset={(value) => this.handleReset(value)}
                />
            }

            if (i.dataIndex === undefined && i.key !== 'actions' && i.type !== 'actions') {
                i.dataIndex = i.key
            }

            /*if (i.title === undefined) {
                i.title = S(i.dataIndex).humanize().titleCase().s
            }*/
            x.push(i)

        })

        this.setState({
            columns: x
        })

        if (!!apiRequest) {
            this.fetch2({
                results: pagination.defaultPageSize
            })
        } else {
            this.setLocal2()
        }
    }

    renderDynamic() {
        const {columns, pagination} = this.state
        // console.log(pagination.defaultPageSize, 'lll', typeof pagination.defaultPageSize)
        let {refence = null, extraProps = {}} = this.props
        return (
            <React.Fragment>
                <Table
                    {...extraProps}
                    refence={refence}
                    bordered
                    className={'table text-start align-middle table-hover mb-0 datanew '}
                    columns={columns}
                    rowKey={record => record._id}
                    data={this.state.data}
                />

                <Pagination
                    onChange={(item) => {
                        this.setState({
                            pagination: {
                                ...pagination,
                                current: item
                            }
                        }, () => {
                            this.reloadOnPageChange()
                        })
                    }}
                    defaultPageSize={pagination.defaultPageSize}
                    current={pagination.current || 1}
                    total={pagination.total}
                />
            </React.Fragment>
        )
    }

    renderStatic() {
        const {columns, data} = this.state
        const {refence = null, extraProps = {}} = this.props;
        return (
            <Table
                {...extraProps}
                refence={refence}
                bordered
                className={'table text-start align-middle table-hover mb-0 data-table'}
                columns={columns}
                data={data}
            />
        )
    }

    render() {
        const {apiRequest} = this.props
        return (
            <React.Fragment>
                {!!apiRequest ? this.renderDynamic() : this.renderStatic()}
            </React.Fragment>
        )
    }

}


export default TableMain
