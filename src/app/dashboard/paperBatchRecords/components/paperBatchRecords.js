/**
 * @author Ranjith <ranjith.k@mareana.com>
 * @Mareana - BMS PBR
 * @version 1
 * @Last Modified - 05 MAy, 2022
 * @Last Changed By - @ranjith
 */

import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
	ArrowLeftOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import {
	hideLoader,
	showLoader,
	showNotification,
} from '../../../../duck/actions/commonActions';
import {
	Card,
	Col,
	Row,
	Input,
	Divider,
	Table,
	Modal,
	Button,
	Form,
	Space,
	Radio,
	notification,
	Avatar,
	Select
} from 'antd';
import { useDispatch } from 'react-redux';
import Highlighter from 'react-highlight-words';
import illustrations from '../../../../assets/images/banner-pbr.svg';
import newTemplateModal from '../../../../assets/images/newTemplateModal.svg';
import pdfIcon from '../../../../assets/images/pdfIcon.svg';
import { getPbrTemplateData, getDataView } from '../../../../services/pbrService';
import { tableColumns } from '../../../../utils/TableColumns'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { loadTemplateInfo, loadMatBatchInfo, loadPageIdentifier, loadTempAdditionalData } from '../../../../duck/actions/pbrAction';
import StatusBlock from '../../../../components/StatusBlock/statusBlock'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper'
import ScreenHeader from '../../../../components/ScreenHeader/screenHeader'
const { Search } = Input;

