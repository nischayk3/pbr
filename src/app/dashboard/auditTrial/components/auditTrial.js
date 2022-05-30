// eslint-disable-next-line
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { MDH_APP_PYTHON_SERVICE } from "../../../../constants/apiBaseUrl";
import {
  auditDataChange,
  auditFilter,
  loadFilter
} from "../../../../duck/actions/auditTrialAction";
import "./styles.scss";
import { showNotification } from "../../../../duck/actions/commonActions";

const { Option } = Select;
const { Text } = Typography;
let filterIng = [];

class AuditTrials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ansList: [
        { label: "Yes",value: "Yes" },
        {  label: "No",value: "No" }
      ],
      ansListPkg: [
        {  label: "Yes",value: "Yes" },
        {  label: "No",value: "No" }
      ],
      brandList: [],
      brandListPkg: [],
      checkedColumns: [],
      colSort: "entry_date",
      columns: [
        {
          
          dataIndex: "user_id",
          defaultSortOrder: "descend",
          key: "2",
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              }
            };
          },
          sorter: (a, b) => a.user_id - b.user_id,
          title: "User"
        },
        {
          
          dataIndex: "activity",
          defaultSortOrder: "descend",
          key: "3",
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              }
            };
          },
          sorter: (a, b) => a.activity - b.activity,
          title: "Event"
        },
        {
          className: "old_value_class",
          dataIndex: "old_value",
          defaultSortOrder: "descend",
          key: "3",
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              }
            };
          },
          sorter: (a, b) => a.old_value - b.old_value,
          title: "Old Value"
        },
        {
          className: "old_value_class",
          dataIndex: "new_value",
          defaultSortOrder: "descend",
          key: "3",
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              }
            };
          },
          sorter: (a, b) => a.new_value - b.new_value,
          title: "New Value"
        },
        {
          
          dataIndex: "reason",
          defaultSortOrder: "descend",
          key: "2",
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              }
            };
          },
          sorter: (a, b) => a.reason - b.reason,
          title: "Reason For Change"
        },
        {
          
          dataIndex: "entry_date",
          defaultSortOrder: "descend",
          key: "1",
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              }
            };
          },
          render: (text) => moment(text).format("YYYY-MM-DD"),
          sorter: (a, b) => a.entry_date - b.entry_date,
          title: "Changed On",
          width: 200
          
        },
        {
          
          dataIndex: "table_name",
          defaultSortOrder: "descend",
          key: "4",
          onHeaderCell: (column) => {
            return {
              onClick: (e) => {
                this.loadData(column.dataIndex);
              }
            };
          },
          sorter: (a, b) => a.table_name - b.table_name,
          title: "Table Name"
        }
      ],
      
      dataGrid: {
        columns: [],
        pageNumber: 0,
        pageOffset: null,
        rows: [],
        selectedIndexes: [],
        totalRecord: null
        
        
      },
      daterange: [],
      downloadData: [],
      eventList: [],
      eventType: "",
      filterIng: [],
      filterPkg: [],
      filterTable: null,
      filterTable1: null,
      initialColumns: [],
      orderSort: {
        activity: 0,
        entry_date: 0,
        old_value: 0,
        table_name: 0,
        user_id: 0

      },
      
      productList: [],
      productListPkg: [],
      questionList: [],
      questionListPkg: [],
      searchText: "",
      searchText1: "",
      searchedColumn: "",
      searchedColumn1: "",
      selectedAns: "",
      selectedAnsPkg: "",
      selectedBrand: "",
      selectedBrandPkg: "",
      selectedDate: [],
      sortState: "DESC",
      tableData: [],
      tableDataPackaging: [],
      type: "",
      user: "",
      userList: [],
      // loading: true,
      value: false,
      visibleMenuSettings: false
      // config: [],
    
    };
  }
  componentDidMount() {
    this.setState({ initialColumns: this.state.columns });
    this.auditHighlight();
    this.onAuditUserAndEventFilter();
    //this.loadEventFilter('audit_event_filter')

    // let userReq = {
    //   //appId: "CPV",
    //   appId: "BMS",
    //   filterId: "bms_user_filter",
    //   q: ""
    // };
    // loadFilter(userReq).then(res => {
    //   let userList = res.data;
    //   this.setState({
    //     userList: userList
    //   });
    // });
  }


  onAuditUserAndEventFilter = async () => {
    let login_response = JSON.parse(localStorage.getItem("login_details"));
    let req = {};
    let headers = {
      "content-type": "application/json",
      "resource-name": "AUDIT_REPORT",
      "x-access-token": login_response.token ? login_response.token : ""
      
    };

    let res = await auditFilter(req, headers);
    if (res.statuscode != 200) {
      this.props.showNotification("error", res.Message);
    }else{
      this.setState({
        eventList:res.data[0].activity,
        userList:res.data[0].userid
        
      });
    }

  };

  loadData = (column) => {
    this.setState({ colSort: column }, () => this.auditHighlight());
  };

  getExcelFile = (value) => {
    var today = new Date();
    today.setDate(today.getDate() + 1);

    let endPoint = "/services/v1/audit-information?";
    let baseUrl = MDH_APP_PYTHON_SERVICE + endPoint;

    let startDate =
      this.state.selectedDate.length > 0
        ? this.state.selectedDate[0]
        : "2021-09-01";
    let endDate =
      this.state.selectedDate.length > 0
        ? this.state.selectedDate[1]
        : today.toISOString().slice(0, 10);
    let tableName = ["Parameter Data"];
    let activity = this.state.eventType.value;
    let userid = this.state.user.value;

    const myUrlWithParams = new URL(baseUrl);
    if (startDate == endDate) {
      myUrlWithParams.searchParams.append("startdate", startDate);
    } else {
      myUrlWithParams.searchParams.append("startdate", startDate);
      myUrlWithParams.searchParams.append("enddate", endDate);
    }

    if (activity) {
      myUrlWithParams.searchParams.append("activity", activity);
    }
    if (userid) {
      myUrlWithParams.searchParams.append("userid", userid);
    }
    myUrlWithParams.searchParams.append("table_name", tableName);

    if (value == "excel") {
      myUrlWithParams.searchParams.append("export_csv", false);
    }
    if (value == "csv") {
      myUrlWithParams.searchParams.append("export_csv", true);
    }

    let url = myUrlWithParams.href;
    window.open(url);
  };

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  auditHighlight = () => {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    let req = {
      enddate:
        this.state.selectedDate.length > 0 && this.state.selectedDate[1]
          ? this.state.selectedDate[1]
          : today.toISOString().slice(0, 10),
      identification: "10.10.16.30",
      order_by_col: this.state.colSort,
      order_by_type: this.state.sortState,
      source_system: "cpv",
      startdate:
        this.state.selectedDate.length > 0 && this.state.selectedDate[0]
          ? this.state.selectedDate[0]
          : "2021-09-01",
      transactionid: "20200813161038.066"
      // username: this.state.user ? this.state.user.value : "",
      
      
      
      // activity:this.state.eventType ? this.state.eventType.value : '',
    };
    if (this.state.eventType) {
      req["activity"] = this.state.eventType
        ? this.state.eventType.value
        : "";
    }
    if (this.state.user) {
      req["username"] = this.state.user ? this.state.user.value : "";
    }

    auditDataChange(req).then((res) => {
      let antdDataTable = [];
      res.data.forEach((item, key) => {
        let antdObj = {};
        let val11 = item.delta.toString();
        antdObj["key"] = key;
        antdObj["user_id"] = item.user_id;
        antdObj["activity"] = item.activity;
        antdObj["old_value"] = item.old_value;
        antdObj["entry_date"] = item.entry_date;
        antdObj["table_name"] = item.table_name;
        antdObj["reason"] = item.reason;
        if (val11 === item.new_value) {
          antdObj["new_value"] = (
            <p style={ { background: "yellow" } }>{ item.new_value }</p>
          );
        } else if (item.activity === "U" && item.delta.length > 0) {
          let val = "";
          item.delta.forEach((item1) => {
            if (val.length > 0) {
              let val1 = val.replace(
                item1,
                `<span style='background-color:yellow'>${item1}</span>`
              );
              val = val1;
            } else {
              let val1 = item.new_value.replace(
                item1,
                `<span style='background-color:yellow'>${item1}</span>`
              );
              val = val1;
            }
          });
          antdObj["new_value"] = (
            <p dangerouslySetInnerHTML={ { __html: val } }></p>
          );
        } else {
          antdObj["new_value"] = item.new_value;
        }
        antdDataTable.push(antdObj);
      });
      this.setState({
        downloadData: this.state.tableData,
        tableData: antdDataTable
        
      });
    });
  };
  loadEventFilter = (_filterId, _filter) => {
    let _req = {
      appId: "BMS",
      filterId: _filterId,
      filters: _filter ? _filter : [],
      q: ""
      
    };
    loadFilter(_req)
      .then((res) => {
        let eventlist = res.data;
        this.setState({
          eventList: eventlist
        });
      })
      .catch((error) => {
        if (error && error.message)
          console.log("Warning", error.message);
      });
  };

  search = (value) => {
    const { tableData } = this.state;
    const filterTable = tableData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    this.setState({ filterTable });
  };

  searchTable = (value) => {
    const { tableData1 } = this.state;
    const filterTable1 = tableData1.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    this.setState({ filterTable1 });
  };

  handleVisibleChange = (flag) => {
    this.setState({ visibleMenuSettings: flag });
  };

  onChangeCheckbox = (e) => {
    var checkedColumns = this.state.checkedColumns;
    if (e.target.checked) {
      checkedColumns = checkedColumns.filter((id) => {
        return id !== e.target.id;
      });
    } else if (!e.target.checked) {
      checkedColumns.push(e.target.id);
    }

    var filtered = this.state.initialColumns;
    for (var i = 0; i < checkedColumns.length; i++)
      filtered = filtered.filter((el) => {
        return el.dataIndex !== checkedColumns[i];
      });

    this.setState({ checkedColumns: checkedColumns ,columns: filtered });
  };

  onChangeIng = (e, value) => {
    if (value !== null) {
      let userarr = [];
      userarr.push({
        field: "user_id",
        operator: "IN",
        value: [value.value.trim()]
      });
      filterIng = userarr;
    }
  };

  onChangePkg = (e, value) => {
    if (value !== null) {
      let arr = [];

      arr.push({
        field: "entry_date",
        operator: "Between",
        value: value
      });
      this.setState({ filterPkg: arr });
    }
  };

  handleFilter = () => {
    this.setState({ filterTable: null });
    this.auditHighlight();
  };
  handleFilterPkg = () => {
    this.esgTablePackaging(this.state.filterPkg);
  };

  handleClear = () => {
    this.setState(
      {
        daterange: [],
        eventType: "",
        filterTable: null,
        selectedAns: "",
        selectedBrand: "",
        selectedDate: [],
        selectedProduct: "",
        selectedQuestion: "",
        user: ""
      },
      () => this.auditHighlight()
    );

    // this.auditDateTable();
    // let userReq = {
    //   //appId: "CPV",
    //   appId: 'BMS',
    //   filterId: 'bms_user_filter',
    //   q: '',
    // };
    // loadFilter(userReq).then((res) => {
    //   let userList = res.data;
    //   this.setState({
    //     userList: userList,
    //   });
    // });
  };

  handleClearPkg = () => {
    this.setState({
      selectedAnsPkg: "",
      selectedBrandPkg: "",
      selectedProductPkg: "",
      selectedQuestionPkg: ""
      
    });
    this.esgTablePackaging();
  };
  handleAutoCompleteChange = (state, evt, value) => {
    if (evt) {
      if (value === null) {
        value = { label: "", value: "" };
      } else {
        this.setState({
          user: value
        });
      }
    }
  };

  render() {
    const { RangePicker } = DatePicker;
    const { filterTable, tableData, columns } = this.state;

    const userMenu = (
      <Menu>
        <Menu.Item key="1" onClick={ () => this.getExcelFile("excel") }>
          Excel
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={ () => this.getExcelFile("csv") }>
          CSV
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <div className="divFilterDrop bg-white">
          <div className="filter-header" style={ { height: "150px" } }>
            <div className="divFilter-name">
              <Text>Date</Text>
              <Text style={ { marginLeft: "15px" } }>User</Text>
              <Text>Event Type</Text>
            </div>
            <div className="divFilter">
              <Space>
                <RangePicker
                  value={ this.state.daterange }
                  onChange={ (e, value) => {
                    this.setState({
                      daterange: e,
                      selectedDate: value,
                      type: "date"
                      
                    });
                    this.onChangePkg(e, value);
                  } }
                  disabledDate={ this.disabledDate }
                />
              </Space>
              <Space>
                <Select
                  style={ {
                    marginLeft: "20px",
                    width: "150px"
                    
                  } }
                  placeholder="User"
                  onChange={ (e, value) => {
                    return (
                      this.setState({
                        type: "user",
                        user: value
                      }),
                      this.onChangeIng(e, value, "user")
                    );
                  } }
                  value={ this.state.user }
                >
                  { this.state.userList && this.state.userList.map((item, i) => {
                   
                    return (
                      <Option value={ item.value } key={ i } >
                        { item.value }
                      </Option>
                    );
                  }) }
                </Select>
              </Space>
              <Space>
                <Select
                  style={ { width: "150px" } }
                  placeholder="Event"
                  onChange={ (e, value) => {
                    return this.setState({
                      eventType: value
                    });
                  } }
                  value={ this.state.eventType }
                >
                  { this.state.eventList && this.state.eventList.map((item, i) => {
                    return (
                      <Option value={ item.value } key={ i }>
                        { item.value }
                      </Option>
                    );
                  }) }
                </Select>
              </Space>
            </div>
            <div className="divFilter-second">
              <Button
                style={ {
                  backgroundColor: "#495fc3",
                  color: "#ffffff",
                  width: "100px"
                } }
                type="primary"
                onClick={ () => {
                  this.handleFilter();
                } }
              >
                Filter
              </Button>
              <Button
                style={ {
                  backgroundColor: "#495fc3",
                  color: "#ffffff",
                  width: "100px"
                } }
                type="primary"
                className="simulate-btn"
                onClick={ () => {
                  this.handleClear();
                } }
              >
                Clear
              </Button>
            </div>
          </div>

          <div
            className="custom-table-card"
            style={ { margin: "10px 0" } }
          >
            <div className="table-header">
              <div>
                <p>Audit Trail Report</p>
              </div>
              <div
                style={ {
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "100px"
                  
                } }
              >
                <Input.Search
                  className="table-search"
                  placeholder="Search by..."
                  enterButton
                  onSearch={ this.search }
                />
              </div>
              <div
                style={ {
                  float: "right",
                  marginRight: "10px",
                  marginTop: "10px"
                  
                } }
              >
                <Dropdown
                  style={ { color: "#ffffff" } }
                  overlay={ userMenu }
                >
                  <Button
                    style={ {
                      backgroundColor: "#495fc3",
                      color: "#ffffff"
                    } }
                    type="primary"
                  >
                    Export
                  </Button>
                </Dropdown>
              </div>
            </div>
            <Table
              style={ { margin: "20px" } }
              loading={ this.state.loading }
              size="small"
              columns={ columns }
              dataSource={
                filterTable === null ? tableData : filterTable
              }
              scroll={ { x: 400 } }
              bordered
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  showNotification
};

export default connect(null, mapDispatchToProps)(AuditTrials);
