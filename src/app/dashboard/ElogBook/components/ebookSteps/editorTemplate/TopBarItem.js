import React from "react";
import { useDrag } from "react-dnd";
import { SIDEBAR_ITEM } from "./data";

const TopBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: SIDEBAR_ITEM,
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      <div className="title-text">{data.component.type}</div>
    </div>
  );
};
export default TopBarItem;
