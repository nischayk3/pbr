import { Table } from "antd";
import React, { useEffect, useState } from "react";

const ProcessCapabilityResult = ({ postChartData }) => {
	const [dataTable, setDataTable] = useState([]);

	let columns = [];
	const first = "batch_num";
	let objkeys = (
		dataTable !== undefined && dataTable.length > 0
			? Object.keys(dataTable[0])
			: []
	).sort(function (x, y) {
		return x == first ? -1 : y == first ? 1 : 0;
	});

	const uniqueArr = (value, index, self) => {
		return self.indexOf(value) === index;
	};
	const filterColumn = objkeys.filter(uniqueArr);
	filterColumn.forEach((item, i) => {
		columns.push({
			title: item.toUpperCase().replace("_", " "),
			dataIndex: item,
			key: `${item}-${i}`,
			width: item === "uom_code" || item === first ? 150 : 250,
			render: (text) => String(text)
		});
	});

	useEffect(() => {
		const newCovArr = JSON.parse(JSON.stringify(postChartData));
		newCovArr &&
			newCovArr.data &&
			newCovArr.data.forEach((ele) => {
				if (ele.extras && ele.extras.data_table) {
					setDataTable(ele.extras.data_table);
				}
			});
	}, [postChartData]);

	return (
		<div>
			<Table
				style={{ width: "fit-content" }}
				columns={columns}
				pagination={false}
				scroll={{ y: 350 }}
				dataSource={dataTable}
				rowKey={(record) => record.batch_num}
			/>
		</div>
	);
};

export default ProcessCapabilityResult;
