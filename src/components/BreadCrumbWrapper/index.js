import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { v1 as uuid } from 'uuid';
import breadcrumbNameMap from "./map.json";
import "./style.scss";

const BreadCrumbWrapper = (props) => {
	const location = useLocation();
	if (props.urlName) {
		breadcrumbNameMap[props.urlName] = props.value;
	}
	const pathSnippets = location.pathname.split("/").filter((i) => i);
	const arrSlice = pathSnippets?.slice(0, 2)
	const extraBreadcrumbItems = arrSlice.map((_, index) => {
		const url = `/${arrSlice.slice(0, index + 1).join("/")}`;
		return (
			<Breadcrumb.Item key={index}>
				<Link to={url}>{breadcrumbNameMap[url]}</Link>
			</Breadcrumb.Item>
		);
	});
	const breadcrumbItems = [
		<Link key={uuid()} to="/dashboard/workspace">
			<HomeOutlined />
		</Link>
	].concat(extraBreadcrumbItems);
	return (
		<Breadcrumb className="bread-crumb-wrapper">{breadcrumbItems}</Breadcrumb>
	);
};

export default BreadCrumbWrapper;
