import { useState, useEffect } from "react";
import * as React from "react";
import { Form, Table, Select, Input } from "antd";
import './styles.scss';

const coloptions = [{ lable: "Combine with", value: "combine_with" }]
const rowoptions = [{ lable: "All", value: "all" }]
 /* istanbul ignore next */
export const EditableUsersTable = props => {
    const { users, add, remove, selectedIdentifier, setSelectedRowRows, selectedRowRows,setSelectedRowValues,selectedRowValues } = props;
    const [editingIndex, setEditingIndex] = useState(0);
    const [paramsOptions, setParamsOptions] = useState([]);
    const [identifier, setIdentifier] = useState("");
    const [selectedTableData, setSelectedTableData] = useState(users);
    const [selectedRowIdentifier, setSelectedRowIdentifier] = useState(selectedRowRows);


    useEffect(() => {
        let arr = users.map(item => ({ lable: item[selectedIdentifier], value: item[selectedIdentifier] }))
        setParamsOptions(arr)
    }, [])

    useEffect(()=>{
        if(selectedRowValues){
            setSelectedTableData(selectedRowValues)
        }
        
    },[selectedRowValues])


    const columns = [
        {
            title: "Id",
            dataIndex: selectedIdentifier,
            key: selectedIdentifier,
            align: "center",
            width: "9%"
        },
        {
            title: "Value",
            dataIndex: "cell_text",
            key: "cell_text",
            width: "25%"

        },
        {
            title: "Method",
            dataIndex: "cell_entitytype",
            key: "cell_entitytype",
            render: (value, row, index) => {
                return (
                    <Select
                        allowClear
                        key={index}
                        disabled={selectedRowIdentifier?.includes(row.key) ? false : true}
                        value={row?.method}
                        placeholder="Select"
                        style={{ width: "80%", marginRight: 8 }}
                        options={coloptions}
                        onChange={(val) => handleMethodChange(val, row.key,"method")}
                    />
                );
            }
        },
        {
            title: "Params",
            dataIndex: selectedIdentifier,
            key: selectedIdentifier,
            width: "15%",
            render: (value, row, index) => {
                let newCols = paramsOptions.filter(item => item.lable != row[selectedIdentifier])
                return (
                    // <Form.Item name={[index, "params"]} key={index}>
                    <Select
                        allowClear
                        key={index}
                        disabled={selectedRowIdentifier.includes(row.key) ? false : true}
                        value={row?.params}
                        placeholder="Select"
                        style={{ width: "80%", marginRight: 8 }}
                        options={newCols}
                        onChange={(val) => handleMethodChange(val, row.key,"params")}
                    />
                    // </Form.Item>
                );
            }
        },
        {
            title: "Applicable TO",
            dataIndex: selectedIdentifier,
            key: selectedIdentifier,
            render: (value, row, index) => {
                return (
                    // <Form.Item name={[index, "applicalbe_to"]} key={index}>
                    <Select
                        allowClear
                        key={index}
                        disabled={selectedRowIdentifier.includes(row.key) ? false : true}
                        value={row?.applicalbe_to}
                        placeholder="Select"
                        style={{ width: "80%", marginRight: 8 }}
                        options={rowoptions}
                        onChange={(val) => handleMethodChange(val, row.key,"applicalbe_to")}
                    />
                    // </Form.Item>
                );
            }
        },
    ]
    const rowSelection = {
        selectedRowKeys: selectedRowRows,
        
        onChange: (selectedRowKeys, selectedRows) => {
            let newData = selectedTableData
            newData.forEach(item=>{
                if(!selectedRowKeys.includes(item.key)){
                    delete item["method"] 
                    delete item["params"] 
                    delete item["applicalbe_to"] 
                }
            })
            setSelectedTableData(newData)
            setSelectedRowValues(newData)
            setSelectedRowRows(selectedRowKeys)

        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const handleMethodChange = (val, index,field) => {
        let newTableData = selectedRowValues
        let newData = selectedTableData
        newData.forEach(item=>{
            if(item.key == index){
                item[field] = val
            }
        })
        setSelectedTableData(newData)
        setSelectedRowValues(newData)
    }

    return (
        <div style={{ height: 200, overflowY: "scroll", border: "" }}>
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                className='tableIdentifier'
                columns={columns}
                dataSource={selectedTableData}
                pagination={{ defaultPageSize: 100, showSizeChanger: true, pageSizeOptions: ['200', '300', '500'] }}
            />
        </div>

    );
};
