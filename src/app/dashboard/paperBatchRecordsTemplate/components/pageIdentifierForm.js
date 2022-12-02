import { DeleteOutlined, MinusSquareTwoTone, MonitorOutlined, PlusSquareTwoTone } from '@ant-design/icons';
import { Button, Col, Collapse, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import {
	findPageIdentifier
} from '../../../../services/pbrService';

const { Panel } = Collapse;
const { Option } = Select;
/* istanbul ignore next */
function PageIdentifierForm(props) {
	let { pageDragValue, setPageIdFormValues, handleOnFinishFailed, parameterFormFinish, initialPageIdentifierData, matBatch, params } = props
	const dispatch = useDispatch();
	const [pageIdentifierFormValues, setPageIdentifierFormValues] = useState(initialPageIdentifierData ? initialPageIdentifierData : { users: [] });
	const [activeKey, setActiveKey] = useState(0);
	const [parameterCount, setParameterCount] = useState(0);
	const [updateKeyValueClicked, setUpdateKeyValueClicked] = useState("");
	const [fieldCount, setFieldCount] = useState([1]);
	const [filesFound, setFilesFound] = useState([]);
	const [searchedFile, setSearchedFile] = useState("");

	useEffect(() => {
		if (pageIdentifierFormValues.users[activeKey]) {
			let obj = { ...pageIdentifierFormValues.users[activeKey] }
			if (pageIdentifierFormValues?.users[activeKey]?.keyCount && fieldCount.length === 1) {
				obj["keyCount"] = pageIdentifierFormValues?.users[activeKey]?.keyCount
			} else {
				obj["keyCount"] = fieldCount?.length
			}
			// obj["keyCount"] = fieldCount?.length
			let newVal = { ...pageIdentifierFormValues }
			newVal.users[activeKey] = obj
			setPageIdentifierFormValues(newVal)
		}

	}, [fieldCount])

	useEffect(() => {
		if (pageIdentifierFormValues?.users[activeKey]?.keyCount) {
			let count = pageIdentifierFormValues?.users[activeKey]?.keyCount
			let arr = []
			for (let i = 1; i <= count; i++) {
				arr.push(i)
			}
			setFieldCount(arr)
		} else {
			setFieldCount([1])
		}
	}, [activeKey])

	const parameterValuesChange = (changedValues, values) => {
		setPageIdentifierFormValues({ ...pageIdentifierFormValues, users: values.users })
		setPageIdFormValues(values?.users)
	};

	const addKeyFiled = () => {
		let arr = [...fieldCount]
		arr.push(fieldCount.length + 1)
		setFieldCount(arr)
	}

	useEffect(() => {
		if (pageIdentifierFormValues?.users?.length > 0) {
			setParameterCount(pageIdentifierFormValues?.users?.length)
			setPageIdFormValues(pageIdentifierFormValues?.users)
		}

	}, [pageIdentifierFormValues])

	useEffect(() => {
		if (initialPageIdentifierData?.users?.length > 0) {
			setParameterCount(initialPageIdentifierData?.users?.length)
			setPageIdFormValues(initialPageIdentifierData?.users)
			// setPageIdentifierFormValues(initialPageIdentifierData)
			let count = initialPageIdentifierData?.users[activeKey]?.keyCount
			let arr = []
			for (let i = 1; i <= count; i++) {
				arr.push(i)
			}
			setFieldCount(arr)
		}

	}, [initialPageIdentifierData])

	const removeKeyFiled = () => {
		if (fieldCount.length > 1) {
			let arr = [...fieldCount]
			let obj = { ...pageIdentifierFormValues }
			delete obj.users[activeKey][`key${arr?.length}`]
			arr.pop()
			obj.users[activeKey]["keyCount"] = arr?.length
			setPageIdentifierFormValues(obj)
			setFieldCount(arr)
		}
	}

	const genExtra = (remove, name, key, restfield) => (
		<DeleteOutlined
			id="deleteParameter"
			onClick={event => {
				remove(name)
				// let arr = [...pageIdentifierFormValues.users]
				// arr.splice(name, 1)
				// setTableData(arr)
				// setFormTableData(arr)
			}}
		/>
	);
	useEffect(() => {
		if (Object.keys(pageDragValue).length) {
			let obj = { ...pageIdentifierFormValues.users[activeKey] }
			obj[updateKeyValueClicked] = pageDragValue.areaValue
			let newVal = { ...pageIdentifierFormValues }
			newVal.users[activeKey] = obj
			setPageIdentifierFormValues(newVal)
		}

	}, [pageDragValue])

	const DragInputValue = (e, key) => {
		setUpdateKeyValueClicked(key)
	}

	const find = async () => {
		if (pageIdentifierFormValues?.users) {
			dispatch(showLoader());
			let req = {
				batch_num: matBatch?.batch,
				page_identifier: [],
				product_num: matBatch?.material_num,
				site_code: matBatch?.site
			}
			let pageArr = []
			if (pageIdentifierFormValues?.users[activeKey]) {

				// pageIdentifierFormValues?.users?.forEach(item => {
				let obj = { name: "", keys: [] }
				Object.entries(pageIdentifierFormValues?.users[activeKey]).forEach(item1 => {
					if (item1[0] != "name" && item1[0] != "keyCount") {
						obj.keys.push(item1[1])
					}
					if (item1[0] === "name") {
						obj.name = item1[1]
					}
				})
				pageArr.push(obj)

				// })
			}
			req.page_identifier = pageArr
			let res = await findPageIdentifier(req)
			if (res?.Data?.length > 0) {
				dispatch(hideLoader());
				setFilesFound(res.Data)
				setSearchedFile(res.Total_Files)
			} else {
				dispatch(hideLoader());
				dispatch(showNotification('error', res?.Message))
			}
		} else {
			dispatch(showNotification('error', 'Add Page Identifier Values'));
		}
	}

	return (
		<Form name="dynamic_form_nest_item"
			onValuesChange={parameterValuesChange}
			disabled={params.fromScreen == "Workflow"}
			// onFinishFailed={handleOnFinishFailed}
			// onFinish={parameterFormFinish}
			initialValues={pageIdentifierFormValues}
			layout='vertical'
			// id="myForm"
			autoComplete="off">
			<div className='addParameterContainer'>
				<div className='addParameterBlock'>
					<div className='singleParameterBlock'>
						<Form.List name="users">
							{(fields, { add, remove }) => (
								<>
									<Collapse accordion expandIconPosition='right' onChange={(val) => {
										if (val !== undefined) {
											setActiveKey(Number(val))
										}
										setFilesFound([])
										setSearchedFile("")
									}}>
										{fields.map(({ key, name, ...restField }) => (

											// <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
											<Panel header={pageIdentifierFormValues?.users[name]?.name ? `${pageIdentifierFormValues?.users[name]?.name}` : `Parameter ${name + 1} created`} key={`${name}`} extra={params.fromScreen != "Workflow" ? genExtra(remove, name, key, restField) : ""}>
												<div className='addParameterBlock'>
													<div className='parameterAdded-block'>
														<Form.Item
															{...restField}
															name={[name, 'name']}
															label="Page Name"
															// rules={[{ required: true, message: 'Please enter Page Name' }]}
															rules={[
																() => ({
																	validator(_, value) {
																		let flag = false
																		pageIdentifierFormValues.users.forEach((item, index) => {
																			if (index != name && item.name === value) {
																				flag = true
																			}
																		})
																		if (flag) {
																			return Promise.reject('Page identifier cannot be same');
																		}
																		return Promise.resolve();
																	},
																})

															]}
														>
															<Input
																placeholder='Page Name'
															/>
														</Form.Item>
														<PlusSquareTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3 }} onClick={addKeyFiled} />
														<MinusSquareTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3, marginRight: 10 }} onClick={removeKeyFiled} />
														{fieldCount && fieldCount.map(item =>
														(
															<Form.Item
																{...restField}
																name={[name, `key${item}`]}
																label={`Key${item}`}
															// rules={[{ required: true, message: 'Please enter key2' }]}
															>
																<Input
																	placeholder={`Key${item}`}
																	style={{ width: 266 }}
																	onClick={(e) => DragInputValue(e, `key${item}`)}
																/>
															</Form.Item>
														)
														)}
														<Row>
															<Col span={12}>
																<Button type='primary' className='defineTableBtn' onClick={find}>
																	<MonitorOutlined /> Find
																</Button>
															</Col>
															<Col span={12}>

																{filesFound?.length > 0 &&
																	<p>Found in {`${filesFound?.length}/${searchedFile}`} files</p>
																}

															</Col>
														</Row>
														<div>{filesFound?.map(item => (
															<p>{item?.split('.')[0]}</p>
														))}</div>
													</div>
												</div>
											</Panel>
										))}
									</Collapse>
									{params.fromScreen != "Workflow" &&
										<Form.Item>
											<div
												className='firstParameter-para'
												onClick={() => {
													if (parameterCount !== 0) {
														add()

													} else {
														add()
													}
												}}
												type="primary"
												htmltype="submit"
											>
												<p>
													Add Page Identifier
													{/* {paramaterAdded
                                                    ? 'Add another paramater'
                                                    : 'Add your first Parameter'} */}
												</p>
											</div>
										</Form.Item>
									}
								</>
							)}
						</Form.List>
					</div>
				</div>
			</div>
		</Form>
	)
}

export default PageIdentifierForm