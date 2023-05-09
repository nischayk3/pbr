import { CalendarOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Popconfirm, Row, Select, Table, Tooltip } from 'antd';
import * as _ from "lodash";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import SelectField from "../../../../components/SelectField/SelectField";
import { hideLoader, showLoader } from '../../../../duck/actions/commonActions';
import { deleteLimitsApi } from '../../../../services/limitConfig';
import './Limitconfig.scss';

const LimitInputs = ({ expandedMol, selectedMol, getMoleData, editable, totalViewList, viewList, paramData, siteList, parameterList, moleculeData, setMoleculeData }) => {

	const dispatch = useDispatch();
	const [tableColumns, setTableCOlumns] = useState();

	let limitList = [
		'control',
		'specification',
		'warning'
	]
	let classList = [
		'CPP',
		'CQA'
	]
	let columns = [
		{
			title: 'View ID',
			dataIndex: 'view_disp_id',
			key: 'view_disp_id',
			width: 120,
			fixed: 'left',
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <p style={{ margin: "0" }}>{data.view_disp_id}</p>;
						}
						return (
							<SelectField
								showSearch={true}
								name="view_disp_id"
								selectList={viewList}
								selectedValue={data.view_disp_id}
								onChangeSelect={(e) => handleChange(index, e, "", "view_disp_id")}
							/>
						);
					}
				}),
		},
		{
			title: 'View Version',
			dataIndex: 'view_version',
			key: 'view_version',
			width: 120,
			fixed: 'left',
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <p style={{ margin: "0" }}>{data.view_version}</p>;
						}
						return (
							<SelectField
								showSearch={true}
								name="view_version"
								selectList={data?.versionList}
								selectedValue={data.view_version}
								onChangeSelect={(e) => handleChange(index, e, "", "view_version")}
							/>
						);
					}
				}),
		},
		{
			title: 'Parameter',
			dataIndex: 'parameters',
			key: 'parameters',
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <p style={{ margin: "0" }}>{data.parameters}</p>;
						}
						return (
							<SelectField
								showSearch={true}
								name="parameters"
								selectList={data?.param_list}
								selectedValue={data.parameters}
								onChangeSelect={(e) => handleChange(index, e, "", "parameters")}
							/>
						);
					}
				}),
		},
		{
			title: 'Site',
			dataIndex: 'site',
			key: 'Site',
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <p style={{ margin: "0" }}>{data.site}</p>;
						}
						return (
							<SelectField
								showSearch={true}
								name="site"
								selectList={siteList}
								selectedValue={data.site}
								onChangeSelect={(e) => handleChange(index, e, "", "site")}
							/>
						);
					}
				}),
		},
		{
			title: (
				<Tooltip title={<span>Crirical Quality Attribute</span>}>
					<span>Crirical Quali...</span>
				</Tooltip>
			),
			dataIndex: 'parameter_class',
			key: 'parameter_class',
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return (
								data?.parameter_class?.map((paramClass) => {
									return (
										<p style={{ margin: "0" }}>{paramClass}</p>
									)
								})
							)
						}
						return (
							<Select
								mode="multiple"
								showSearch={true}
								allowClear
								style={{
									width: "100%",
								}}
								value={data.parameter_class || null}
								name="parameter_class"
								onChange={(e) => handleChange(index, e, "", "parameter_class")}
							>
								{classList &&
									classList.map((ele) => {
										return <Option key={ele}>{ele}</Option>;
									})}
							</Select>
						);
					}
				}),
		},
		{
			title: 'Limit Type',
			dataIndex: 'limit_type',
			key: 'limitType',
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <p style={{ margin: "0" }}>{data.limit_type}</p>;
						}
						return (
							<SelectField
								showSearch={true}
								name="limit_type"
								selectList={limitList}
								selectedValue={data.limit_type}
								onChangeSelect={(e) => handleChange(index, e, "", "limitType")}
							/>
						);
					}
				}),
		},
		{
			title: 'From',
			dataIndex: 'from_',
			key: 'from',

			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return (<>
								<p style={{ margin: "0" }}>{data.from_}</p>
							</>);
						}
						return (
							<Input
								name="from_"
								type='number'
								value={data.from_}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'To',
			dataIndex: 'to_',
			key: 'to',

			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <p style={{ margin: "0" }}>{data.to_}</p>;
						}
						return (
							<Input
								name="to_"
								type='number'
								value={data.to_}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		// added start date and end date as columns for validity.
		{
			title: 'Start Validity Date',
			dataIndex: 'start_valid_date',
			key: 'vod',

			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							/* istanbul ignore next */
							if (!data.start_valid_date) {
								return "";
							} else {
								return (
									<span>
										<CalendarOutlined style={{ color: '#6C63FF', display: "inline-block", marginRight: '10px' }} />
										<p style={{ margin: "0", display: "inline-block" }}>{moment(data.start_valid_date).format('YYYY-MM-DD')}</p>
									</span>
								);
							}
						}

						return (
							<DatePicker
								type="text"
								name="start_valid_date"
								defaultValue={
									data.start_valid_date ? moment(data.start_valid_date) : ""
								}
								onChange={(dateString) =>
									handleChange(index, "", dateString, "start_valid_date")
								}
							/>
						);
					}
				}),
		},
		{
			title: 'End Validity Date',
			dataIndex: 'end_valid_date',
			key: 'vod',

			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							/* istanbul ignore next */
							if (!data.end_valid_date) {
								return "";
							} else {
								return (
									<span>
										<CalendarOutlined style={{ color: '#6C63FF', display: "inline-block", marginRight: '10px' }} />
										<p style={{ margin: "0", display: "inline-block" }}>{moment(data.end_valid_date).format('YYYY-MM-DD')}</p>
									</span>
								);
							}
						}

						return (
							<DatePicker
								type="text"
								name="end_valid_date"
								defaultValue={
									data.end_valid_date ? moment(data.end_valid_date) : ""
								}
								onChange={(dateString) =>
									handleChange(index, "", dateString, "end_valid_date")
								}
							/>
						);
					}
				}),
		},
		{
			title: 'Document Name',
			dataIndex: 'document_name',
			key: 'document_name',
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <p style={{ margin: "0" }}>{data.document_name}</p>;
						}
						return (
							<Input
								name="document_name"
								type='text'
								value={data.document_name}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		},
		{
			title: 'Document URL',
			dataIndex: 'document_url',
			key: 'document_url',
			width: 120,
			render: (text, record) =>
				paramData.map((data, index) => {
					if (record.key === data.key) {
						if (!editable) {
							return <a href={`//${data.document_url}`} target="_blank" style={{ margin: "0" }}>{data.document_url}</a>;
						}
						return (
							<Input
								name="document_url"
								type='text'
								value={data.document_url}
								onChange={(e) => handleChange(index, e, "", "limits")}
							/>
						);
					}
				}),
		}
	];
	const text = "Are you sure to delete this?";
	/* istanbul ignore next */
	const handleChange = async (index, event, dateString, type) => {
		const rowsInput = [...paramData];
		if (dateString && (type === "end_valid_date" || type === "start_valid_date")) {	
			rowsInput[index][type] = dateString._d.toISOString();
		} else if (type === "limits") {
			const { name, value } = event.target;
			rowsInput[index][name] = value;
		} else if (type === 'limitType') {
			rowsInput[index]['limit_type'] = event;
		} else if (type === 'parameter_class') {
			rowsInput[index]['parameter_class'] = event;
		} else if (type === 'site') {
			rowsInput[index]['site'] = event;
		} else if (type === "parameters") {
			rowsInput[index]['parameters'] = event;
		} else if (type === 'view_disp_id') {
			rowsInput[index]['view_disp_id'] = event;
			rowsInput[index]['view_version'] = ''
			rowsInput[index]['parameters'] = '';
			let tempVersionList = [];
			totalViewList.current.forEach((view) => {
				if (view?.split('-')[0] === event) {
					const viewVersion = view?.split('-')[1]
					tempVersionList.push(viewVersion);
					tempVersionList = [...new Set(tempVersionList)]?.sort((a, b) => a - b)
				}
			});
			rowsInput[index]['versionList'] = tempVersionList
		} else if (type === 'view_version') {
			const tempParam = await getMoleData('parameter', selectedMol.current, `${rowsInput[index]['view_disp_id']}-${event}`)
			rowsInput[index]['param_list'] = tempParam;
			rowsInput[index]['view_version'] = event;
		}
		const tempMoleculeData = [...moleculeData];
		tempMoleculeData?.forEach((molecule) => {
			if (molecule?.key === expandedMol) {
				molecule.paramData = rowsInput
			}
		})
		setMoleculeData(tempMoleculeData)
	};

	const deleteParam = async (record) => {
		let tempParamData;
		try {
			dispatch(showLoader());
			if (record?.int_id) {
				const obj = {
					data: [
						record?.int_id
					]
				}
				const apiResponse = await deleteLimitsApi(obj);
				if (apiResponse?.status === 200) {
					tempParamData = paramData.filter((limit) => limit?.int_id !== record?.int_id)
					const tempMoleculeData = [...moleculeData];
					tempMoleculeData?.forEach((molecule) => {
						if (molecule?.key === expandedMol) {
							molecule.paramData = JSON.parse(JSON.stringify(tempParamData))
						}
					})
					setMoleculeData(tempMoleculeData)
				}
			} else {
				tempParamData = paramData.filter((limit) => limit?.key !== record?.key)
			}

			// setLimitsData(tempParamData)
			dispatch(hideLoader());
		} catch (error) {
			console.log("error", error);
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			// dispatch(showNotification("error", error));
		}
	}

	/* istanbul ignore next */
	const handleAdd = () => {
		const newData = {
			key: paramData?.length + 1,
			"cust_key": paramData[0]?.cust_key,
			"from_": "",
			"limit_type": "",
			"molecule": selectedMol.current,
			"parameters": '',
			"site": "",
			"to_": "",
			"start_valid_date": "",
			"end_valid_date": "",
			"view_disp_id": "",
			"view_version": '',
			"parameter_class": [],
			"document_name": '',
			"document_url": '',
			"edit": true
		};

		/* istanbul ignore next */
		const tempMoleculeData = [...moleculeData];
		/* istanbul ignore next */
		tempMoleculeData?.forEach((molecule) => {
			if (molecule?.key === expandedMol) {
				molecule.paramData.push(newData)
			}
		})
		setMoleculeData(tempMoleculeData)
	};

	useEffect(() => {
		const obj = {
			title: '',
			width: 50,
			key: 'delete',
			fixed: 'left',
			render: (record) => {
				return (
					<Popconfirm
						placement="top"
						title={text}
						onConfirm={(event) => {
							event.stopPropagation();
							deleteParam(record)
						}}
						okText="Yes"
						cancelText="No"
					>
						<DeleteOutlined
							style={{ color: "red", fontSize: '18px' }}
							className="delete"
							onClick={(e) => e.stopPropagation()}
						/>
					</Popconfirm>
				)
			}
		}
		if (editable) {
			columns.unshift(obj)
		} else {
			columns = columns.filter((ele) => ele?.key !== 'delete')
		}
		setTableCOlumns(columns)
	}, [siteList, viewList, parameterList, paramData, editable])

	return (
		<div className='expand-table'>
			<Row>
				<Col span={1} className="empty-space" />
				<Col span={23}>
					<Table
						columns={tableColumns}
						pagination={false}
						dataSource={_.cloneDeep(paramData)}
						scroll={{ x: 1300 }}
					/>
					{editable && <div className="add-button-limit">
						<Button
							onClick={() => handleAdd()}
						>
							<PlusOutlined />
							Add new parameter
						</Button>
					</div>}
				</Col>
			</Row>
		</div>
	)
}

export default LimitInputs
