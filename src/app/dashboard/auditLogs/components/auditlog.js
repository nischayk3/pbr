// eslint-disable-next-line
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Input,
  DatePicker,
  Space,
  Menu,
  Dropdown,
  Button,
  Select,
  Typography,
} from 'antd';
import {
  loadFilter,
  auditDataChange,
  auditFilter
} from '../../../../duck/actions/auditTrialAction';

import './styles.scss';
import moment from 'moment';
import { BMS_APP_PYTHON_SERVICE, MDH_APP_PYTHON_SERVICE} from '../../../../constants/apiBaseUrl';
import { showNotification } from '../../../../duck/actions/commonActions';

const { Option } = Select;
const { Text } = Typography;
let filterIng = [];
let filterPkg = [];

class Audit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        brandList: [],
        productList: [],
        questionList: [],
        brandListPkg: [],
        productListPkg: [],
        questionListPkg: [],
        tableData: [],
        tableDataPackaging: [],
        ansList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        ansListPkg: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        selectedBrand: "",
        selectedProduct: "",
        selectedQuestion: "",
        selectedBrandPkg: "",
        selectedProductPkg: "",
        selectedQuestionPkg: "",
        selectedAns: "",
        selectedAnsPkg: "",
        // loading: true,
        searchText: "",
        searchedColumn: "",
        filterTable: null,
        searchText1: "",
        searchedColumn1: "",
        filterTable1: null,
        value: false,
        checkedColumns: [],
        visibleMenuSettings: false,
        columns: [

          {
            title: 'Old Value',
            dataIndex: 'old_value',
            key: '3',
            defaultSortOrder: 'descend',
            onHeaderCell: (column) => {
              return {
                onClick: (e) => {
                  this.loadData(column.dataIndex);
                },
              };
            },
            className: 'old_value_class',
  
            sorter: (a, b) => a.old_value - b.old_value,
          },
          {
            title: 'New Value',
            dataIndex: 'new_value',
            key: '3',
            defaultSortOrder: 'descend',
            className: 'old_value_class',
            onHeaderCell: (column) => {
              return {
                onClick: (e) => {
                  this.loadData(column.dataIndex);
                },
              };
            },
            sorter: (a, b) => a.new_value - b.new_value,
          },
          
          {
            title: 'Activity',
            dataIndex: 'activity',
            key: '3',
            defaultSortOrder: 'descend',
            onHeaderCell: (column) => {
              return {
                onClick: (e) => {
                  this.loadData(column.dataIndex);
                },
              };
            },
            sorter: (a, b) => a.activity - b.activity,
          },
          {
            title: 'User',
            dataIndex: 'user_id',
            key: '2',
            defaultSortOrder: 'descend',
            onHeaderCell: (column) => {
              return {
                onClick: (e) => {
                  this.loadData(column.dataIndex);
                },
              };
            },
            sorter: (a, b) => a.user_id - b.user_id,
          },
          
          // {
          //   title: 'Reason For Change',
          //   dataIndex: 'reason',
          //   key: '2',
          //   defaultSortOrder: 'descend',
          //   onHeaderCell: (column) => {
          //     return {
          //       onClick: (e) => {
          //         this.loadData(column.dataIndex);
          //       },
          //     };
          //   },
          //   sorter: (a, b) => a.reason - b.reason,
          // },
          {
            title: 'Updated On',
            dataIndex: 'entry_date',
            key: '1',
            width: 200,
            defaultSortOrder: 'descend',
            onHeaderCell: (column) => {
              return {
                onClick: (e) => {
                  this.loadData(column.dataIndex);
                },
              };
            },
            sorter: (a, b) => a.entry_date - b.entry_date,
            render: (text) => moment(text).format('YYYY-MM-DD'),
          },
  
           
        ],
      
        initialColumns: [],
      };
    }
    componentDidMount() {
      this.setState({ initialColumns: this.state.columns });
      // this.esgTable();
      // this.esgTablePackaging();
      // this.getBrandFilter();
      // this.getProductFilter();
      // this.getQuestionFilter();
      // this.getBrandFilterPkg();
      // this.getProductFilterPkg();
      // this.getQuestionFilterPkg();
    }
  
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.tableData !== this.props.tableData) {
    //     this.setState({
    //       soLineScreenOutput: nextProps.soLineScreenOutput.map((item, i) => {
    //         return {
    //           key: i,
    //           material: item.material,
    //           plant: item.plant,
    //           invType: item.invType,
    //           totalQty: item.totalQty,
    //           totalValueInUSD: item.totalValueInUSD,
    //           snapDateTime: item.snapDateTime,
    //           unit: item.unit,
    //         };
    //       }),
    //     });
    //     this.setState({ loading: false });
    //   }
    // }
  
  //   esgTable = (filterIng) => {
  //     //
  //     let reqObj = {
  //       appId: "MDH_APP",
  //       filters: filterIng ? filterIng : [],
  //       metadata: true,
  //       pageSize: 100,
  //       pageNumber: 1,
  //       resultsetId: "esg_harmony_data",
  //     };
  //     returnData(reqObj)
  //       .then((res) => {
  //         const _response = res || {};
  //         if (_response.error) {
  //           this.setState({
  //             toastOpen: true,
  //             toastMessage: _response.message,
  //             toastVariant: "error",
  //           });
  //         } else {
  //           this.setState({
  //             tableData: _response.data.content,
  //             //  tableColumns: columns.filter((obj) => obj.name !== "table_name"),
  //             // sortedArrat: []
  //             // tableCategory: _response.data.content.category
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         this.setState({
  //           toastOpen: true,
  //           toastMessage: err.message,
  //           toastVariant: "error",
  //         });
  //       });
  //   };
  
  //   esgTablePackaging = (filterPkg) => {
  //     //
  //     let reqObj = {
  //       appId: "MDH_APP",
  //       filters: filterPkg ? filterPkg : [],
  //       metadata: true,
  //       pageSize: 100,
  //       pageNumber: 1,
  //       resultsetId: "esg_packaging_data",
  //     };
  //     returnData(reqObj)
  //       .then((res) => {
  //         const _response = res || {};
  //         if (_response.error) {
  //           this.setState({
  //             toastOpen: true,
  //             toastMessage: _response.message,
  //             toastVariant: "error",
  //           });
  //         } else {
  //           this.setState({
  //             tableDataPackaging: _response.data.content,
  //             //  tableColumns: columns.filter((obj) => obj.name !== "table_name"),
  //             // sortedArrat: []
  //             // tableCategory: _response.data.content.category
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         this.setState({
  //           toastOpen: true,
  //           toastMessage: err.message,
  //           toastVariant: "error",
  //         });
  //       });
  //   };
  
    search = (value) => {
      const { tableData } = this.state;
      console.log("PASS", { value });
  
      const filterTable = tableData.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      );
  
      this.setState({ filterTable });
    };
  
    searchTable = (value) => {
      const { tableData1 } = this.state;
      console.log("PASS", { value });
  
      const filterTable1 = tableData1.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])
            .toLowerCase()
            .includes(value.toLowerCase())
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
  
      this.setState({ columns: filtered, checkedColumns: checkedColumns });
    };
  
    onChange = (e, value, field) => {
      if (value != null) {
        filterIng.push({
          field: field,
          operator: "IN",
          value: [value.value],
        });
      }
    };
  
    onChangePkg = (e, value, field) => {
      if (value != null) {
        filterPkg.push({
          field: field,
          operator: "IN",
          value: [value.value],
        });
      }
    };
  
    handleFilter = () => {
      this.esgTable(filterIng);
    };
    handleFilterPkg = () => {
      this.esgTablePackaging(filterPkg);
    };
  
    handleClear = () => {
      this.setState({
        selectedBrand: "",
        selectedProduct: "",
        selectedQuestion: "",
        selectedAns: "",
      });
      this.esgTable();
    };
  
    handleClearPkg = () => {
      this.setState({
        selectedBrandPkg: "",
        selectedProductPkg: "",
        selectedQuestionPkg: "",
        selectedAnsPkg: "",
      });
      this.esgTablePackaging();
    };
  
  //   getBrandFilter = () => {
  //     let req = {
  //       appId: "MDH_APP",
  //       filterId: "esg_brand_filter",
  //       filters: [],
  //     };
  //     loadFilter(req).then((res) => {
  //       let response = res.data;
  
  //       let arr = [];
  //       response.forEach((key) => {
  //         arr.push({ value: key.value });
  //       });
  //       console.log("arr,arr", arr);
  //       this.setState({
  //         brandList: arr,
  //       });
  //     });
  //   };
  
  //   getBrandFilterPkg = () => {
  //     let req = {
  //       appId: "MDH_APP",
  //       filterId: "esg_brand_filter_pkg",
  //       filters: [],
  //     };
  //     loadFilter(req).then((res) => {
  //       let response = res.data;
  
  //       let arr = [];
  //       response.forEach((key) => {
  //         arr.push({ value: key.value });
  //       });
  //       console.log("arr,arr", arr);
  //       this.setState({
  //         brandListPkg: arr,
  //       });
  //     });
  //   };
  
  //   getProductFilter = () => {
  //     let req = {
  //       appId: "MDH_APP",
  //       filterId: "esg_product_filter",
  //       filters: [],
  //     };
  //     loadFilter(req).then((res) => {
  //       let response = res.data;
  
  //       let arr = [];
  //       response.forEach((key) => {
  //         arr.push({ value: key.value });
  //       });
  //       console.log("arr,arr", arr);
  //       this.setState({
  //         productList: arr,
  //       });
  //     });
  //   };
  
  //   getProductFilterPkg = () => {
  //     let req = {
  //       appId: "MDH_APP",
  //       filterId: "esg_product_filter_pkg",
  //       filters: [],
  //     };
  //     loadFilter(req).then((res) => {
  //       let response = res.data;
  
  //       let arr = [];
  //       response.forEach((key) => {
  //         arr.push({ value: key.value });
  //       });
  //       console.log("arr,arr", arr);
  //       this.setState({
  //         productListPkg: arr,
  //       });
  //     });
  //   };
  
  //   getQuestionFilter = () => {
  //     let req = {
  //       appId: "MDH_APP",
  //       filterId: "esg_question_filter",
  //       filters: [],
  //     };
  //     loadFilter(req).then((res) => {
  //       let response = res.data;
  
  //       let arr = [];
  //       response.forEach((key) => {
  //         arr.push({ value: key.value });
  //       });
  //       console.log("arr,arr", arr);
  //       this.setState({
  //         questionList: arr,
  //       });
  //     });
  //   };
  
  //   getQuestionFilterPkg = () => {
  //     let req = {
  //       appId: "MDH_APP",
  //       filterId: "esg_question_filter_pkg",
  //       filters: [],
  //     };
  //     loadFilter(req).then((res) => {
  //       let response = res.data;
  
  //       let arr = [];
  //       response.forEach((key) => {
  //         arr.push({ value: key.value });
  //       });
  //       console.log("arr,arr", arr);
  //       this.setState({
  //         questionListPkg: arr,
  //       });
  //     });
  //   };
  
    render() {
      const { classes } = this.props;
      const {
        filterTable,
        filterTable1,
        tableData,
        tableDataPackaging,
        columns,
        columns2,
        brandList,
        productList,
        questionList,
        selectedProduct,
        selectedQuestion,
        selectedBrand,
        brandListPkg,
        productListPkg,
        questionListPkg,
        selectedProductPkg,
        selectedQuestionPkg,
        selectedBrandPkg,
        ansList,
        selectedAns,
        selectedAnsPkg,
        ansListPkg,
      } = this.state;
      console.log("brandlisar", selectedBrand);
  
      return (
        <div>
          <div className='divFilterDrop bg-white'>
            {/* <div className={classes.paperFilter}>
              <FormControl className="custom-formcontrol-style1">
                <Autocomplete
                  size="small"
                  id="checkboxes-tags-demo"
                  options={brandList}
                  getOptionLabel={(option) => option.value}
                  onChange={(e, value) => {
                    return (
                      this.onChange(e, value, "brand"),
                      this.setState({
                        selectedBrand: value,
                      })
                    );
                  }}
                  value={selectedBrand ? selectedBrand : ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brand"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </FormControl>
              <FormControl className="custom-formcontrol-style1">
                <Autocomplete
                  size="small"
                  id="checkboxes-tags-demo"
                  options={productList}
                  getOptionLabel={(option) => option.value}
                  classes={{
                    paper: classes.paper,
                  }}
                  onChange={(e, value) => {
                    return (
                      this.onChange(e, value, "product"),
                      this.setState({
                        selectedProduct: value,
                      })
                    );
                  }}
                  value={selectedProduct ? selectedProduct : ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </FormControl>
              <FormControl className="custom-formcontrol-style1">
                <Autocomplete
                  size="small"
                  id="checkboxes-tags-demo"
                  options={questionList}
                  getOptionLabel={(option) => option.value}
                  classes={{
                    paper: classes.paper,
                  }}
                  onChange={(e, value) => {
                    return (
                      this.onChange(e, value, "question"),
                      this.setState({
                        selectedQuestion: value,
                      })
                    );
                  }}
                  value={selectedQuestion ? selectedQuestion : ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ingredient Questionaire
                    "
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </FormControl>
              <FormControl className="custom-formcontrol-style1">
                <Autocomplete
                  size="small"
                  id="checkboxes-tags-demo"
                  options={ansList}
                  getOptionLabel={(option) => option.value}
                  onChange={(e, value) => {
                    return (
                      this.onChange(e, value, "answer"),
                      this.setState({
                        selectedAns: value,
                      })
                    );
                  }}
                  value={selectedAns ? selectedAns : ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Answer"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </FormControl>
  
              <Button
                style={{ width: "100px" }}
                variant="contained"
                color="primary"
                className="simulate-btn"
                onClick={() => {
                  this.handleFilter();
                }}
              >
                Filter
              </Button>
              <Button
                style={{ width: "100px" }}
                variant="contained"
                color="primary"
                className="simulate-btn"
                onClick={() => {
                  this.handleClear();
                }}
              >
                Clear
              </Button>
            </Paper> */}
  
            <div className="custom-table-card" style={{ margin: "10px 0" }}>
              <div className="table-header">
                <div>
                  <p>Audit Logs</p>
                </div>
                {/* <div>
                  <Input.Search
                    className="table-search"
                    placeholder="Search by..."
                    enterButton
                    onSearch={this.search}
                  />
                </div> */}
              </div>
              <Table
                loading={this.state.loading}
                size="small"
                columns={columns}
                dataSource={filterTable == null ? tableData : filterTable}
                bordered
              />
            </div>
          </div>
         
        </div>
      );
    }
  }
  const mapDispatchToProps = {
    showNotification,
  };
  

export default connect(null, mapDispatchToProps)(Audit);
