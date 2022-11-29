import React,{ useState } from 'react';
import BreadCrumbWrapper from "../../../../../../components/BreadCrumbWrapper";
import { Tabs,Button, Dropdown,Space,Typography,Menu, Input } from 'antd';
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

  const SelectEditor = [
    {
        id: 1,
        name: "Input",
        select: false,
        validations: {
            width:''
        }

    }
  ]

  const data = [
    {
        id: 1,
        name: "names",
        InputType : "InputBox",
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

//   const Menus = [
//     {
//         id:1,
//         title:"Text"
//     },
//     {
//         id:2,
//         title:"Chart"
//     },
//     {
//         id:3,
//         title:"Input field"
//     },
//     {
//         id:4,
//         title:"Table"
//     },
//     {
//         id:5,
//         title:"Line"
//     },
//     {
//         id:6,
//         title:"Radio buttons"
//     },
//     {
//         id:7,
//         title:"Checkboxes"
//     },
//   ]
function editorTemplate() {
      const [field, setField] = useState({id: '',
        name: "",
        select: false,
        validations: {
            width:''
        } })

        const [fwidth, setfwidth] = useState('')
        const [user, setUser] = useState({ names: '', width:''})

        
      const handleClick = (e,i,s) => {
        e.preventDefault();
       setField(
        {id: Number(i),
        name: s,
        select: true,
        validations: {
            width: fwidth
        } }
       )

      }
      const handleChang =(event,i) => {
        console.log(event.target.value,event.target.name,i);
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
    return (
        <div>
            <div className="custom-content-layouts">

                <div className="template-header">
                    <p>New template - [template_name_entered_by_user]</p>
                </div>
                <div className="flex-container">
                    <div >
                        <Button type="text" onClick={(e) => handleClick(e, i="1", s="Text")}>Text</Button>
                        {/* Text */}
                        </div>
                    <div>Chart</div>
                    <div>
                    <Dropdown overlay={menu} trigger={["click"]}>
    <a
      className="ant-dropdown-link"
      onClick={(e) => e.preventDefault()}
      style={{ color: "#000000" }}
    >
      Input field<DownOutlined />
    </a>
  </Dropdown>

                        
                        </div>
                    <div>table</div>
                    <div>Line</div>
                    <div>Radio buttons</div>
                    <div>Checkboxes</div>
                    <div className='right-layout'>layout</div>
                    <div>Dropdown</div>
                </div>
                <div className='editor-part'>
                    {field.id === '' ? '': 
                    <div>
                    { SelectEditor.map((i) => 
                    <div>
                    <div key={i.id}>
                        {i.id === 1 ? 
                        <EditorInput 
                        name={user.names}
        type="text"
        // defaultValue="data"
        placeholder={user.placeholder}
        id="id"
        // value="data"
        // onChange={props.onChangeInput}
        // disabled={props.disabled}
        // onClick={props.onChangeClick}
        width = {user.width}
        heigth= "30px"
        borderColor= "red"
         /> : ''}
                    </div>
                    <div className='rigth-control-panel' key={i.id}>
                    {i.id === 1 ? <div>
    {data.map((i) =>
    <div>
    <label>{i.Placeholder}</label>
<input
        name={i.name}
        type={i.Type}
        // defaultValue="data"
        placeholder={i.Placeholder}
        id="id"
        // value={}
        onChange={(e) => handleChang(e,i)}
        // onChange={props.onChangeInput}
        // disabled={props.disabled}
        // onClick={props.onChangeClick}
        // width = "100px"
        // heigth= "30px"
        // borderColor= "red"
        />
        </div>
        )}
</div> : '' }
                    </div>
                    </div>
                    )}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default editorTemplate
