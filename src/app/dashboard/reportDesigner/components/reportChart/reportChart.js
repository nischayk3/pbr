import React from 'react'
import Chart from '../../../workspace/components/chartComponent/chartComponent'
import { Table } from 'antd'

function ChartTable(props) {
    return (
        <div className="chartTable">
            <div>
                <Chart />
            </div>
            <div>
                <Table/>
            </div>
        </div>
    )
}

export default ChartTable