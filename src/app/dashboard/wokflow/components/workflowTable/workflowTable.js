import React,{useEffect,useState,useRef} from 'react';
import {
  useHistory
} from 'react-router-dom';
import { Table,Input ,Space,Button} from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import './styles.scss';



function workflowTable(props) {
    const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [newColumns,setNewColumns]=useState([]);
  const refSearchInput = useRef();
  const history = useHistory();
 
useEffect(()=>{
  updateTableColumns();
},[props.columns])

  const getColumnSearchProps = (
    dataIndex,
    searchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex,setSearchText,setSearchedColumn)}
          style={{ width: 240, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                setSearchText,
                setSearchedColumn
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              handleReset(
                clearFilters,
                setSearchText,
                setSearchText,
                setSearchedColumn
              )
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
            </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });
  
  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
    setSearchText,
    setSearchedColumn
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
 const handleReset = (clearFilters, setSearchText) => {
    clearFilters();
    setSearchText("");
  };
    // const columns = [
    //     {
    //         title: 'Site',
    //         key: 'site',
    //         dataIndex: 'site',
    //         ...getColumnSearchProps('site',refSearchInput,searchText,setSearchText,searchedColumn,setSearchedColumn)
    //     },
    //     {
    //         title: 'Product',
    //         key: 'product',
    //         dataIndex: 'product',
    //     },
    //     {
    //         title: 'Test Name',
    //         key: 'test_name',
    //         dataIndex: 'test_name',
    //     },
    //     {
    //         title: 'Batch',
    //         key: 'batch',
    //         dataIndex: 'batch',
    //     },
    //     {
    //         title: 'Test Value',
    //         key: 'test_value',
    //         dataIndex: 'test_value',
    //     },
    //     {
    //         title: 'UOM Code',
    //         key: 'uom code',
    //         dataIndex: 'uom code',
    //     }
    // ]

    
    const updateTableColumns=()=>{
      let columns = [];
      props.columns.map((i) => {
        let { displayName, fieldName } = i;
  
        if (i.visible) {
          let obj = {
            title: displayName,
            dataIndex: fieldName,
            key: i.id,
            ...getColumnSearchProps(fieldName,refSearchInput,searchText,setSearchText,searchedColumn,setSearchedColumn),
            sorter: (a, b) => {
  
              return a.fieldName === null || a.fieldName === undefined || a.fieldName === "" ? -1 : b.fieldName == null || b.fieldName == undefined || b.fieldName == "" ? 1 : a.fieldName.toString().localeCompare(b.fieldName)
  
            },
  
          };
  
          if (i.fieldName === "action") {
            obj.render = (text, row,index) => {
              return (
                <a onClick={()=>window.open(`${process.env.REACT_APP_URL}${text}?id=${row.view_id}&version=${row.version}`)}>Review Submission</a>
                
              );
            }
          }
  
  
          columns.push(obj)
        }
  
      })
  
      setNewColumns(columns)
    }
    return (
        <div className='workflow-table'>
            <Table
                //className='workflow-table'
                columns={newColumns}
                dataSource={props.dataSource}
                style={{ border: '1px solid #ececec', borderRadius: '2px' }}
                pagination={false}
            //rowKey={(record) => record.param}
            />
        </div>
    )
}

export default workflowTable;
