import React, { Component } from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Card,
  CardBody,
} from "reactstrap"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import ReactPaginate from "react-paginate"
import Modal from "./DataDetailConfig"

import Toggle from "react-toggle"
import "react-toggle/style.css"
//import "../../../assets/scss/pages/users.scss"
//import { history } from "../../../history"

//import { url } from "../../../utility/context/url"
//import { axiosAuth as axios } from "../../../utility/axios"
import Spinner from "@components/spinner/Loading-spinner"
import {
  Edit,
  ChevronDown,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Eye,
  X,
  Check,
} from "react-feather"
import { connect } from "react-redux"
import moment from "moment"
// import {
//   getProfessionalUsers,
//   toggleProfessionalStatus,
//   getProfessionalDetails,
// } from "../../../redux/actions/professionalUsers"

// import { handleGetUsers } from "../../redux/actions/user"

// import "../../../assets/scss/plugins/extensions/react-paginate.scss"
// import "../../../assets/scss/pages/data-list.scss"
//import Spinner from "../../../components/@vuexy/spinner/Fallback-spinner"

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
}

const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap"></div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">
              {`${props.index[0]} - ${props.index[1]} of ${props.total}`}
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(4)}>
              4
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="filter-section">
          <Input
            type="text"
            value={props.value}
            onChange={(e) => props.handleFilter(e)}
          />
        </div>
      </div>
    </div>
  )
}

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action" title="View">
      <Eye
        className="cursor-pointer text-danger"
        size={20}
        onClick={() => {
          console.log(props)
          //props.toggleModal();
          props.getDetail(props.row.professional_id)
          history.push(`/professional-details/${props.row.professional_id}`)
          // props.deleteRow(props.row.faq_id);
        }}
      />
    </div>
  )
}

