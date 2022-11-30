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
	PlusOutlined
} from '@ant-design/icons';
import {
	Avatar, Button, Card,
	Col, Divider, Form, Input, Modal, notification, Radio, Row, Select, Table
} from 'antd';
import debounce from "lodash/debounce";
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import illustrations from '../../../../assets/images/banner-pbr.svg';
import newTemplateModal from '../../../../assets/images/newTemplateModal.svg';
import pdfIcon from '../../../../assets/images/pdfIcon.svg';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import ScreenHeader from '../../../../components/ScreenHeader/screenHeader';
import SelectSearchField from '../../../../components/SelectSearchField/SelectSearchField';
import StatusBlock from '../../../../components/StatusBlock/statusBlock';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import { loadMatBatchInfo, loadPageIdentifier, loadTempAdditionalData, loadTemplateInfo } from '../../../../duck/actions/pbrAction';
import { getDataView, getPbrTemplateData, projectDataView } from '../../../../services/pbrService';
import { tableColumns } from '../../../../utils/TableColumns';
const { Search } = Input;
/* istanbul ignore next */
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
	const [projectFileName, setProjectFileName] = useState("")
	const [templateName, setTemplateName] = useState("")
	const [searchedLanding, setSearchedLanding] = useState(false);
	const [filterTableLanding, setFilterTableLanding] = useState(null);
	const [materialDropown, setMaterialDropown] = useState([]);
	const [fileSelection, setFileSelection] = useState([{ label: "Genealogy", value: "genology" }, { label: "Other Files", value: "others" }]);
	const [fileSelectionValue, setFileSelectionValue] = useState("genology");
	const [projectFileList, setProjectFileList] = useState([])
	const [selectParam, setselectParam] = useState({
		project: '',
		group: '',
		subGroup: '',
	});
	const [paramList, setParamList] = useState({
		projectList: [],
		groupList: [],
		subGroupList: [],
	});
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
			getProjectFilterData()
		}
	}, []);

	const getProjectFilterData = async (
		projectValue,
		groupValue,
		subGroupValue,
		projectText,
		groupText,
		subGroupText
	) => {
		dispatch(showLoader());
		let req = {
			group: groupValue ? groupValue : "",
			group_text: groupText ? groupText : "",
			project: projectValue ? projectValue : "",
			project_text: projectText ? projectText : "",
			subgroup: subGroupValue ? subGroupValue : "",
			subgroup_text: subGroupText ? subGroupText : ""
		}
		try {
			const res = await projectDataView(req)
			if (res["status-code"] == 200) {
				setParamList(prevState => {
					return {
						...prevState,
						projectList: res && res.project,
						groupList: res && res.group,
						subGroupList: res && res.subgroup
					};
				});
				setProjectFileList(res.file)
				setProjectFileName(res.file[0])
				dispatch(hideLoader());
			}
			/* istanbul ignore next */
			else if (res["status-code"] != 200) {
				dispatch(showNotification('error', res?.Message));
				dispatch(hideLoader());
			} else {
				dispatch(showNotification('error', "Unable to fetch data"));
				dispatch(hideLoader());
			}
		} catch (err) {
			dispatch(showNotification('error', err));
			dispatch(hideLoader());
		}

	}

	const optionProject = paramList['projectList'].map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));
	const optionsGroup = paramList['groupList'].map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));
	const optionsSubGroup = paramList['subGroupList'].map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));

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
		setTemplateName("")
		setFileSelectionValue("genology")
	};

	const handleTemplateSubmit = () => {
		if (fileSelectionValue == "genology") {
			if (templateName == "" || templateName == undefined || materialDropown.length == 0) {
				openNotification()
			} else {
				history.push(`${match.url}/Untitled?file=${fileName}&tempalteName=${templateName}&fromScreen=Workspace`);
				dispatch(loadMatBatchInfo(matBatch))
			}
		} else {
			if (templateName == "" || templateName == undefined || selectParam['project'] == "") {
				openNotification()
			}
			else {
				history.push(`${match.url}/Untitled?file=${fileName}&tempalteName=${templateName}&fromScreen=Workspace`);
				dispatch(loadMatBatchInfo(matBatch))
			}
		}


	};

	const handleValuesChange = (changedValues, values) => {
		setTemplateName(values?.templateName)
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
		if (templateName == "" || templateName == undefined) {
			val = "Template Name"
		} else if (materialDropown.length == 0) {
			val = "Material Number"
		} else if (selectParam['project'] == "") {
			val = "Project"
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

		if (value == "") {
			setSearchedLanding(false);
		} else {
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

	const handleMaterialChange = (val) => {
		getImageData(val)
	}

	const onChangeParam = (value, field) => {
		if (value != null) {
			if (field === 'project') {
				getProjectFilterData(
					value,
					selectParam['group'],
					selectParam['subGroup'],
					'',
					'',
					''
				);
				setselectParam(prevState => {
					return { ...prevState, project: value };
				});
			} else if (field === 'group') {
				getProjectFilterData(
					selectParam['project'],
					value,
					selectParam['subGroup'],
					'',
					'',
					''
				);
				setselectParam(prevState => {
					return { ...prevState, group: value };
				});
			} else if (field === 'subGroup') {
				getProjectFilterData(
					selectParam['project'],
					selectParam['group'],
					value,
					'',
					'',
					''
				);
				setselectParam(prevState => {
					return { ...prevState, subGroup: value };
				});
			}
		}
	};

	const clearSearch = (e, field) => {
		/* istanbul ignore next */
		if (field === 'project') {
			setselectParam(prevState => {
				return { ...prevState, project: '', group: '', subGroup: '' };
			});
			getProjectFilterData(
				"",
				'',
				'',
				'',
				'',
				''
			);
		}/* istanbul ignore next */
		else if (field === 'group') {
			setselectParam(prevState => {
				return { ...prevState, group: '', subGroup: '' };
			});
			getProjectFilterData(
				selectParam['project'],
				"",
				'',
				'',
				'',
				''
			);
		}
		/* istanbul ignore next */
		else if (field === 'subGroup') {
			setselectParam(prevState => {
				return { ...prevState, subGroup: '' };
			});
			getProjectFilterData(
				selectParam['project'],
				selectParam['group'],
				"",
				'',
				'',
				''
			);
		}
	};

	const onSearchParam = debounce((type, field) => {
		if (type != null) {
			if (field === 'project') {
				getProjectFilterData(
					selectParam['project'],
					selectParam['group'],
					selectParam['subGroup'],
					type,
					'',
					''
				);
			} else if (field === 'group') {
				getProjectFilterData(
					selectParam['project'],
					selectParam['group'],
					selectParam['subGroup'],
					'',
					type,
					''
				);
			} else if (field === 'subGroup') {
				getProjectFilterData(
					selectParam['project'],
					selectParam['group'],
					selectParam['subGroup'],
					'',
					'',
					type
				);
			}
		}
	}, 500);

	const handleFileSource = (val) => {
		setFileSelectionValue(val)
		if (paramList['projectList'].length > 0) {
			setselectParam(prevState => {
				return { ...prevState, project: paramList['projectList'][0] };
			});
			getProjectFilterData(
				paramList['projectList'][0],
				"",
				"",
				'',
				'',
				""
			);
		}

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
										<h3 style={{ fontSize: 14 }}>Recently created templates</h3>
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
									initialValues={{ materialNumber: materialDropown[0]?.label, fileSelectionValue: "genology" }}
								>
									<div className='formNewTemplateDiv'>
										<Form.Item
											label='Template name'
											// name='templateName'
											rules={[
												{
													required: true,
													message: 'Please enter template name',
												},
											]}

										>
											<Input value={templateName} onChange={(val) => setTemplateName(val.target.value)} />
										</Form.Item>
										<Form.Item label='Select File Source' >
											<Select value={fileSelectionValue} options={fileSelection} onChange={(val) => handleFileSource(val)}>
											</Select>
										</Form.Item>
									</div>

									{fileSelectionValue == "genology" ?
										<div className='formNewTemplateDiv'>
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
												<Select options={materialDropown} onChange={(val) => handleMaterialChange(val)}>

												</Select>
											</Form.Item>
											<Form.Item
												label='Batch number'
											// name='batchNumber'
											>
												<Input value={matBatch?.batch} disabled />
											</Form.Item>
										</div> :
										<div>
											<Form.Item
											// label='Project'
											// name='project'
											// rules={[
											// 	{
											// 		required: true,
											// 		message: 'Please enter project',
											// 	},
											// ]}
											>
												{/* <Input value={matBatch?.material_num} disabled /> */}
												<SelectSearchField
													showSearch
													label='Project *'
													placeholder='Select Project'
													onChangeSelect={value => onChangeParam(value, 'project')}
													onSearchSelect={type => onSearchParam(type, 'project')}
													options={optionProject}
													handleClearSearch={e => clearSearch(e, 'project')}
													// error={isEmptyPlant ? 'Please select project' : null}
													selectedValue={selectParam['project'] ? selectParam['project'] : null}
												/>
											</Form.Item>
											<div className='formNewTemplateDiv' style={{ marginTop: -10 }}>
												<Form.Item
												// label='Group'
												// name='batchNumber'
												>
													<SelectSearchField
														disabled={selectParam['project'] ? false : true}

														showSearch
														label='Group'
														placeholder='Select Group'
														onChangeSelect={value => onChangeParam(value, 'group')}
														onSearchSelect={type => onSearchParam(type, 'group')}
														options={optionsGroup}
														handleClearSearch={e => clearSearch(e, 'group')}
														// error={isEmptyPlant ? 'Please select project' : null}
														selectedValue={selectParam['group'] ? selectParam['group'] : null}
													/>
												</Form.Item>
												<Form.Item
												// label='Sub-group'
												// name='batchNumber'
												>
													<SelectSearchField
														disabled={selectParam['group'] ? false : true}
														showSearch
														label='Sub-Group'
														placeholder='Select Sub-Group'
														onChangeSelect={value => onChangeParam(value, 'subGroup')}
														onSearchSelect={type => onSearchParam(type, 'subGroup')}
														options={optionsSubGroup}
														handleClearSearch={e => clearSearch(e, 'subGroup')}
														// error={isEmptyPlant ? 'Please select project' : null}
														selectedValue={selectParam['subGroup'] ? selectParam['subGroup'] : null}
													/>
												</Form.Item>
											</div>

										</div>}

								</Form>
							</Row>
							<Row>
								{fileSelectionValue == "genology" ? <Radio.Group
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
								</Radio.Group> :
									<Radio.Group
										value={projectFileName}
										className='radioPdfBlock'
										onChange={(e) => {
											setProjectFileName(e.target.value)
											// onRadioChange(e.target.value)
										}}
									>
										{projectFileList.map((item, index) => (
											<Radio.Button value={`${item}`} >
												<div className='pdfListBlock'>
													<img src={pdfIcon} alt='pdfIcon' />
													<span>{item}</span>
												</div>
											</Radio.Button>
										))}
									</Radio.Group>
								}
							</Row>
						</Col>
					</Row>
				</div>
			</Modal>
		</div>
	);
}

export default PaperBatchRecords;
