import { Collapse, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../../duck/actions/commonActions';
import { getRowColumnData, previewTable } from '../../../../../services/pbrService';
import { tableColumns } from '../../../../../utils/TableColumns';
import { EditableTableForm } from './EditableForm';

const { Panel } = Collapse;
/* istanbul ignore next */
function TableIdentifier(props) {
	let { clickedTable, metaData, imageHeight, imageWidth, triggerPreview, templateVersion,
		params, triggerUpdate, setSideTableData, setTriggerUpdate, tableActiveKey, formTableData,
		setModalData, setModalColumns, initialSideTableData, pageIdFormValues, pageNumber } = props
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
	const [tableID, setTableID] = useState(null);


	useEffect(() => {
		setColPanelValue(formTableData[tableActiveKey]?.tableData?.colPanelValue)
		setRowPanelValue(formTableData[tableActiveKey]?.tableData?.rowPanelValue)
		setSelectedRowValues(formTableData[tableActiveKey]?.tableData?.selectedRowValues)
		setSelectedColValues(formTableData[tableActiveKey]?.tableData?.selectedColValues)
		setSelectedColRows(formTableData[tableActiveKey]?.tableData?.selectedColRows ? formTableData[tableActiveKey]?.tableData?.selectedColRows : [])
		setSelectedRowRows(formTableData[tableActiveKey]?.tableData?.selectedRowRows ? formTableData[tableActiveKey]?.tableData?.selectedRowRows : [])
		setTableIdentifierValues(formTableData[tableActiveKey]?.tableData?.table_identifier)
		setColumnData(formTableData[tableActiveKey]?.tableData?.selectedColValues ? formTableData[tableActiveKey]?.tableData?.selectedColValues : [])
		setrowData(formTableData[tableActiveKey]?.tableData?.selectedRowValues ? formTableData[tableActiveKey]?.tableData?.selectedRowValues : [])
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

	// useEffect(() => {
	//     if (selectedColRows.length > 0 ) {
	//         let min = Math.min(...selectedColRows)
	//         let max = Math.max(...selectedColRows)
	//         setColPanelValue({ start: min+1, stop: max+1, pk_index: selectedColRows?.pk_index?selectedColRows?.pk_index:"1" })
	//     }
	//     if (selectedRowRows.length > 0) {
	//         let min = Math.min(...selectedRowRows)
	//         let max = Math.max(...selectedRowRows)
	//         setRowPanelValue({ start: min+1, stop: max+1, pk_index: selectedRowRows?.pk_index?selectedRowRows?.pk_index:"1" })
	//     }
	// }, [selectedColRows, selectedRowRows])

	const geTableData = async (clickedTable, col = 1, row = 1, table = null, flag) => {
		try {
			dispatch(showLoader());
			let req = {
				filename: `${metaData?.file?.split('.pdf')[0]}_page-${pageNumber - 1}.jpeg.json`,
				page: pageNumber,
				config: {
					pk_col_index: row,
					pk_row_index: col
				},
				table_identifier: tableIdentifierValues != undefined && Object.keys(tableIdentifierValues).length > 0 ? tableIdentifierValues : {
					"left": clickedTable?.coords[0] / imageWidth, "top": clickedTable?.coords[1] / imageHeight,
					"width": (clickedTable?.coords[2] - clickedTable?.coords[0]) / imageWidth, "height": (clickedTable?.coords[3] - clickedTable?.coords[1]) / imageHeight
				},
				action_type: params?.temp_disp_id ? newEditTemplate ? "create" : "edit" : "create",
				table_id: table,
				template_id: params?.temp_disp_id ? params?.temp_disp_id : null,
				version: templateVersion ? templateVersion : null
			}
			let res = await getRowColumnData(req)
			if (res["status-code"] == 200) {
				let obj = res.Data1.map((item, index) => ({ ...item, key: index }))
				let obj2 = res.Data2.map((item, index) => ({ ...item, key: index }))
				let arr = obj.map((item, index) => index)
				let arr1 = obj2.map((item1, index1) => index1)
				setTableID(res?.Table_id)

				setColumnData(obj)
				setrowData(obj2)
				if (!flag) {
					setColPanelValue({ start: "1", stop: `${obj.length}`, pk_index: col })
					setRowPanelValue({ start: "1", stop: `${obj2.length}`, pk_index: row })
					setSelectedColRows(arr)
					setSelectedRowRows(arr1)
				}
				setSelectedColValues(obj)
				setSelectedRowValues(obj2)
				dispatch(hideLoader());
			} else {
				dispatch(hideLoader());
				dispatch(showNotification('error', res.Message));
			}
		} catch (error) { /* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'No Data Found'));
		}


	}
	const updateCheckbox = (val, obj) => {
		let arr = []
		for (let i = Number(val - 1); i <= obj - 1; i++) {
			arr.push(i)
		}
		return arr
	}

	const checkValueInArray = (array, value) => {
		let arr = [...array]
		if (!arr.includes(value)) {
			arr.push(value)
		}
		return arr
	}
	const handleInputChange = (val, field, identifier) => {
		if (identifier === "Column Identifier") {
			let obj = { ...colPanelValue }
			obj[field] = val
			if (field == "start" && val != undefined && val != "") {
				if (val > colPanelValue.stop) {
					dispatch(showNotification('error', 'Start must be less then stop'));
				} else {
					let arr = updateCheckbox(val, obj.stop)
					arr = checkValueInArray(arr, Number(rowPanelValue?.pk_index) - 1)
					setSelectedColRows(arr)
				}
			} else if (field == "stop" && val != undefined && val != "") {
				let arr1 = updateCheckbox(obj.start, val)
				arr1 = checkValueInArray(arr1, Number(rowPanelValue?.pk_index) - 1)
				setSelectedColRows(arr1)
			} else if (field == "pk_index") {
				if (val != "" && Number(val) <= Number(rowPanelValue.start)) {
					let arr = [...selectedRowRows]
					if (arr[arr.length - 1] === Number(rowPanelValue.stop - 1)) {
						arr.push(Number(val - 1))
					} else {
						arr.pop()
						arr.push(Number(val - 1))
					}
					setSelectedRowRows(arr)
					geTableData(clickedTable, Number(val), Number(rowPanelValue.pk_index), tableID, true)
				} else if (Number(val) > Number(rowPanelValue.start)) {
					dispatch(showNotification('error', 'PK_COL_Index out of bound'));
				}

			}
			setColPanelValue(obj)
		} else {
			let obj1 = { ...rowPanelValue }
			obj1[field] = val
			if (field == "start" && val != undefined && val != "") {
				if (val > rowPanelValue.stop) {
					dispatch(showNotification('error', 'Start must be less then stop'));
				} else {
					let arr = updateCheckbox(val, obj1.stop)
					arr = checkValueInArray(arr, Number(colPanelValue?.pk_index) - 1)
					setSelectedRowRows(arr)
				}

			} else if (field == "stop" && val != undefined && val != "") {
				let arr1 = updateCheckbox(obj1.start, val)
				arr1 = checkValueInArray(arr1, Number(colPanelValue?.pk_index) - 1)
				setSelectedRowRows(arr1)
			} else if (field == "pk_index") {
				if (val != "" && Number(val) <= Number(colPanelValue.start)) {
					let arr = [...selectedColRows]
					if (arr[arr.length - 1] === Number(colPanelValue.stop - 1)) {
						arr.push(Number(val - 1))
					} else {
						arr.pop()
						arr.push(Number(val - 1))
					}
					setSelectedColRows(arr)
					geTableData(clickedTable, Number(colPanelValue.pk_index), Number(val), tableID, true)
				} else if (Number(val) > Number(colPanelValue.start)) {
					dispatch(showNotification('error', 'PK_ROW_Index out of bound'));
				}

			}
			setRowPanelValue(obj1)
		}
	}

	const handlePrewiew = async () => {
		let pageArr = []
		if (pageIdFormValues) {
			pageIdFormValues.forEach(item => {
				let obj = { name: "", keys: [] }
				Object.entries(item).forEach(item1 => {
					if (item1[0] != "name" && item1[0] != "keyCount") {
						obj.keys.push(item1[1])
					}
					if (item1[0] === "name") {
						obj.name = item1[1]
					}
				})
				pageArr.push(obj)

			})
		}
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
			filename: `${params?.file?.split('.pdf')[0]}_page-${pageNumber - 1}.jpeg.json`,
			page: pageNumber,
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
			table_name: formTableData[tableActiveKey]?.name,
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
			dispatch(showNotification('error', res?.Message ? res?.Message : res?.detail));
		}
	}

	const genTableExtra = (val, values) => (
		<div style={{ display: "flex", justifyContent: "space-between" }} onClick={e => e.stopPropagation()}>
			<p style={{ marginBottom: 0 }}>{val}</p>
			{/* <Switch size='medium' style={{ marginLeft: val == "Row Identifier" ? 35 : 10 }} /> */}
			<div style={{ marginTop: -5, marginLeft: val == "Row Identifier" ? 53 : 30 }}>
				<span style={{ fontSize: 13 }}>Start Index</span><Input disabled={columnData?.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"} value={values?.start} style={{ width: 60, marginLeft: 10 }} onChange={(e) => handleInputChange(e.target.value, "start", val)} />
			</div>
			<div style={{ marginTop: -5, marginLeft: 20 }}>
				<span style={{ fontSize: 13 }}>Stop Index</span><Input disabled={columnData?.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"} value={values?.stop} style={{ width: 60, marginLeft: 10 }} onChange={(e) => handleInputChange(e.target.value, "stop", val)} />
			</div>
			<div style={{ marginTop: -5, marginLeft: 20 }}>
				<span style={{ fontSize: 13 }}>{val == "Row Identifier" ? "PK Col Index" : ' PK Row Index'}</span><Input disabled={columnData?.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"} value={values?.pk_index} style={{ width: 60, marginLeft: val == "Row Identifier" ? 19 : 10 }} onChange={(e) => handleInputChange(e.target.value, "pk_index", val)} />
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
	console.log("formTableData", formTableData)
	return (
		<Collapse
			accordion
			expandIconPosition='right'
			style={{ marginTop: 20 }}
			collapsible={columnData?.length > 0 ? "" : params?.temp_disp_id ? newEditTemplate ? "disabled" : "" : "disabled"}
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