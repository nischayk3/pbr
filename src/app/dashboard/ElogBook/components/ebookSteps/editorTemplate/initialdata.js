import { COMPONENT, ROW, COLUMN } from "./data";
import InputForm from "./FormInput";

const initialData = {
  layout: [
    // {
    //   type: ROW,
    //   id: "row0",
    //   children: [
    //     {
    //       type: COLUMN,
    //       id: "column0",
    //       children: [
    //         {
    //           type: COMPONENT,
    //           id: "component0"
    //         },
    //         {
    //           type: COMPONENT,
    //           id: "component1"
    //         }
    //       ]
    //     },
    //     {
    //       type: COLUMN,
    //       id: "column1",
    //       children: [
    //         {
    //           type: COMPONENT,
    //           id: "component2"
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   type: ROW,
    //   id: "row1",
    //   children: [
    //     {
    //       type: COLUMN,
    //       id: "column2",
    //       children: [
    //         {
    //           type: COMPONENT,
    //           id: "component3"
    //         },
    //         {
    //           type: COMPONENT,
    //           id: "component0"
    //         },
    //         {
    //           type: COMPONENT,
    //           id: "component2"
    //         }
    //       ]
    //     }
    //   ]
    // }
  ],
  components: {
    component0: { id: "component0", type: "Text", content: "Text"},
    component1: { id: "component1", type: "Chart", content: "Some image" },
    component2: { id: "component2", type: "Input field", content: <InputForm />  },
    component3: { id: "component3", type: "Table", content: "Some name" },
    component4: { id: "component4", type: "Line", content: "Some phone" },
    component5: { id: "component5", type: "Multiple choice", content: "Some phone" },
    component6: { id: "component6", type: "Checkbox", content: "Some phone" }
  }
};

export default initialData;
