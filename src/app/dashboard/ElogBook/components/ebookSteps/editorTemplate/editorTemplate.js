import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Select, Tabs, Steps } from 'antd';
import React, { useState } from 'react';
import rightarrow from '../../../../../../assets/editornew/rightarrow.png';
import "../editorTemplate/editorTemplate.scss";
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Step } = Steps;

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


const TabsData1 = [
	{
		key: "1",
		title: "Text",

	},
	{
		key: "2",
		title: "Rule",

	},
	{
		key: "3",
		title: "Validation"
	}
]


function editorTemplate() {
	const [collapsed, setCollapsed] = useState(false)
	const [dragData, setDragData] = useState([]);
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
		setFormData({ ...formData, SelectColumn: e })
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

	const dragStarted = (e, i, id) => {
		const stadragged = tasks.inProgress.find((i) => i._id === id);
		setDragData(stadragged);
	}

	const draggingOver = (e) => {
	}

	const dragDropped = (e) => {
	}
	return (
		<div className='main-editortemp'>
			<div className="metadata-subheader ">
				<div className="title-layout">
					<p>Design form</p>
				</div>
				<div className="stepper-layout">
					<Steps
						size="small"
						current={0}
					>
						<Step key={0} title="Design form" />
						<Step key={1} title="Script editor" />

					</Steps>
				</div>
				<div className="button-layout">
					<Button
						className={"custom-secondary-btn"}
						type="primary"
						onClick={(e) => handleNext(e)}
						disabled
					>
						Save form
					</Button>
					<Button
						className={"pbbutton custom-secondary-btn"}
						type="primary"
						onClick={(e) => handleNext(e)}
						disabled
					>
						Publish form
					</Button>
				</div>

			</div>
			<Layout>
				<Layout>
					<div className="flex-container">
						<div className='left-screen flex-grow: 8' >
							{tasks.inProgress.map((i) =>

								<div
									key={i._id}
									className="lfft-side"
									draggable
									onDragStart={(e) => dragStarted(e, i, i._id)}

								>
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

						{/* <div className='right-screen flex-grow: 4'>
							<div><Button type="text" onClick={(e) => handleClick(e,)}><span className='title-text'>layout</span></Button></div>
							<div className='last-dropdown'>
								<Select
									className='layout-select'
									defaultValue={{ value: "1-Column", label: "1-Column" }}
									bordered={false}
									options={LayoutDrop}
									onChange={(event) => handleChange(event)}
								/>


							</div>
						</div> */}
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
								<div
									onDragOver={(e) => draggingOver(e)}
									onDrop={(e) => dragDropped(e)}
								>

								</div>
							</div>

						}
					</div>
				</Layout>
				<Sider
					trigger={null}
					collapsible
					collapsedWidth={12}
					collapsed={collapsed}
					theme={'light'}
					width="294"
					className="slider-layout"
				>
					<div className='flex-container slide-total'>
						<div className='slider-button flex-grow: 4' onClick={() => setCollapsed(!collapsed)}>
							<img src={rightarrow} alt="upload" className='imgstyle' />
						</div>
						<div className='slider-main flex-grow: 8'>
							<div className='slider-header'> <p className='slider-text'> Control panel</p></div>
							<div className='tab-main'>
							</div>
						</div>
					</div>

				</Sider>
			</Layout>
		</div>
	)
}

export default editorTemplate
