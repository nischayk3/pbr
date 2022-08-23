import { Empty, Table } from "antd";
import React, { useEffect, useState } from "react";

const ViolationTable = ({ postChartData }) => {
	const [violationsTable, setViolationTable] = useState([]);

	let columns = [];
	const objkeys =
		violationsTable !== undefined && violationsTable.length > 0
			? Object.keys(violationsTable[0])
			: [];
	const uniqueArr = (value, index, self) => {
		return self.indexOf(value) === index;
	};
	const filterColumn = objkeys.filter(uniqueArr);
	filterColumn.forEach((item, i) => {
		columns.push({
			title: item.toUpperCase().replace("_", " "),
			dataIndex: item,
			key: `${item}-${i}`,
			render: (text) => String(text)
		});
	});

	useEffect(() => {
		const newCovArr = JSON.parse(JSON.stringify(postChartData));
		newCovArr &&
			newCovArr.data &&
			newCovArr.data.forEach((ele) => {
				if (ele.violations) {
					const violation = ele.violations;
					violation &&
						violation.forEach((element) => {
							element.recorded_date = new Date(
								element.recorded_date
							).toLocaleDateString();
						});
					setViolationTable(ele.violations);
				}
			});
	}, [postChartData]);



	return (
		<div>
			{violationsTable.length >= 1 ? (
				<Table
					columns={columns}
					pagination={false}
					scroll={{ y: 350 }}
					dataSource={violationsTable}
				/>
			) : (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			)}
		</div>
	);
};

export default ViolationTable;
