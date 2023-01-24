import { v4 as uuidv4 } from 'uuid';
import FormInput from './FormInput';
import FormText from './FormText';
export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";



export const SIDEBAR_ITEMS = [
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
          type: "Text",
          content: "FormText"
        }
      },
      {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
          type: "Chart",
          content: "Some name"
        }
      },
    {
      id: uuidv4(),
      type: SIDEBAR_ITEM,
      component: {
        type: "Input field",
        content: "FormInput"
        // <FormInput 
        // // current="1"
        // // task = {task}
        // // handleFormControl= {handleFormControl}
        // // handleFormControlSelect= {handleFormControlSelect}
        // // handleSave= {handleSave} 
        //  />
      }
    },
    {
      id: uuidv4(),
      type: SIDEBAR_ITEM,
      component: {
        type: "Table",
        content: "FormTable"
      }
    },
    {
      id: uuidv4(),
      type: SIDEBAR_ITEM,
      component: {
        type: "Line",
        content: "FormLine"
      }
    },
    {
      id: uuidv4(),
      type: SIDEBAR_ITEM,
      component: {
        type: "Multiple choice",
        content: "Formradio"
      }
    },
    {
      id: uuidv4(),
      type: SIDEBAR_ITEM,
      component: {
        type: "Checkbox",
        content: "FormCheckbox"
      }
    },
    
  ];
  