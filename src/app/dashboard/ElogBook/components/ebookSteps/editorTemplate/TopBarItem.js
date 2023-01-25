import React from "react";
import { useDrag } from "react-dnd";
import { SIDEBAR_ITEM } from "./data";

const TopBarItem = ({ data, collapsed }) => {
  const [{ opacity }, drag] = useDrag({
    type: SIDEBAR_ITEM,
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      <div style={{ paddingInline: collapsed ? "61px" : "38px" }}>{data.component.type}</div>
    </div>
  );
};
export default TopBarItem;
