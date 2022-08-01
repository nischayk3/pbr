import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Collapse, Switch } from 'antd'
import { EditableTableForm } from './EditableForm'
import { getRowColumnData } from '../../../../../services/pbrService'
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../../duck/actions/commonActions';

const { Panel } = Collapse;
/* istanbul ignore next */
function TableIdentifier(props) {
    let { clickedTable, metaData, imageHeight, imageWidth } = props
    const dispatch = useDispatch();
    const [columnData, setColumnData] = useState([])
    const [rowData, setrowData] = useState([])

    console.log("clickedTable", props)
    useEffect(() => {

        if (Object.keys(clickedTable).length) {
            console.log("innnn111")
            geTableData()
        }

    }, [clickedTable])
    const geTableData = async () => {
        try {
            dispatch(showLoader());
            let req = {
                filename: `${metaData?.file?.split('.')[0]}_page-${0}.jpeg.json`,
                id: null,
                page: 1,
                table_identifier: {
                    "left": clickedTable?.coords[0] / imageWidth, "top": clickedTable?.coords[1] / imageHeight,
                    "width": (clickedTable?.coords[2] - clickedTable?.coords[0]) / imageWidth, "height": (clickedTable?.coords[3] - clickedTable?.coords[1]) / imageHeight
                },
                action_type: "custom"
            }
            let res = await getRowColumnData(req)
            if (res["status-code"] == 200) {
                setColumnData(res.Column_Identifier)
                setrowData(res.Row_Identifier)
                dispatch(hideLoader());
            } else {
                dispatch(hideLoader());
                dispatch(showNotification('error', 'No Data Found'));
            }
            console.log("ress", res)
        } catch (error) { /* istanbul ignore next */
            dispatch(hideLoader());
            dispatch(showNotification('error', 'No Data Found'));
        }


    }
    const genTableExtra = () => (
        <div style={{ display: "flex", justifyContent: "space-between" }} onClick={e => e.stopPropagation()}>
            <p style={{ marginBottom: 0 }}>Column Identifier</p>
            <Switch size='medium' style={{ marginLeft: 10 }} />
        </div>
    )

    const genTableExtraRow = () => (
        <div style={{ display: "flex", justifyContent: "space-between" }} onClick={e => e.stopPropagation()}>
            <p style={{ marginBottom: 0 }}>Row Identifier</p>
            <Switch size='medium' style={{ marginLeft: 35 }} />
        </div>
    )

    const ColumnTable = () => (
        <div >
            <EditableTableForm columnData={columnData} />
        </div>
    )

    const RowTable = () => (
        <div >
            <EditableTableForm columnData={rowData} />
        </div>
    )

    return (
        <Collapse
            accordion
            expandIconPosition='right'
            style={{ marginTop: 20 }}
            collapsible= {columnData.length>0?"":"disabled"}
        >
            <Panel id="columns" header={genTableExtra()} key='1' >
                <ColumnTable />
            </Panel>
            <Panel id="row" header={genTableExtraRow()} key='2'>
                <RowTable />
            </Panel>
        </Collapse>
    )
}

export default TableIdentifier