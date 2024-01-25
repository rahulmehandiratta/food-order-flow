import React, {Component, useState} from "react";
import Table from "rc-table";
import "rc-table/assets/index.css";
import "./index.css";
import {Button} from "react-bootstrap";
import {FaSearch, FaServer} from "react-icons/fa";
import _ from 'lodash'
import memoizeOne from 'memoize-one'
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';


/*
const TableCamp = (props) => {
    let {columns, pagination = {}, data = []} = props;
    return (
        <Table columns={columns} data={data} size={'small'}/>
    )
}
export default TableCamp*/
const MenuCallback = (props) => {
    let [visible, setVisible] = useState(false);
    let {title} = props;
    return (
        <div className={'filterBtnGroup'}>
            <input type={'text'}
                   placeholder={`Search ${title}`}
                   autoFocus={visible}
                   className={'searchInput'}
                   onChange={(e) => {
                       console.log(e.target.value)
                   }}
                /*value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm)}*/
            />
            <Button className={'btn btn-search'}
                // onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}>
                <FaSearch/> {' '}
                Search
            </Button>
            <button
                className={'btn btn-reset'}
                onClick={() => {
                    //console.log(clearFilters)
                    // this.handleReset(clearFilters)
                }}
                style={{width: 90}}>
                Reset
            </button>
        </div>
    )
}
const GetColumnSearchTitleProps = (props) => {
    let {title} = props;
    return (
        <>
            {title}
            <Dropdown
                // visible={visible}
                trigger={['click']}
                overlay={<MenuCallback {...props}/>}
                animation="slide-up"
                onVisibleChange={(visibleValue) => {

                }}>
                <button className={'searchBtn'}>
                    <FaSearch/>
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
        pagination: {},
        loading: true,
        searchText: '',
        dataSearchParams: {}
    }

    constructor(props) {
        super(props)
        this.fetch2 = memoizeOne(this.fetch);
        // this.tableRef = React.createRef()
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination}
        pager.current = pagination.current
        this.setState({
            pagination: pager
        })
        this.fetch2({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        })
    }

    fetch = async (params = {}) => {

        this.setState({
            loading: true,
            dataSearchParams: params
        })
        params.count = params.results

        let data = await this.props.apiRequest({...params})

        let pagination = {...this.state.pagination}
        pagination.total = data.total;
        console.log(data, '+++++++++++')
        this.setState({
            loading: false,
            data: data.data,
            pagination

        })

    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    size="small"
                    style={{width: 90}}
                >
                    <FaSearch/>
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <FaSearch style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <>{this.state.searchText}</>
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm()
        this.setState({searchText: selectedKeys[0]})
    }

    handleReset = (clearFilters) => {
        clearFilters()
        this.setState({searchText: ''})
    }

    reload = () => {

        if (!!this.props.apiRequest) {
            this.fetch(this.state.dataSearchParams)
        }

    }

    setDataState = async () => {


    }

    componentDidMount() {

        let {pagination, apiRequest} = this.props

        if (!pagination) {
            pagination = {
                defaultPageSize: 10
            }
        }

        let x = []
        _.each(this.props.columns, (i) => {


            if (i.searchTextName) {
                i.title = <GetColumnSearchTitleProps {...i}/>
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
        }

    }

    renderDynamic() {
        const {columns, pagination, current} = this.state
        const {extraProps, reloadButon} = this.props
        return (
            <React.Fragment>
                <div style={{marginBottom: 10}}>
                    {reloadButon ?
                        <Button
                            shape="circle" onClick={() => {
                            this.reload()
                        }} icon="reload"/> : null}
                </div>

                <Table
                    bordered
                    {...extraProps}
                    columns={columns}
                    rowKey={record => record._id}
                    size={this.state.size}
                    data={this.state.data}
                    /*pagination={{
                        ...this.state.pagination,
                        defaultPageSize: 10,
                        pageSizeOptions: ['10', '25', '50', '100'],
                        showSizeChanger: true,
                        ...this.props.pagination
                    }}*/
                    onChange={this.handleTableChange}
                    loading={this.state.loading}
                />

                <Pagination
                    onChange={(item) => {
                        this.setState({
                            pagination: {...pagination, current: item}
                        }, () => {
                            this.reload()
                        })
                    }}
                    current={current || 1}
                    total={pagination.total}
                />


            </React.Fragment>
        )
    }

    renderStatic() {
        const {columns} = this.state
        const {extraProps, dataSource, reloadButon} = this.props
        return (
            <React.Fragment>

                <div style={{marginBottom: 10}}>
                    {reloadButon ?
                        <Button
                            shape="circle" onClick={() => {
                            this.reload()
                        }} icon="reload"/> : null}
                </div>

                <Table
                    bordered
                    {...extraProps}
                    columns={columns}
                    rowKey={record => record._id}
                    size={this.state.size}
                    data={dataSource}
                    pagination={{
                        ...this.state.pagination,
                        defaultPageSize: 10,
                        pageSizeOptions: ['10', '25', '50', '100'],
                        showSizeChanger: true,
                        ...this.props.pagination
                    }}
                    onChange={() => {

                    }}
                    loading={this.props.loading}
                />

            </React.Fragment>
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
