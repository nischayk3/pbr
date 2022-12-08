import { ArrowRightOutlined, MenuOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./styles.scss";

/* istanbul ignore next */
const TransformationList = ({ type, getTransformationList, transformationData }) => {

	const [listAArray, setListArray] = useState();
	const SortableItem = SortableElement(({ value }) => (
		<div className="list-container" tabIndex={0}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<p style={{ width: '150px' }}>
					{value.key}
				</p>
				{value?.value?.map((ele, index) => {
					return (<>
						{index > 0 && <ArrowRightOutlined style={{ marginRight: '5px' }} />}
						<Tag color={type === "transformation" ? "geekblue" : "purple"}>{ele}</Tag>
					</>)
				})}
			</div>
			<div className="icon-menu">
				<MenuOutlined />
			</div>
		</div>
	));
	const SortableList = SortableContainer(({ items }) => {
		return (
			<ul>
				{items && items.map((value, index) => (
					<SortableItem key={`item-${value}`} index={index} value={value} />
				))}
			</ul>
		);
	});
	const onSortEnd = ({ oldIndex, newIndex }) => {
		// setListArray(({ items }) => ({
		//   items: arrayMoveImmutable(items, oldIndex, newIndex),
		// }));
	};

	useEffect(() => {
		if (type === 'transformation') {
			getTransformationList('transformation');
		} else {
			getTransformationList('feature union');
		}
	}, [])

	useEffect(() => {
		setListArray(transformationData)
	}, [transformationData])


	return (
		<div>
			<SortableList items={listAArray} onSortEnd={onSortEnd} />
		</div>
	);
};

export default TransformationList;
