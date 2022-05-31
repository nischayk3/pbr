import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Popconfirm, Card, Tooltip, message } from 'antd';
import { DeleteTwoTone, PlusOutlined, EditOutlined } from '@ant-design/icons';
import './styles.scss';
import ReportDesignerDynamicRow from './reportDesignerDynamicRow/reportDesignerDynamicRow';
import Chart from '../reportChart/chartComponent/chartComponent';
import {
	showLoader,
	hideLoader,
} from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';
import checkIcon from '../../../../../assets/images/checkbox.svg';

function ReportDesignerDynamicSections(props) {
	useEffect(() => {
		LoadData();
	});

	const dispatch = useDispatch();
	const [addedCharts, setAddedCharts] = useState(
		props.chart_layout ? props.chart_layout : {}
	);
	const [addedKeys, setAddedKeys] = useState({});
	const [chartList, setChartList] = useState([]);
	const [showChart, setShowChart] = useState({});
	const [showAddSection, setShowAddSection] = useState(false);
	const [editable, setEditable] = useState(false);

	const { list } = props;

	const deleteChart = (chartName, section) => {
		dispatch(showLoader());
		section = section + 1;
		let charts_all = { ...addedCharts };
		let chart_index = charts_all[`${section}`].indexOf(chartName);
		if (chart_index > -1) {
			charts_all[`${section}`].splice(chart_index, 1); // 2nd parameter means remove one item only
		}
		setAddedCharts(charts_all);
		dispatch(hideLoader());
	};

	const handleEdit = value => {
		setEditable(!value);
	};
	const extract = str => {
		let s = str.length - 1;
		let chart_name = '';
		function reverse(s) {
			var o = '';
			for (var i = s.length - 1; i >= 0; i--) o += s[i];
			return o;
		}

		let b = false;
		for (let i = s - 1; i >= 0; i--) {
			if (str[i] == '>') {
				b = false;
				return reverse(chart_name);
			}
			if (b) {
				chart_name = chart_name + str[i];
			}
			if (str[i] == '<') b = true;
		}
	};

	const addChart = (chartName, section) => {
		console.log(chartName);
		if (chartName && chartName[0] == '<') {
			chartName = extract(chartName);
		}
		dispatch(showLoader());
		section = section + 1;
		if (`${section}` in addedCharts) {
			console.log(addedCharts[`${section}`]);
			if (addedCharts[`${section}`].includes(chartName)) {
				message.error('Chart already added');
				dispatch(hideLoader());
			} else {
				console.log('here');
				if (`${section}` in addedCharts) {
					addedCharts[`${section}`].push(chartName);
					setAddedCharts(addedCharts);
					dispatch(hideLoader());
				} else {
					if (addedCharts && !addedCharts[`${section}`]) {
						addedCharts[`${section}`] = [];
						addedCharts[`${section}`].push(chartName);
						setAddedCharts(addedCharts);
						dispatch(hideLoader());
					} else {
						addedCharts[`${section}`].push(chartName);
						setAddedKeys(addedCharts);
					}
					dispatch(hideLoader());
				}
				props.setSectionCharts(chartName, addedCharts);
			}
		}
	};

	const sectionAddKey = section => {
		dispatch(showLoader());
		section = section - 1;
		if (`${section}` in addedKeys) {
			if (addedKeys[`${section}`]) {
				addedKeys[`${section}`] = false;
				setAddedKeys(addedKeys);
				dispatch(hideLoader());
			} else {
				addedKeys[`${section}`] = true;
				setAddedKeys(addedKeys);
				dispatch(hideLoader());
			}
		} else {
			addedKeys[`${section}`] = true;
			setAddedKeys(addedKeys);
			dispatch(hideLoader());
		}
		props.setSectionAddKey(addedKeys);
	};

	const trackCharts = section => {
		dispatch(showLoader());

		if (`${section}` in addedKeys) {
			if (showChart[`${section}`]) {
				showChart[`${section}`] = false;
				setShowChart(showChart);
				dispatch(hideLoader());
			} else {
				showChart[`${section}`] = true;
				setShowChart(showChart);
				dispatch(hideLoader());
			}
		} else {
			showChart[`${section}`] = true;
			setShowChart(showChart);
			dispatch(hideLoader());
		}
		props.setSectionAddCharts(showChart);
	};

	const LoadData = () => {
		setAddedCharts(props.charts_layout);
		setShowChart(props.sectionAddedCharts);
		setAddedKeys(props.sectionKeys);
	};

	return (
		<div className='reportDesigner-dynamicSections bg-white'>
			<Card className='reportTableCard' title='Report Table'>
				<div className='designer-block'>
					<Form.List name={['response']}>
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<div
										style={{
											border: '1px solid #486BC9',
											marginBottom: '30px',
											minHeight: '160px',
											borderRadius: '4px',
											marginTop: '20px',
										}}>
										{name >= 0
											? setShowAddSection(true)
											: setShowAddSection(false)}
										<p className='section-name'>Section {name + 1} </p>

										<div
											style={{
												display: 'grid',
												gridTemplateColumns: '1fr 1fr 1fr',
												gridGap: '10px',
											}}>
											<div
												style={{
													display: 'grid',
													gridTemplateColumns: '1fr 1fr',
												}}>
												<Form.Item {...restField} name={[name, 'sectionName']}>
													<Input
														placeholder='Section'
														style={{
															width: '150px',
															marginBottom: '10px',
															marginLeft: '35px',
															marginRight: '20px',
														}}
														className='input-section'
														disabled={props.show}
														disabled={editable}
													/>
												</Form.Item>
												<Tooltip placement='topLeft' title='Edit Section Name'>
													{' '}
													<EditOutlined
														style={{
															marginTop: '8px',
															marginLeft: '10px',
															color: '#949494',
														}}
														onClick={() => handleEdit(editable)}
													/>{' '}
												</Tooltip>
											</div>
											{name > 0 ? (
												<div
													className='add-chart'
													onClick={() => trackCharts(name)}>
													<span style={{ marginRight: '4px' }}>+</span> Add
													Chart{' '}
												</div>
											) : (
												<></>
											)}
											{name > 0 ? (
												<div style={{ marginLeft: '15%' }}>
													<Popconfirm
														title='Are you Sure you want to delete the section?'
														onConfirm={() => remove(name)}
														disabled={props.show}>
														<DeleteTwoTone
															twoToneColor='red'
															style={{ fontSize: '18px', marginTop: '5px' }}
														/>
													</Popconfirm>
												</div>
											) : (
												<div style={{ marginLeft: '193%' }}>
													<Popconfirm
														title='Are you Sure you want to delete the section?'
														onConfirm={() => remove(name)}
														disabled={props.show}>
														<DeleteTwoTone
															twoToneColor='red'
															style={{ fontSize: '18px', marginTop: '5px' }}
														/>
													</Popconfirm>
												</div>
											)}
										</div>
										{!addedKeys[name] ? (
											<center>
												<div
													style={{
														height: '100px',
														width: '120px',
														opacity: '1px',
														border: '1px dashed #D9D9D9',
														marginTop: '30px',
														alignContent: 'center',
														justifyContent: 'center',
													}}
													onClick={() => sectionAddKey(name + 1)}>
													{' '}
													<PlusOutlined
														style={{ color: 'gray', marginTop: '25px' }}
													/>{' '}
													<br />
													Add key and value
												</div>
											</center>
										) : (
											<></>
										)}
										{addedKeys[name] ? (
											<>
												<Space
													className='dynamicSections-spaceSection'
													key={key}
													style={{ display: 'flex', justifyContent: 'center' }}
													align='baseline'>
													<table
														className='dynamicSections-table'
														style={{ width: '1200px', marginRight: '4px' }}>
														<thead className='dynamicSections-thead'>
															<tr>
																<th className='action-clm'>Action</th>
																<th className='key-clm'>Key</th>
																<th className='value-clm'>Value</th>
																<th className='edit-clm'>Editable?</th>
															</tr>
														</thead>
														<tbody className='dynamicSections-tbody'>
															<ReportDesignerDynamicRow
																fieldKey={name}
																show={props.show}
															/>
														</tbody>
													</table>
												</Space>
												{/* <center>
                                                    <PlusOutlined style={{ color: 'gray' }} />
                                                    <div>Click on add chart to add charts in the section</div>
                                                </center> */}
											</>
										) : (
											<></>
										)}
										<div>
											<div className='chart-block'>
												{showChart[name] ? (
													list.map(i => (
														<Form.Item {...restField} name={[name, 'select']}>
															<div
																className='chart-tiless'
																onClick={e =>
																	addChart(e.target.innerHTML, name)
																}>
																{addedCharts[`${name + 1}`] &&
																	addedCharts[`${name + 1}`].map(j =>
																		j == i ? (
																			<div className='chart-tile'>
																				{' '}
																				<img src={checkIcon} />
																			</div>
																		) : (
																			<></>
																		)
																	)}
																<p className='charttile-content'>{i}</p>
															</div>
														</Form.Item>
													))
												) : (
													<></>
												)}
												{/* <PlusOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', marginLeft: '10px', color: '#093185', background: "white", position: "absolute", bottom: 0, right: 0, padding: "2px", borderRadius: "50px" }} onClick={() => add()} /> <u disabled={props.show}></u> */}
											</div>
										</div>
										{props.charts_layout[`${name + 1}`] &&
											props.charts_layout[`${name + 1}`].map(i => (
												<div className='chart-sections'>
													<p className='chart-name'>
														{i}{' '}
														<Popconfirm
															title='Are you sure you want to delete the chart?'
															onConfirm={() => deleteChart(i, name)}
															disabled={props.show}>
															<Tooltip
																placement='bottomRight'
																title='Delete the chart'>
																{' '}
																<DeleteTwoTone
																	twoToneColor='red'
																	style={{ marginLeft: '20px' }}
																/>{' '}
															</Tooltip>
														</Popconfirm>
													</p>
													<Chart chartName={i} />
												</div>
											))}
										<Tooltip placement='bottomRight' title='Add Section'>
											{' '}
											<PlusOutlined
												style={{
													fontSize: '18px',
													marginLeft: '99.2%',
													color: '#093185',
													background: 'white',
													padding: '2px',
													borderRadius: '50px',
													position: 'relative',
													top: '10px',
													filter:
														'drop-shadow(0px 1px 10px rgba(38, 38, 38, 0.1))',
												}}
												twoToneColor='#eb2f96'
												onClick={() => add()}
											/>{' '}
										</Tooltip>
									</div>
								))}
								<Form.Item>
									{showAddSection ? (
										<></>
									) : (
										<p disabled={props.show}>
											<center>
												<div
													style={{
														height: '120px',
														width: '150px',
														opacity: '1px',
														border: '1px dashed #D9D9D9',
														marginTop: '30px',
														alignContent: 'center',
														justifyContent: 'center',
													}}
													onClick={() => add()}>
													{' '}
													<PlusOutlined
														twoToneColor='#eb2f96'
														style={{ marginTop: '40px' }}
													/>{' '}
													<br />
													Add Section
												</div>
											</center>
											{/* <PlusOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', marginLeft: '10px', color: '#093185', background: "white", position: "absolute", bottom: -10, right: -10, padding: "2px", borderRadius: "50px" }} onClick={() => add()} /> */}
										</p>
									)}
								</Form.Item>
							</>
						)}
					</Form.List>
				</div>
			</Card>
		</div>
	);
}

export default ReportDesignerDynamicSections;
