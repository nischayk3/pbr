import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./data";
import FormInput from "./components/FormInput";
import FormText from "./components/FormText";
import FormCheckbox from "./components/FormCheckbox";
import Formtable from "./components/Formtable";
import FormRadio from "./components/FormRadio";
import FormLine from "./components/FormLine";

const style = {
  // border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move"
};
const Component = ({ data, components, path,handleFilterPanel, handleColumnTitle, layout, setLayout }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {  id: data.id, path },
    type: COMPONENT,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      {/* <div>{data.id}</div> */}
      <div onClick={() => handleFilterPanel(component) }>
        {component.content === "FormInput" ? 
      <FormInput 
        task = {data}
        layout={layout}
         />
          : component.content === "FormText" ? 
         <FormText 
         task = {data}
         /> 
         : component.content === "FormCheckbox" ? 
         <FormCheckbox 
         task={data}
         /> 
         : component.content === "FormTable" ?
         <Formtable
         task={data}
         handleColumnTitle={handleColumnTitle}
         layout={layout}
         setLayout={setLayout}
         /> :  component.content === "Formradio" ?
          <FormRadio 
          task={data}
          />
          :component.content === "FormLine" ?
          <FormLine task={data} />
          : ''}</div>

    </div>
  );
};
export default Component;