function PaperBatchRecords() {
	let history = useHistory();
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const initialTableDataSource = [
		{
			key: '1',
			name: 'Template001',
			id: 'ID00001',
			creator: 'Nelson',
			createdOn: '30 March 2022',
		},
		{
			key: '2',
			name: 'Template002',
			id: 'ID00002',
			creator: 'Derek',
			createdOn: '1 November 2021',
		},
		{
			key: '3',
			name: 'Template003',
			id: 'ID00003',
			creator: 'Nelson',
			createdOn: '1 March 2021',
		},
		{
			key: '4',
			name: 'Template004',
			id: 'ID00004',
			creator: 'Derek',
			createdOn: '1 November 2021',
		},
		{
			key: '5',
			name: 'Template005',
			id: 'ID00005',
			creator: 'Derek',
			createdOn: '1 March 2021',
		},
	];

	const [resultDate, setResultDate] = useState('');
	const [newTemplateModalVisible, setNewTemplateModalVisible] =
		useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const [tableDataSource, setTableDataSource] = useState([]);
	const [tableDataSourceFiltered, setTableDataSourceFiltered] =
		useState(null);
	const [form] = Form.useForm();
	const [templateData, setTemplateData] = useState([])
	const [loadTiles, setLoadTiles] = useState([])
	const [templateColumns, setTemplateColumns] = useState([])
	const [dataView, setDataView] = useState([])
	const [fileName, setFileName] = useState("")
	const [templateName, seTemplateName] = useState("")
	const [searchedLanding, setSearchedLanding] = useState(false);
	const [filterTableLanding, setFilterTableLanding] = useState(null);
	const [materialDropown, setMaterialDropown] = useState([]);
	const [matBatch, setMatBatch] = useState({
		material_num: "",
		batch: ""
	})

	useEffect(() => {
		let login_response = JSON.parse(localStorage.getItem('login_details'));
		if (login_response) {
			updateDate();
			getTemplateData();
			getViewData();
			setTableDataSource(initialTableDataSource);
		}
	}, []);

	const getTemplateData = async () => {
		let req = { limit: 8 }
		try {
			dispatch(showLoader());
			const tableResponse = await getPbrTemplateData();
			const tilesData = await getPbrTemplateData(req);
			const tableColumn = tableColumns(tableResponse?.Data)
			let newArray1 = tableColumn.filter(item => item.dataIndex != 'changed_by' && item.dataIndex != 'changed_on' && item.dataIndex != 'cust_key' && item.dataIndex != 'pbr_template_info')
			let columns = [];
			newArray1.map(item => {
				let { title, dataIndex } = item;
				let obj = {
					title: title,
					dataIndex: dataIndex,
					key: dataIndex,
				};
				if (item.dataIndex === "created_on") {
					obj.render = (text, row, index) => {
						let date1 = new Date(text)
						return (
							<div>{date1.toISOString().substring(0, 20)}</div>
						)

					}
				}
				if (item.dataIndex === "created_by") {
					obj.render = (text, row, index) => {
						return (
							<div>
								<Avatar
									className='avatar-icon'
									style={{ backgroundColor: getRandomColor(index + 1) }}>
									{text?.split('')[0]?.toUpperCase()}{' '}
								</Avatar>
								<span className='avatar-text' style={{ marginLeft: 10 }}>{text.split('@')[0]}</span>
							</div>
						)

					}
				}
				columns.push(obj)
			})

			if (tableResponse['status-code'] === 200) {
				setTemplateColumns(columns)
				setTemplateData(tableResponse.Data);
				setLoadTiles(tilesData.Data)
				dispatch(hideLoader());
			}
			else if (tableResponse['status-code'] === 404) {/* istanbul ignore next */
				setTemplateData(tableResponse.Data);
				setLoadTiles(tilesData.Data)
				dispatch(hideLoader());
				dispatch(showNotification('error', tableResponse.Message));
			}
		}
		catch (error) {/* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', error.Message));
		}
	}

	const getRandomColor = index => {
		let colors = ['#56483F', '#728C69', '#c04000', '#c19578'];
		return colors[index % 4];
	};

	const getImageData = async (val) => {
		let req = {
			actionType: "get_all",
			productNum: val
		}
		let res = await getDataView(req)
		setDataView(res.Data)
		setFileName(res?.Data[0]?.actual_filename)
		setMatBatch({
			material_num: res?.Data[0]?.product_num,
			batch: res?.Data[0].batch_num,
			site: res?.Data[0].site_code
		})
	}

	const getViewData = async () => {
		let req = {
			actionType: "get_product_num",
			productNum: ""
		}
		let res = await getDataView(req)
		setMaterialDropown(res.Data)
		getImageData(res.Data[0]?.label)
		

	}

	const updateDate = () => {
		const date = new Date();
		const month = date.toLocaleString('default', { month: 'long' });
		const latestDate = date.getDate();
		const year = date.getFullYear();
		const resultDate = month + ' ' + latestDate + ',' + ' ' + year;
		setResultDate(resultDate);
	};

	const newTemplateModalHandler = () => {
		setNewTemplateModalVisible(true);
		dispatch(loadTemplateInfo([]))
	};

	const handleCancel = () => {
		setNewTemplateModalVisible(false);
	};

	const handleTemplateSubmit = () => {
		if (templateName == "" || templateName == undefined || materialDropown.length == 0) {
			openNotification()
		} else {
			history.push(`${match.url}/Untitled?file=${fileName}&tempalteName=${templateName}&fromScreen=Workspace`);
			dispatch(loadMatBatchInfo(matBatch))
		}

	};

	const handleValuesChange = (changedValues, values) => {
		seTemplateName(values?.templateName)
	};
	 /* istanbul ignore next */
	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const close = () => {
		console.log(
			'Notification was closed. Either the close button was clicked or duration time elapsed.',
		);
	};
	const openNotification = () => {
		const key = `open${Date.now()}`;
		let val = ""
		if (templateName == "" || templateName == undefined ) {
			val = "Template Name"
		}else if(materialDropown.length ==0){
			val = "Material Number"
		}
		const btn = (
			<Button type="primary" size="small" onClick={() => notification.close(key)}>
				Confirm
			</Button>
		);
		
		notification.open({
			message: 'Error',
			description:
				`Please Enter ${val} `,
			btn,
			key,
			type: "error",
			placement: "top",
			onClose: close,
		});
	};
	 /* istanbul ignore next */
	const onRadioChange = (val) => {
		let arr = dataView.filter(item => item.actual_filename === val)
		setMatBatch({
			material_num: arr[0]?.product_num,
			batch: arr[0]?.batch_num,
			site: arr[0]?.site_code
		})
	}

	const handleClickTiles = (value) => {
		let obj =
		{
			material_num: value?.product_num,
			batch: value?.batch_num,
			site: value?.site_code

		}
		let obj2 = {
			pbrDisplayId: value?.pbr_template_disp_id,
			pbrTempId: value.pbr_temp_int_id,
			pbrTemplateStatus: value.pbr_template_status,
			pbrVersion: value?.pbr_template_version
		}
		dispatch(loadPageIdentifier(value?.pbr_template_info?.pbrPageIdentifier))
		dispatch(loadMatBatchInfo(obj))
		dispatch(loadTempAdditionalData(obj2))
		dispatch(loadTemplateInfo(value?.pbr_template_info?.pbrTemplateInfo))
		history.push(`${match.url}/${value.pbr_template_disp_id}?file=${value?.pbr_template_info?.filename}&temp_disp_id=${value.pbr_template_disp_id}&tempalteName=${value.pbr_template_name}&fromScreen=Workspace&version=${value.pbr_template_version}`)


	}
	const landingSearch = value => {

		if(value == ""){
			setSearchedLanding(false);
		}else{
			setSearchedLanding(true);
			const tableData = templateData;
			const filterTable = tableData.filter(o =>
				Object.keys(o).some(k =>
					String(o[k]).toLowerCase().includes(value.toLowerCase())
				)
			);
			setFilterTableLanding(filterTable);
		}
		
	};

	const handleMaterialChange = (val) =>{
		getImageData(val)
	}

	return (
		<div className='pbr-container'>
			<div className='custom-wrapper pbr-wrapper'>

				<BreadCrumbWrapper />
			</div>
			<Row className='p-28'>
				<Col span={24} className='banner'>
					<ScreenHeader
						bannerbg={{
							background:
								'linear-gradient(180deg, rgba(199, 144, 129, 0.15) 0%, rgba(223, 165, 121, 0.56) 100%)',
						}}
						title={`Howdy ${localStorage.getItem('username')},`}
						description='In the mood to draw up some template today?'
						source={illustrations}
						sourceClass='pbr-image'
					/>
				</Col>
			</Row>
			<Row className='landing-content p-28'>
				<Col span={24}>
					<Card bordered={false}>
						<Row>
							<Col span={4} />
							<Col span={16} className='p36'>
								<Search
									className='dashboard-search'
									placeholder='Search by template ID, name, creator or date of creation'
									allowClear
									enterButton='Search'
									size='large'
									onSearch={landingSearch}
								/>
								{searchedLanding ? (
									<Table
										className='landing-table'
										columns={templateColumns}
										dataSource={filterTableLanding === null
											? templateData
											: filterTableLanding}
										scroll={{ x: 2000, y: 650 }}
										onRow={(record, rowIndex) => {
											return {
												onClick: event => {
													handleClickTiles(record)

												},

											}
										}}
									/>
								) : (
									<></>
								)}
							</Col>
							<Col span={4} />
						</Row>
						<Row>
							<Col span={4} />
							<Col span={16} className='p36'>
								<div
									className='create-new'
									onClick={newTemplateModalHandler}
								>
									<PlusOutlined />
									<p>Create new template</p>
								</div>
							</Col>
							<Col span={4} />
						</Row>
						<Row className='recent-charts'>
							<Col span={4} />
							<Col span={16} className='p36'>
								<Row gutter={16} className="title">
									<Col span={8}>
										<h3 style={{fontSize:14}}>Recently created templates</h3>
									</Col>
									<Col span={14} className="title-legends">
										<dl>
											<dt className="grey"></dt>
											<dd>Draft</dd>
											<dt className="yellow"></dt>
											<dd>Awaiting Approval</dd>
											<dt className="green"></dt>
											<dd>Approved</dd>
											<dt className="reject"></dt>
											<dd>Reject</dd>
										</dl>
									</Col>
								</Row>

								<Divider />
								<Row gutter={24}>
									{loadTiles &&
										loadTiles.length > 0 &&
										loadTiles.map((el, index) => {
											return (
												<Col
													className='gutter-row'
													span={6}
													style={{ marginTop: '10px' }}
													key={index}>
													<StatusBlock id={`${el.pbr_template_disp_id}-V${el.pbr_template_version}`} name={el.pbr_template_name} status={el.pbr_template_status} handleClickTiles={() => handleClickTiles(el)} />
												</Col>
											);
										})}
								</Row>
							</Col>
							<Col span={4} />
						</Row>
					</Card>
				</Col>
			</Row>

			<Modal
				className='newTemplateModal'
				title='Create new template'
				centered
				visible={newTemplateModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button
						key='submit'
						type='primary'
						className='templateSubmitBtn'
						onClick={handleTemplateSubmit}
					// onValuesChange={handleValuesChange}
					>
						Lets Go!
					</Button>,
				]}
				width={750}

			>
				<div className='newTemplate-modalBody'>
					<Row className='recent-charts'>
						<Col span={12} className='newTemplate-imgBlock'>
							<img src={newTemplateModal} alt='banner' style={{ height: 218 }} />
						</Col>
						<Col span={12} className='newTemplate-contentBlock'>
							<Row>
								<Form
									layout='vertical'
									className='formNewTemplate'
									name="basic"
									onValuesChange={handleValuesChange}
									onFinish={onFinish}
									initialValues={{ materialNumber: materialDropown[0]?.label }}
								>
									<div className='formNewTemplateDiv'>
										<Form.Item
											label='Template name'
											name='templateName'
											rules={[
												{
													required: true,
													message: 'Please enter template name',
												},
											]}

										>
											<Input />
										</Form.Item>
										<Form.Item label='Status' name='status'>
											<Input placeholder='Draft' disabled />
										</Form.Item>
										<Form.Item
											label='Material number'
											name='materialNumber'
											rules={[
												{
													required: true,
													message: 'Please select material',
												},
											]}
										>
											{/* <Input value={matBatch?.material_num} disabled /> */}
											<Select options={materialDropown} onChange={(val)=>handleMaterialChange(val)}>

											</Select>
										</Form.Item>
										<Form.Item
											label='Batch number'
											// name='batchNumber'
										>
											<Input value={matBatch?.batch} disabled />
										</Form.Item>
									</div>
								</Form>
							</Row>
							<Row>
								<Radio.Group
									value={fileName}
									className='radioPdfBlock'
									onChange={(e) => {
										setFileName(e.target.value)
										onRadioChange(e.target.value)
									}}
								>
									{dataView.map((item, index) => (
										<Radio.Button value={`${item.actual_filename}`} >
											<div className='pdfListBlock'>
												<img src={pdfIcon} alt='pdfIcon' />
												<span>{item?.actual_filename}</span>
											</div>
										</Radio.Button>
									))}
								</Radio.Group>
							</Row>
						</Col>
					</Row>
				</div>
			</Modal>
		</div>
	);
}

export default PaperBatchRecords;
