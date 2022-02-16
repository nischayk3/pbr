import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import breadcrumbNameMap from "./map.json";
import "./style.scss";

const BreadCrumbWrapper = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [].concat(extraBreadcrumbItems);
  return <Breadcrumb className="bread-crumb-wrapper">{breadcrumbItems}</Breadcrumb>;
};

export default BreadCrumbWrapper;
