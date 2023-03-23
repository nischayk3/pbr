import { BarChartOutlined, FileDoneOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./tabs.scss";

export default function DataAccessTabs(props) {

  const [tabsList, setTabsList] = useState([
    {
      title: "Genealogy",
      icon: <FileDoneOutlined style={{ color: "#162154" }} />,
      selected: false,
    },
    {
      title: "View",
      icon: <BarChartOutlined style={{ color: "#162154" }} />,
      selected: false,
    },
    {
      title: "Roles and Access",
      icon: <BarChartOutlined style={{ color: "#162154" }} />,
      selected: false,
    },
    {
      title: "PBR",
      icon: <BarChartOutlined style={{ color: "#162154" }} />,
      selected: false,
    },
  ]);

  const handleClick = (tab_name) => {
    props.setSelectedTab(tab_name);
    let items = [...tabsList];
    items.forEach((element, index) => {
      if (element.title === tab_name) {
        items[index].selected = true;
      } else {
        items[index].selected = false;
      }
    });
    setTabsList(items);
  };

  return (
    <>
      {tabsList.map((i, index) => {
        return (
          <div
            id={"approval-cards-" + index}
            key={index}
            className={i.selected ? "approval-cards-active" : "approval-cards"}
            onClick={() => handleClick(i.title)}
          >
            <div className={"circle_icon"}>{i.icon}</div>
            <div className={"card_desc"}>
              <p className={"approve-desc"}>{i.title}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
