import React, { useState, useEffect, useRef } from 'react';
import BreadCrumbWrapper from "../../../../../../components/BreadCrumbWrapper";
import { Tabs, Button, Dropdown, Space, Typography, Menu, Input, Select,  Upload, message  } from 'antd';
import "../editorTemplate/editorTemplate.scss"
import { DownOutlined } from '@ant-design/icons';
import EditorInput from './editorComponents/editorInput';

const items = [
    {
        key: '1',
        label: 'Text',
    },
    {
        key: '2',
        label: 'Number',
    },
    {
        key: '3',
        label: 'Date',
    },
];

const LayoutDrop = [
    {

        value: "1-Column",
        label: "1-Column"
    },
    {
        value: "2-Column",
        label: "2-Column"
    }
]

const SelectEditor = [
    {
        id: 1,
        name: "Input",
        select: false,
        validations: {
            width: ''
        }

    }
]

const data = [
    {
        id: 1,
        name: "names",
        InputType: "InputBox",
        Type: "text",
        Placeholder: "Enter name"

    },
    {
        id: 2,
        name: "width",
        InputType: "InputBox",
        Type: "Text",
        Placeholder: "Enter Width"

    },
    //   {
    //     name: "Select",
    //     Data: ["Number", "Text"],
    //     Placeholder: "Select"

    //   }
]

const Menus = [
    {
        id: 1,
        title: "Text",
        type: "Button"
    },
    {
        id: 2,
        title: "Chart",
        type: "Button"
    },
    {
        id: 3,
        title: "Input field",
        type: "Dropdown"
    },
    {
        id: 4,
        title: "Table",
        type: "Button"
    },
    {
        id: 5,
        title: "Line",
        type: "Button"
    },
    {
        id: 6,
        title: "Radio buttons",
        type: "Button"
    },
    {
        id: 7,
        title: "Checkboxes",
        type: "Button"
    },
    // {
    //     id:7,
    //     title:"Layout",
    //     type: "Button"
    // },
    // {
    //     id:7,
    //     title:"1-column",
    //     type: "Dropdown"
    // },
]


