import { Tooltip } from "antd";

export const tableColumns = (item) => {
	let objkeys =
		item !== undefined && item.length > 0 ? Object.keys(item[0]) : [];
	let column = [];
	objkeys &&
		objkeys.map((val, i) => {
			return (
				column.push({
					title: val.toUpperCase().replace(/_/g, " "),
					dataIndex: val,
					key: `${val}-${i}`
				})
			)
		});

	return column;
};

export const generateColumns = (responseData) => {
	const columns = [];
	const firstRow = responseData[0];
	for (const key in firstRow) {
		if (Object.hasOwnProperty.call(firstRow, key)) {
			const column = {
				title: key.toUpperCase().replace(/_/g, " "),
				dataIndex: key,
				key: key,
				width: 150,
				render: (text) => {
					return (
						<Tooltip title={text}>
							<p className="table--taxt__overflow">{text}</p>
						</Tooltip>
					)
				}
			};
			columns.push(column);
		}
	}
	return columns;
};
