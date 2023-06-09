import {
	ExclamationCircleOutlined
} from '@ant-design/icons';
import { Avatar, Button, Input, Modal, Row, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	showNotification
} from '../../../../duck/actions/commonActions';
import {
	workflowTemplateData
} from '../../../../services/pbrService';
import './styles.scss';
const { TextArea } = Input;
/* istanbul ignore next */
const App = (props) => {
	const dispatch = useDispatch();
	let { isModalOpen, setIsModalOpen, params, pageNumber, templateVersion } = props
	const [value, setValue] = useState('');
	const [tableData, setTableData] = useState([]);
	const [tableLoader, setTableLoader] = useState(false);

	useEffect(() => {
		if (isModalOpen) {
			getTableData()
		}
	}, [isModalOpen])

	const getTableData = async () => {
		try {
			setTableLoader(true)
			let req = {
				template_id: params.temp_disp_id,
				template_version: templateVersion,
			}
			let res = await workflowTemplateData(req)
			if (res["status-code"] == 200) {
				setTableData(res.Data)
				setTableLoader(false)
			} else {
				setTableLoader(false)
				dispatch(showNotification('error', res?.Message));
			}
		} catch (err) {
			console.log(err)
		}
	}
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const getRandomColor = index => {
		let colors = ['#56483F', '#728C69', '#c04000', '#c19578'];
		return colors[index % 4];
	};

	const columns = [
		{
			title: 'Page No.',
			dataIndex: 'Page No.',
			key: 'Page No.',
			width: '13%'
		},
		{
			title: 'Username',
			dataIndex: 'Username',
			key: 'Username',
			render: (text, row, index) => (
				<div>
					<Avatar
						className='avatar-icon'
						style={{ backgroundColor: getRandomColor(index + 1) }}>
						{text?.split('')[0]?.toUpperCase()}{' '}
					</Avatar>
					<span className='avatar-text' style={{ marginLeft: 2 }}>{text.split('@')[0]}</span>
				</div>
			)
		},

		{
			title: 'Status',
			dataIndex: 'Status',
			key: 'Status',
			render: (text, row, index) => (
				<div className="treenode-block-batch">
					<div className="tree-block-param-batch">
						<Tag color={text == 'RJCT' ? 'red' : 'lime'}>
							{text == 'RJCT' ? 'Rejected' : 'Approved'}
						</Tag>

					</div>
				</div>
			)
		},
		{
			title: 'Comments',
			dataIndex: 'Comments',
			key: 'Comments',

		},
	];
	return (
		<>
			<Modal centered={true} className='rejectModal' width={750} title={null} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
				<Row style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
					<div style={{ display: "flex" }}>
						<ExclamationCircleOutlined style={{ fontSize: 24, color: "orange" }} />
						<p style={{ marginLeft: 10, fontSize: 14 }}>Preview</p>
					</div>

					<div>
						<Button className='custom-primary-btn'
							style={{ marginRight: 10 }}
							onClick={() => {
								handleOk()
							}}
						>Go back</Button>
						<Button className='custom-secondary-btn'
							onClick={() => {
								handleCancel()
							}}
						>Submit</Button>
					</div>
				</Row>
				<Row style={{ marginTop: 30 }}>
					<Table loading={tableLoader} columns={columns}
						dataSource={tableData} pagination={false}
						scroll={{ y: 800 }}
					/>
				</Row >
			</Modal>
		</>
	);
};
export default App;