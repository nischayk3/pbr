import React, { useState } from "react";
import "./styles.scss";
import { Tag } from "antd";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { MenuOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { arrayMoveImmutable } from "array-move";

const TransformationList = ({ type }) => {
  const iniatalState = {
    items: ["L0_S0_0", "L0_S0_1", "L0_S0_2", "L0_S0_3", "L0_S0_4", "L0_S0_5"],
  };
  const [listAArray, setListArray] = useState(iniatalState);
  const SortableItem = SortableElement(({ value }) => (
    <div className="list-container" tabIndex={0}>
      <div>
        {value}
        &emsp;&emsp;
        <Tag color={type === "transformation" ? "geekblue" : "purple"}>
          Dummy
        </Tag>
        &emsp;
        <ArrowRightOutlined />
        &emsp;
        <Tag color={type === "transformation" ? "geekblue" : "purple"}>
          Simple Imputer
        </Tag>
      </div>
      <MenuOutlined />
    </div>
  ));
  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </ul>
    );
  });
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setListArray(({ items }) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  };

  return (
    <div>
      <SortableList items={listAArray.items} onSortEnd={onSortEnd} />
    </div>
  );
};

export default TransformationList;
