import { Table } from "antd";
import React from "react";

const ChartSearchTable = (props) => {
	const columns = [
		{
			title: 'Name',
			key: 'chart_name',
			dataIndex: 'chart_name',

		},
		{
			title: 'Chart',
			key: 'chart_disp_id',
			dataIndex: 'chart_disp_id',
			width: '100px'


		},
		{
			title: 'Chart Version',
			key: 'chart_version',
			dataIndex: 'chart_version',

		}
	]

	return (
		<div style={props.style}>
			<Table
				bordered={false}
				columns={columns}
				dataSource={props.searchTableData}
				pagination={false}
				style={{ width: '100%', maxHeight: '150px', overflow: 'scroll' }}
				rowKey='key'
				onRow={(record) => ({
					onClick: () => {
						props.setViewData?.({ ...props.viewData, chartName: record.chart_name, chartDispId: record.chart_disp_id, status: record.chart_status, searchValue: record.chart_disp_id, chartVersion: record.chart_version, createdBy: record.created_by, viewId: record.chart_info.view_id });
						props.parentCallback?.({ ...props.viewData, chartName: record.chart_name, chartDispId: record.chart_disp_id, status: record.chart_status, searchValue: record.chart_disp_id, chartVersion: record.chart_version, createdBy: record.created_by, viewId: record.chart_info.view_id });
						props.setChartSearch(false);
					},
				})}
			/>
		</div>
	);
};

export default ChartSearchTable;
