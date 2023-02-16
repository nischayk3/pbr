import { Table } from "antd";

const DataTable = () => {

	return (
		<div className="table-wrap">
			<div className="table-head">
				<p>Please double-click the fields to edit them</p>
			</div>
			<Table bordered={false} className="elog-table" />
		</div>
	)
}

export default DataTable;