class DataListConfig extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.dataList.length !== state.data.length || true) {
      return {
        data: props.dataList,
        profession_list: props.profession_list,
        category_list: props.category_list,
        //allData: props.dataList.filteredData,
        totalPages: props.totalPages,
        // currentPage: parseInt(props.parsedFilter.page) - 1,
        // rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.totalRecords,
        sortIndex: [props.start, props.end],
      }
    }

    // Return null if the state hasn't changed
    return null
  }

  state = {
    loading: false,
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        minWidth: "350px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.firstname}
                className="d-block text-bold-500 text-truncate mb-0"
              >
                {row.firstname} {row.lastname}
              </span>
            </div>
          </div>
        ),
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        minWidth: "350px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.email}
                className="d-block text-bold-500 text-truncate mb-0"
              >
                {row.email}
              </span>
            </div>
          </div>
        ),
      },

      // {
      //   name: "Mobile",
      //   selector: "mobile_no",
      //   sortable: true,
      //   minWidth: "200px",
      //   cell: (row) => (
      //     <div className="d-flex align-items-center">
      //       <p
      //         title={row.mobile_no}
      //         className="text-truncate text-bold-500 mb-0"
      //       >
      //         {row.mobile_no}
      //       </p>
      //       {row.mobile_no === "-" ? null : row.is_mobile_verified ? (
      //         <div className="text-success" title="Verified">
      //           <Check size={16} />
      //         </div>
      //       ) : (
      //         <div className="text-danger" title="Unverified">
      //           <X size={16} />
      //         </div>
      //       )}
      //     </div>
      //   ),
      // },

      {
        name: "Created On",
        selector: "created_at",
        sortable: false,
        minWidth: "300px",
        cell: (row) => (
          <p className="text-truncate text-bold-500 mb-0">
            {moment(row.created_at).format("DD MMM YYYY h:mm A")}
          </p>
        ),
      },

      // {
      //   name: "Active",
      //   selector: "is_active",
      //   sortable: true,
      //   minWidth: "100px",
      //   cell: (row) => (
      //     <Toggle
      //       defaultChecked={row.is_active}
      //       icons={false}
      //       onChange={() => this.handleToggle(row)}
      //     />
      //   ),
      // },
      {
        name: "Action",
        selector: "action",
        sortable: true,
        minWidth: "100px",
        cell: (row) => (
          <ActionsComponent
            row={row}
            getDetail={this.props.getProfessionalDetails}
            toggleModal={this.toggleModal}
            //getData={this.props.getData}
            //parsedFilter={this.props.parsedFilter}
            //currentData={this.handleCurrentData}
            //deleteRow={this.handleDelete}
          />
        ),
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    modal: false,
    currentData: null,
    selected: [],
    modal: false,
    totalRecords: 0,
    sortIndex: [],
  }

  thumbView = this.props.thumbView

  componentDidMount() {
    this.props.handleGetUsers({
      page: 1,
      limit: 4,
    })
  }

  handleFilter = (e) => {
    this.setState({ value: e.target.value, currentPage: 1 })
    this.props.getProfessionalUsers({
      page: 1,
      limit: this.state.rowsPerPage,
      search_data: e.target.value,
    })
  }

  handleRowsPerPage = (value) => {
    let { getProfessionalUsers } = this.props
    this.setState({ rowsPerPage: value, currentPage: 1 })
    // getProfessions({ page: 1, limit: value, search_data:this.props.params.search_data })
    getProfessionalUsers({ page: 1, limit: value })
  }

  handleSidebar = (boolean) => {
    if (boolean === false) {
      this.setState({ sidebar: boolean, currentData: null })
    } else {
      this.setState({ sidebar: boolean })
    }
  }

  handleCurrentData = async (obj) => {
    this.handleSidebar(true)
    this.setState({ sideBarLoading: true, currentData: obj })
  }

  handlePagination = (page) => {
    let { getProfessionalUsers } = this.props
    let perPage =
      this.state.rowsPerPage !== undefined ? this.state.rowsPerPage : 4
    // getProfessions({ page: page.selected + 1, limit: perPage, search_data:this.props.params.search_data })
    getProfessionalUsers({ page: page.selected + 1, limit: perPage })
    this.setState({ currentPage: page.selected + 1 })
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }))
  }

  handleToggle = (data) => {
    this.props.toggleProfessionalStatus(!data.is_active, data.professional_id)
  }

  render() {
    let {
      columns,
      data,
      //allData,
      totalPages,
      //value,
      rowsPerPage,
      //currentData,
      sidebar,
      totalRecords,
      sortIndex,
    } = this.state
    return (
      <Card>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <CardBody>
            <div
              className={`data-list ${
                this.props.thumbView ? "thumb-view" : "list-view"
              }`}
            >
              <DataTable
                columns={columns}
                data={data}
                pagination
                paginationServer
                paginationComponent={() => (
                  <ReactPaginate
                    previousLabel={<ChevronLeft size={15} />}
                    nextLabel={<ChevronRight size={15} />}
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={totalPages}
                    containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
                    activeClassName="active"
                    forcePage={
                      this.state.currentPage
                        ? parseInt(this.state.currentPage - 1)
                        : 0
                    }
                    // forcePage={
                    //   this.props.parsedFilter.page
                    //     ? parseInt(this.props.parsedFilter.page - 1)
                    //     : 0
                    // }
                    onPageChange={(page) => this.handlePagination(page)}
                  />
                )}
                noHeader
                subHeader
                //selectableRows
                responsive
                pointerOnHover
                selectableRowsHighlight
                onSelectedRowsChange={(data) =>
                  this.setState({ selected: data.selectedRows })
                }
                customStyles={selectedStyle}
                subHeaderComponent={
                  <CustomHeader
                    handleSidebar={this.handleSidebar}
                    handleFilter={this.handleFilter}
                    handleRowsPerPage={this.handleRowsPerPage}
                    rowsPerPage={rowsPerPage}
                    total={totalRecords}
                    index={sortIndex}
                    value={this.state.value}
                  />
                }
                sortIcon={<ChevronDown />}
                // selectableRowsComponent={Checkbox}
                // selectableRowsComponentProps={{
                //   color: "primary",
                //   icon: <Check className="vx-icon" size={12} />,
                //   label: "",
                //   size: "sm"
                // }}
              />
              <div
                className={classnames("data-list-overlay", {
                  show: sidebar,
                })}
                onClick={() => this.handleSidebar(false, true)}
              />
            </div>
          </CardBody>
        )}
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    dataList: state.users.data,
    start: state.users.start,
    end: state.users.end,
    totalRecords: state.users.totalRecords,
    totalPages: state.users.totalPages,
    params: state.users.params,
    loading: state.users.loading,
  }
}

export default connect(mapStateToProps, {
  handleGetUsers,
  // getProfessionalUsers,
  // toggleProfessionalStatus,
  // getProfessionalDetails,
})(DataListConfig)