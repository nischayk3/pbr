import { v4 as uuidv4 } from 'uuid';
import FormInput from './components/FormInput';
import FormText from './components/FormText';
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
      // {
      //   id: uuidv4(),
      //   type: SIDEBAR_ITEM,
      //   component: {
      //     type: "Chart",
      //     content: "Some name"
      //   }
      // },
    {
      id: uuidv4(),
      type: SIDEBAR_ITEM,
      component: {
        type: "Input field",
        content: "FormInput"
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
  