function editorTemplate() {
//     const draggableTodo = useRef(null);
//   const groupName = useRef(null);
  const [tasks, setTasks] = useState({
//     menus: [{
//         _id: 1,
//         name: "Text",
//         type: "Button"
//     },
//     {
//         _id: 2,
//         name: "Chart",
//         type: "Button"
//     },
//     {
//         _id: 3,
//         name: "Input field",
//         type: "Dropdown"
//     },
//     {
//         _id: 4,
//         name: "Table",
//         type: "Button"
//     },
//     {
//         _id: 5,
//         name: "Line",
//         type: "Button"
//     },
//     {
//         _id: 6,
//         name: "Radio buttons",
//         type: "Button"
//     },
//     {
//         _id: 7,
//         name: "Checkboxes",
//         // type: "Button"
//     }
// ],
    todo: [
    //   {
    //     _id: 233243424,
    //     name: "This is a Todo"
    //   },
    //   {
    //     _id: 1123434,
    //     name: "This is a second Todo"
    //   }
    ],
    inProgress: [
        {
            _id: 1,
            name: "Text",
            type: "Button"
        },
        {
            _id: 2,
            name: "Chart",
            type: "Button"
        },
        {
            _id: 3,
            name: "Input field",
            type: "Dropdown"
        },
        {
            _id: 4,
            name: "Table",
            type: "Button"
        },
        {
            _id: 5,
            name: "Line",
            type: "Button"
        },
        {
            _id: 6,
            name: "Radio buttons",
            type: "Button"
        },
        {
            _id: 7,
            name: "Checkboxes",
            type: "Button"
        }
    ],
    done: [
      {
        _id: 2455422,
        name: ""
      },
      {
        _id: 33235345,
        name: "Input"
      }
    ],
    dragged: {}
  });
//   useEffect(() => {
//     console.log(tasks);
//   }, [tasks]);

//   const dragStart = (event,i,ids) => {
//     console.log(event,i,ids);
//     const { target } = event;
//     console.log(target);
//     const id = target.id;
//     console.log(id);
//     const parentElementId = target.parentElement.id;
//     console.log(parentElementId);
//     setTimeout(() => {
//       target.style.display = "none";
//       draggableTodo.current = target;
//     }, 0);
//     setTasks((prevState) => {
//       // prevent mutation
//       const state = { ...prevState };
//        console.log(state);
//       const fn = (name) => {
//         console.log(name);
//         groupName.current = name;
//         state.dragged = state[name].find((i) => i._id.toString() === id);
//       };

//       switch (parentElementId) {
//         case "todo_menu":
//           fn("menu");
//           return state;
//         case "todo_div":
//           fn("todo");
//           return state;
//         case "inProgress_div":
//           fn("inProgress");
//           return state;
//         case "done_div":
//           fn("done");
//           return state;
//         default:
//           return state;
//       }
//     });
//   };
//   const dragEnd = (event) => {
//     event.preventDefault();
//     draggableTodo.current.style.display = "block";
//     console.log(event.target.innerHTML);
//   };

//   const dragOver = (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     console.log(event.target.innerHTML);
//   };

//   // const dragEnter = (event) => {};

//   const dragLeave = (event) => {
//     // event.target.style.border = "none";
//   };

//   const dragDrop = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const { currentTarget } = event;
//     const id = currentTarget.id;
//     setTasks((prevState) => {
//       // This is to not mutate state object
//       const state = { ...prevState };
//       const fn = (name) => {
//         const { current } = groupName;
//         const dragged = state.dragged;
//         const previousParentId = draggableTodo.current.parentElement.id;
//         if (previousParentId !== id) {
//           state[current] = state[current].filter((i) => i._id !== dragged._id);
//           state[name] = [...state[name], dragged];
//         } else {
//           draggableTodo.current.style.display = "block";
//         }
//       };

//       switch (id) {
//         case "todo_menu":
//           fn("menu");
//           return state;
//         case "todo_div":
//           fn("todo");
//           return state;
//         case "inProgress_div":
//           fn("inProgress");
//           return state;
//         case "done_div":
//           fn("done");
//           return state;
//         default:
//           return state;
//       }
//     });
//   };

    // const dragItem = useRef();
    // const dragOverItem = useRef();
    // const [isDragging, setIsDragging] = useState(false);
    // const [position, setPosition] = useState([0, 0]);
    const [formData, setFormData] = useState({ SelectColumn: '' })
    const [field, setField] = useState({
        id: '',
        name: "",
        select: false,
        validations: {
            width: ''
        }
    })

    const [fwidth, setfwidth] = useState('')
    const [user, setUser] = useState({ names: '', width: '' })


    // const stateRef = useRef(null);
    // Update the ref's value whenever the position/isDragging
    // state changes.
    // useEffect(() => {
    //     dragItem.current = { position, isDragging };
    // }, [position, isDragging]);
  

    // useEffect(() => {
    //     function handleMouseMove(event) {
    //       // Now we read the dragging/position state from the
    //       // ref, which should always hold the latest state
    //       const { isDragging, position } = dragItem.current;
    //       if (isDragging) {
    //         const newX = position[0] + event.movementX;
    //         const newY = position[1] + event.movementY;
    //         setPosition([newX, newY]);
    //       }
    //     }
    //     window.addEventListener("mousemove", handleMouseMove);
    
    //     function handleMouseUp() {
    //       setIsDragging(false);
    //     }
    //     window.addEventListener("mouseup", handleMouseUp);
    
    //     return () => {
    //       window.removeEventListener("mousemove", handleMouseMove);
    //       window.removeEventListener("mouseup", handleMouseUp);
    //     };
    //   }, []);

    // const dragStart = (e, position) => {
    //     dragItem.current = position;
    //     console.log(e.target.innerHTML);
    //   };
     
    //   const dragEnter = (e, position) => {
    //     dragOverItem.current = position;
    //     console.log(e.target.innerHTML);
    //   };

    //   const drop = (e) => {
    //     const copyListItems = [...list];
    //     const dragItemContent = copyListItems[dragItem.current];
    //     copyListItems.splice(dragItem.current, 1);
    //     copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    //     dragItem.current = null;
    //     dragOverItem.current = null;
    //     setList(copyListItems);
    //   };
     

    const handleClick = (e, i, s) => {
        e.preventDefault();
        setField(
            {
                id: Number(i),
                name: s,
                select: true,
                validations: {
                    width: fwidth
                }
            }
        )

    }

    const handleChange = (e) => {
        console.log(e);
        setFormData({ ...formData, SelectColumn: e })

    }
    console.log(formData);
    const handleChang = (event, i) => {
        console.log(event.target.value, event.target.name, i);
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        setMainData(user)
    }
    const menu = (
        <Menu  >
            {items.map((i) =>
                <Menu.Item key={i.key}>{i.label}</Menu.Item>
            )}
        </Menu>
    );

    let i;
    let s;
    console.log(tasks);

    const dragStarted = (e, i, id) => {
        console.log("Drag has started,", id);
        // setTasks((prevState) => {
                //   prevent mutation
                //   const state = { ...prevState };
                //   const parentElementId = target.parentElement.id;
                //    console.log(state);
                //   const fn = (name) => {
                    // console.log(name);
                    // groupName.current = name;
                  const stadragged = tasks.inProgress.find((i) => i._id === id);
                  console.log(stadragged);
                //   };

                //   switch (parentElementId) {
                        //     case "todo_menu":
                        //       fn("menu");
                        //       return state;
                        //     case "todo_div":
                        //       fn("todo");
                        //       return state;
                        //     case "inProgress_div":
                        //       fn("inProgress");
                        //       return state;
                        //     case "done_div":
                        //       fn("done");
                        //       return state;
                        //     default:
                        //       return state;
                        //   }
        // })

    }

    const draggingOver = (e) => {
        console.log("Drag over");
    }

    const dragDropped = (e) => {
        console.log("You have dropped");
    }
    return (
        <div>
            <div className="flex-container">
                <div className='left-screen flex-grow: 8' >
                    {tasks.inProgress.map((i) =>
                        // <div key={i.id} className="lfft-side"  
                        // // onDragStart={(e) => dragStart(e, i.id)}
                        // // key={i.id}
                        // // draggable
                        // draggable={true}
                        // onDragStart={dragStart}
                        // onDragEnd={dragEnd}
                        // id={i.id}
                        // >
                        <div
                  key={i._id}
                  className="lfft-side"
                  draggable 
                  onDragStart={(e) => dragStarted(e,i,i._id)}
               
                >
                  {/* {inprogress.name}
                </div> */}
                            {i.type === "Button" ? <Button type="text" onClick={(e) => handleClick(e, i = "1", s = "Text")}><span className='title-text'>{i.name}</span></Button> :
                                <Dropdown overlay={menu} trigger={["click"]}>
                                    <a
                                        className="ant-dropdown-link dropdown-menu"
                                        onClick={(e) => e.preventDefault()}
                                        style={{ color: "#000000" }}
                                    >
                                        {i.name}<DownOutlined />
                                    </a>
                                </Dropdown>}
                        </div>
                    )}
                </div>

                <div className='right-screen flex-grow: 4'>
                    <div><Button type="text" onClick={(e) => handleClick(e,)}><span className='title-text'>layout</span></Button></div>
                    <div className='last-dropdown'>
                        <Select
                            className='layout-select'
                            defaultValue={{ value: "1-Column", label:  "1-Column" }}
                            bordered={false}
                            options={LayoutDrop}
                            // value={formData.SelectColumn}
                            onChange={(event) => handleChange(event)}
                        />


                    </div>
                </div>
            </div>
            <div className='editor-part'>
  
                {formData.SelectColumn === "2-Column" ?
                    
                    <div className='screen-two'>
                        <div className='column-one flex-grow: 6'>

                        </div>
                        <div className='column-two flex-grow: 6'>

                        </div>        
                    </div> : 
                    <div className='screen-one'>
                        {/* {Menus.map((i) =>
                   
                    // onDragStart={(e) => dragStart(e, i.id)}
        onDragEnter={(e) => dragEnter(e)}
        onDragEnd={drop}
        // key={i.id}
        draggable
        style={{
            position: "absolute",
            left: position[0],
            top: position[1]
          }}
          onMouseDown={() => setIsDragging(true)} */}
               <div
        //   onDragOver={(e) => draggingOver(e)}
            onDrop={(e) => dragDropped(e)}
                    >
                        Ihbsdfj
                           {/* {isDragging ? "I am dragging." : "I am not dragging."} */}

                           {/* {tasks.todo?.map((todo) => {
              return (
                <div
                  key={todo._id}
                  className="tasks-bd_content"
                  draggable={true}
                  onDragStart={dragStart}
                  onDragEnd={dragEnd}
                  id={todo._id}
                >
                  {todo.name}
                </div>
              );
            })}
          </div> */}
          {/* <div
            id="inProgress_div"
            className="tasks-body_child "
            onDragOver={dragOver}
            onDropCapture={dragDrop}
          >
            <div className="tasks-bd_title">
              <h3>In Progress</h3>
              <div className="tasks-child_status">1</div>
            </div> */}
            {/* {tasks.inProgress?.map((inprogress) => {
              return (
                <div
                  key={inprogress._id}
                  className="tasks-bd_content"
                  draggable={true}
                  onDragStart={dragStart}
                  onDragEnd={dragEnd}
                  id={inprogress._id}
                >
                  {inprogress.name}
                </div>
              );
            })} */}
          {/* </div> */}
          {/* <div
            id="done_div"
            className="tasks-body_child"
            onDragOver={dragOver}
            onDropCapture={dragDrop}
          >
            <div className="tasks-bd_title"> */}
              {/* <h3>Done</h3> */}
              {/* <div className="tasks-child_status">5</div> */}
            {/* </div>
            {tasks.done?.map((done) => {
              return (
                <div
                  key={done._id}
                  className="tasks-bd_content"
                  draggable={true}
                  onDragStart={dragStart}
                  onDragEnd={dragEnd}
                  id={done._id}
                >
                  {done.name}
                </div>
              );
            })}
                          </div> */}
                         {/* ) } */}
                         </div>
                    </div>
                    
                }
            </div>
           
        </div>
    )
}

export default editorTemplate
