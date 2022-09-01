import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Collapse, Switch, Input } from 'antd'
import { EditableTableForm } from './EditableForm'
import { getRowColumnData, previewTable } from '../../../../../services/pbrService'
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../../duck/actions/commonActions';
import { tableColumns } from '../../../../../utils/TableColumns'
import { Handle } from 'react-flow-renderer';

const { Panel } = Collapse;

function TableIdentifier(props) {
    let { clickedTable, metaData, imageHeight, imageWidth, triggerPreview, templateVersion,
        params, triggerUpdate, setSideTableData, setTriggerUpdate, tableActiveKey, formTableData,
        setModalData, setModalColumns, initialSideTableData } = props
    const dispatch = useDispatch();
    const [columnData, setColumnData] = useState([])
    const [rowData, setrowData] = useState([])
    const [selectedIdentifier, setSelectedIdentifier] = useState("");
    const [selectedColRows, setSelectedColRows] = useState([]);
    const [selectedColValues, setSelectedColValues] = useState([]);
    const [selectedRowRows, setSelectedRowRows] = useState([]);
    const [selectedRowValues, setSelectedRowValues] = useState([]);
    const [colPanelValue, setColPanelValue] = useState({});
    const [rowPanelValue, setRowPanelValue] = useState({});
    const [newEditTemplate, setNewEditTemplate] = useState(false);
    const [tableIdentifierValues, setTableIdentifierValues] = useState({});


    useEffect(() => {
        setColPanelValue(formTableData[tableActiveKey]?.tableData?.colPanelValue)
        setRowPanelValue(formTableData[tableActiveKey]?.tableData?.rowPanelValue)
        setSelectedRowValues(formTableData[tableActiveKey]?.tableData?.selectedRowValues)
        setSelectedColValues(formTableData[tableActiveKey]?.tableData?.selectedColValues)
        setSelectedColRows(formTableData[tableActiveKey]?.tableData?.selectedColRows ? formTableData[tableActiveKey]?.tableData?.selectedColRows : [])
        setSelectedRowRows(formTableData[tableActiveKey]?.tableData?.selectedRowRows ? formTableData[tableActiveKey]?.tableData?.selectedRowRows : [])
        setTableIdentifierValues(formTableData[tableActiveKey]?.tableData?.table_identifier)
    }, [tableActiveKey])

    useEffect(() => {
        if (Object.keys(clickedTable).length) {
            setTableIdentifierValues({
                "left": clickedTable?.coords[0] / imageWidth, "top": clickedTable?.coords[1] / imageHeight,
                "width": (clickedTable?.coords[2] - clickedTable?.coords[0]) / imageWidth, "height": (clickedTable?.coords[3] - clickedTable?.coords[1]) / imageHeight
            })
            geTableData(clickedTable)
        }
    }, [clickedTable])

    useEffect(() => {
        if (triggerPreview) {
            handlePrewiew()
        }

    }, [triggerPreview])

    useEffect(() => {
        setSideTableData({
            colPanelValue: colPanelValue,
            rowPanelValue: rowPanelValue,
            selectedColValues: selectedColValues,
            selectedRowValues: selectedRowValues,
            selectedRowRows: selectedRowRows,
            selectedColRows: selectedColRows,
            table_identifier: tableIdentifierValues
            // table_identifier: Object.keys(clickedTable).length ? {
            //     "left": clickedTable?.coords[0] / imageWidth, "top": clickedTable?.coords[1] / imageHeight,
            //     "width": (clickedTable?.coords[2] - clickedTable?.coords[0]) / imageWidth, "height": (clickedTable?.coords[3] - clickedTable?.coords[1]) / imageHeight
            // } : {},
        })
    }, [colPanelValue, rowPanelValue, selectedColValues, selectedRowValues, selectedRowRows, selectedColRows, clickedTable])

    useEffect(() => {
        if (triggerUpdate) {
            setColPanelValue([])
            setRowPanelValue([])
            setSelectedColRows([])
            setSelectedRowValues([])
            setSelectedColValues([])
            setSelectedRowRows([])
            setColumnData([])
            setTriggerUpdate(false)
            setNewEditTemplate(true)
        }

    }, [triggerUpdate])

    const geTableData = async (clickedTable) => {
        try {
            dispatch(showLoader());
            let req = {
                filename: `${metaData?.file?.split('.')[0]}_page-${0}.jpeg.json`,
                page: 1,
                table_identifier: tableIdentifierValues ? tableIdentifierValues : {
                    "left": clickedTable?.coords[0] / imageWidth, "top": clickedTable?.coords[1] / imageHeight,
                    "width": (clickedTable?.coords[2] - clickedTable?.coords[0]) / imageWidth, "height": (clickedTable?.coords[3] - clickedTable?.coords[1]) / imageHeight
                },
                action_type: params?.temp_disp_id ? newEditTemplate ? "create" : "edit" : "create",
                table_id: null,
                template_id: params?.temp_disp_id ? params?.temp_disp_id : null,
                version: templateVersion ? templateVersion : null
            }
            let res = await getRowColumnData(req)
            if (res["status-code"] == 200 && !formTableData[tableActiveKey]?.tableData?.selectedRowValues) {
                let obj = res.Data1.map((item, index) => ({ ...item, key: index }))
                let obj2 = res.Data2.map((item, index) => ({ ...item, key: index }))
                let arr = obj.map((item, index) => index)
                let arr1 = obj2.map((item1, index1) => index1)
                setSelectedColRows(arr)
                setSelectedRowRows(arr1)
                setColumnData(obj)
                setrowData(obj2)
                setColPanelValue({ start: "1", stop: `${obj.length}`, pk_index: "1" })
                setRowPanelValue({ start: "1", stop: `${obj2.length}`, pk_index: "1" })
                setSelectedColValues(obj)
                setSelectedRowValues(obj2)
                dispatch(hideLoader());
            } else {
                dispatch(hideLoader());
                // dispatch(showNotification('error', 'No Data Found'));
            }
        } catch (error) { /* istanbul ignore next */
            dispatch(hideLoader());
            dispatch(showNotification('error', 'No Data Found'));
        }


    }
    const updateCheckbox = (val,obj) => {
        let arr = []
        for(let i=Number(val-1);i<=obj-1;i++){
            arr.push(i)
        }
        return arr
    }
    const handleInputChange = (val, field, identifier) => {
        if (identifier === "Column Identifier") {
            let obj = { ...colPanelValue }
            obj[field] = val
            if(field == "start" && val!=undefined && val!=""){
                let arr = updateCheckbox(val,obj.stop)
                setSelectedColRows(arr)
            }else if(field == "stop" && val!=undefined && val!=""){
                let arr1 = updateCheckbox(obj.start,val)
                setSelectedColRows(arr1)
            }
            setColPanelValue(obj)
        } else {
            let obj1 = { ...rowPanelValue }
            obj1[field] = val
            if(field == "start" && val!=undefined && val!=""){
                let arr = updateCheckbox(val,obj1.stop)
                setSelectedRowRows(arr)
            }else if(field == "stop" && val!=undefined && val!=""){
                let arr1 = updateCheckbox(obj1.start,val)
                setSelectedRowRows(arr1)
            }
            setRowPanelValue(obj1)
        }
    }

    const handlePrewiew = async () => {
        // dispatch(showLoader());
        let req = {
            column_config: {
                columns: [],
                method: "row_index",
                params: {
                    pk_row_index: colPanelValue?.pk_index,
                    start_index: colPanelValue?.start,
                    stop_index: colPanelValue?.stop
                }
            },
            filename: `${params?.file?.split('.')[0]}_page-0.jpeg.json`,
            page: 1,
            row_config: {
                method: "column_index",
                params: {
                    pk_col_index: rowPanelValue?.pk_index,
                    start_index: rowPanelValue?.start,
                    stop_index: rowPanelValue?.stop
                },
                rows: []
            },
            table_id: "",
            table_identifier: tableIdentifierValues,
            table_name: "asdas"
        }
        let arr = selectedColValues?.filter(item => selectedColRows?.includes(item?.key))
        let arr1 = selectedRowValues?.filter(item => selectedRowRows?.includes(item?.key))
        if (arr) {
            let cols = arr.map(item => (
                {
                    col_id: item.columnindex,
                    selected: true,
                    Text: item.cell_text,
                    method: item?.method,
                    params: [item?.params],
                    apply_to: item?.applicalbe_to
                }
            ))
            req.column_config.columns = cols
        }
        if (arr1) {
            let rows = arr1.map(item => (
                {
                    row_id: item.rowindex,
                    selected: true,
                    Text: item.cell_text,
                    method: item?.method,
                    params: [item?.params],
                    apply_to: item?.applicalbe_to
                }
            ))
            req.row_config.rows = rows
        }
        let res = await previewTable(req)
        if (res["status-code"] == 200) {
            let tableColumnsa = tableColumns(res?.Data)
            setModalData(res?.Data)
            setModalColumns(tableColumnsa)
            dispatch(hideLoader());
        } else {
            dispatch(hideLoader());
            dispatch(showNotification('error', res.Message));
        }
    }

    const genTableExtra = (val, values) => (
        <div style={{ display: "flex", justifyContent: "space-between" }} onClick={e => e.stopPropagation()}>
            <p style={{ marginBottom: 0 }}>{val}</p>
            <Switch size='medium' style={{ marginLeft: val == "Row Identifier" ? 35 : 10 }} />
            <div style={{ marginTop: -5 }}>
                <Input disabled={columnData.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"} value={values?.start} placeholder='Start Index' style={{ width: 100, marginLeft: 10 }} onChange={(e) => handleInputChange(e.target.value, "start", val)} />
            </div>
            <div style={{ marginTop: -5 }}>
                <Input disabled={columnData.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"} value={values?.stop} placeholder='Stop Index' style={{ width: 100, marginLeft: 10 }} onChange={(e) => handleInputChange(e.target.value, "stop", val)} />
            </div>
            <div style={{ marginTop: -5 }}>
                <Input disabled={columnData.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"} value={values?.pk_index} placeholder=' PK Row Index' style={{ width: 128, marginLeft: 10 }} onChange={(e) => handleInputChange(e.target.value, "pk_index", val)} />
            </div>
            {/*  */}
        </div>
    )


    const ColumnTable = () => (
        <div >
            <EditableTableForm columnData={columnData} selectedIdentifier={selectedIdentifier} setSelectedRowRows={setSelectedColRows} selectedRowRows={selectedColRows}
                setSelectedRowValues={setSelectedColValues} selectedRowValues={selectedColValues} triggerUpdate={triggerUpdate} />
        </div>
    )

    const RowTable = () => (
        <div >
            <EditableTableForm columnData={rowData} selectedIdentifier={selectedIdentifier} setSelectedRowRows={setSelectedRowRows} selectedRowRows={selectedRowRows}
                setSelectedRowValues={setSelectedRowValues} selectedRowValues={selectedRowValues} triggerUpdate={triggerUpdate} />
        </div>
    )

    const handleIdentifierChange = (val) => {
        if (val == 1) {
            setSelectedIdentifier("columnindex")
        } else if (val == 2) {
            setSelectedIdentifier("rowindex")
        }

    }

    return (
        <Collapse
            accordion
            expandIconPosition='right'
            style={{ marginTop: 20 }}
            collapsible={columnData.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"}
            onChange={handleIdentifierChange}
        >
            <Panel id="columns" header={genTableExtra("Column Identifier", colPanelValue)} key='1' >
                <ColumnTable />
            </Panel>
            <Panel id="row" header={genTableExtra("Row Identifier", rowPanelValue)} key='2'>
                <RowTable />
            </Panel>
        </Collapse>
    )
}

export default TableIdentifier