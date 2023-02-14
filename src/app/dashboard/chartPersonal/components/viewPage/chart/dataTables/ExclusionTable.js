import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import queryString from "query-string";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../../../duck/actions/commonActions";
import { postChartPlotData } from "../../../../../../../services/chartPersonalizationService";

const ExclusionTable = ({
	exclusionTable,
	setExclusionTable,
	postChartData,
	setPostChartData,
	exclusionIdCounter,
}) => {
	const dispatch = useDispatch();
	const params = queryString.parse(location.search);
	const [exclusionData, setExclusionData] = useState(exclusionTable);

	let columns = [];
	const objkeys =
		exclusionTable !== undefined && exclusionTable.length > 0
			? Object.keys(exclusionTable[0])
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
			render: (text) => String(text),
		});
	});
	/* istanbul ignore next */
	const handleChange = async (id) => {
		const newArr = [...postChartData.data];
		newArr[0].exclusions = newArr[0].exclusions.filter(
			(ele) => Number(ele.exclusion_id) !== Number(id)
		);
		const tempExclusionData = exclusionTable.filter(
			(ele) => Number(ele.exclusion_id) !== Number(id)
		);
		setExclusionData(tempExclusionData);
		setExclusionTable(tempExclusionData);
		if(!tempExclusionData?.length) {
			newArr[0].layout.annotations =  newArr[0]?.layout?.annotations.filter((annot) => annot?.id !== 2)
		}
		exclusionIdCounter.current = exclusionIdCounter.current - 1;
		setPostChartData({ ...postChartData, data: newArr });
		let errorMsg = "";
		/* istanbul ignore next */
		try {
			dispatch(showLoader());
			const viewRes = await postChartPlotData(postChartData);
			errorMsg = viewRes?.message;
			setPostChartData({ ...postChartData, data: viewRes.data });
			dispatch(hideLoader());
		} catch (err) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			if (errorMsg) {
				dispatch(showNotification("error", errorMsg));
			}
		}
	};

	useEffect(() => {
		if(postChartData?.data) {
			const newArr = [...postChartData.data];
			const annotations = {
				text: "This chart has batch numbers which are excluded.",
				font: {
				  size: 13,
				  color: "rgb(116, 101, 130)",
				},
				showarrow: false,
				align: "left",
				x: 0,
				y: 1.26,
				xref: "paper",
				yref: "paper",
				id:2
			  }
			newArr.forEach((ele) => {
				if(exclusionData?.length) {
					if(ele?.layout?.annotations?.length) {
						if(ele?.layout?.annotations?.some((annot) => annot?.id !== 2)) {
							ele.layout.annotations.push(annotations);
						}
					} else {
						ele.layout.annotations = [annotations]
					}
				} else {
					ele.layout.annotations =  ele.layout.annotations.filter((annot) => annot?.id !== 2)
				}
			});
			setPostChartData({ ...postChartData, data: newArr });
		}
	}, [exclusionData])


	const deleteColumn = {
		title: "",
		dataIndex: "delete",
		render: (text, record) => (
			<DeleteOutlined onClick={() => handleChange(record.exclusion_id)} />
		),
		width: 50,
	};
	if (Object.keys(params).length === 0 && params.fromScreen !== "Workspace") {
		columns.push(deleteColumn);
	}

	return (
		<div>
			<Table
				columns={columns}
				pagination={false}
				scroll={{ y: 350 }}
				dataSource={exclusionTable}
			/>
		</div>
	);
};

export default ExclusionTable;
