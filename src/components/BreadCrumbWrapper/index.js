import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import breadcrumbNameMap from "./map.json";
import "./style.scss";

const BreadCrumbWrapper = (props) => {
	const location = useLocation();
	if (props.urlName) {
		breadcrumbNameMap[props.urlName] =
			Number(props.value) === 0
				? props.data
					? props.data
					: "Untitled"
				: props.value;
	}
	const pathSnippets = location.pathname.split("/").filter((i) => i);
	const extraBreadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
		return (
			<Breadcrumb.Item key={index}>
				<Link to={url}>{breadcrumbNameMap[url]}</Link>
			</Breadcrumb.Item>
		);
	});
	const breadcrumbItems = [
		<Link to="/dashboard/dashboard">
			<HomeOutlined />
		</Link>
	].concat(extraBreadcrumbItems);
	return (
		<Breadcrumb className="bread-crumb-wrapper">{breadcrumbItems}</Breadcrumb>
	);
};

export default BreadCrumbWrapper;
