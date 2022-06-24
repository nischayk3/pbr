import React, { useEffect, useState } from 'react';
import { Input, Table, Avatar, Modal, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import illustrations from '../../../../../assets/images/ViewCreation_bannerillustration.png';
import './landingStyle.scss';
import StatusBlock from '../../../../../components/StatusBlock/statusBlock';
import ScreenHeader from '../../../../../components/ScreenHeader/screenHeader';
import { useHistory } from 'react-router';
import Banner from '../../../../../assets/images/Popup-Side.svg';
import { getAllViews } from '../../../../../services/viewHierarchyServices';
import { useDispatch } from 'react-redux';
import { sendDrugSub, loadDrug } from '../../../../../duck/actions/viewHierarchyAction';


export default function Landing(props) {
	const [searched, setSearched] = useState(false);
	const [viewList, setViewList] = useState([]);
	const [filterTable, setFilterTable] = useState(null);
	const [lastEightView, setLastEightView] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [hierarchyName, setHierarchyName] = useState('')
	const dispatch = useDispatch()

	const history = useHistory();
	// const handleOk = () => {
	// 	setIsModalVisible(false);
	// };

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		getViews()
	}, [])

	const loadHier = async (ds_name) => {
		dispatch(loadDrug(true))
		history.push({
			pathname: `/dashboard/molecule_hierarchy_configuration/${ds_name}`,
		});
	}


	const getViews = async () => {
		let req = { limit: 8 }
		let reqs = {}
		let response = await getAllViews(req)
		let response_two = await getAllViews(reqs)

		if (response['status-code'] == 200) {
			setLastEightView(response.Data)
		}
		if (response_two['status-code'] == 200) {
			setViewList(response_two.Data)
		}
	}

	const columns = [
		{
			title: 'Drug Substance',
			dataIndex: 'ds_name',
			key: 'ds_name',
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: 'Product Number',
			dataIndex: 'product_num',
			key: 'product_num',
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: 'Site Code',
			dataIndex: 'site_code',
			key: 'site_code',
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: 'Created By',
			dataIndex: 'created_by',
			key: 'created_by',
			render: (text, row, index) => {
				return (
					<div>
						<Avatar
							className='avatar-icon'
							style={{ backgroundColor: getRandomColor(index + 1) }}>
							{text.split('')[0].toUpperCase()}{' '}
						</Avatar>
						<span className='avatar-text'>{text}</span>
					</div>
				);
			},
		},
	];


	const getRandomColor = index => {
		let colors = ['#56483F', '#728C69', '#c04000', '#c19578'];
		return colors[index % 4];
	};

	const search = value => {
		if (value == '')
			setSearched(false);
		else {
			setSearched(true);
			const tableData = viewList;
			const filterTableData = tableData.filter(o =>
				Object.keys(o).some(k =>
					String(o[k]).toLowerCase().includes(value.toLowerCase())
				)
			);
			setFilterTable(filterTableData);
		}
	};


	return (
		<div>
			<ScreenHeader
				bannerbg={{
					background:
						'linear-gradient(180deg, rgba(252, 192, 166, 0.65) 0%, #F5CACA 100%), linear-gradient(180deg, #FFFFFF 0%, #FFC7C7 100%)',
				}}
				title={`Howdy ${localStorage.getItem('username')}!`}
				description='Let’s get configuring some Views!'
				source={illustrations}
				sourceClass='geanealogy-image'
			/>

			<div className='landing-search-wrapper'>
				<div className='landing-card'>
					<div className="landing-input">
						<Input.Search
							placeholder='Search by drug substance name'
							allowClear
							className='landing-btn'
							enterButton='Search'
							size='large'
							onSearch={search}
						/>
					</div>
					{searched ? (
						<Table
							className='landing-table'
							columns={columns}
							dataSource={filterTable === null ? viewList : filterTable}
							onRow={record => ({
								onClick: e => {
									loadHier(record.ds_name);
								},
							})}
						/>
					) : (
						<></>
					)}
					<div
						className='create-new'
						onClick={() => {
							setIsModalVisible(true)
							// history.push({
							//     pathname: '/dashboard/molecule_hierarchy_configurations/untilted_view',
							// });
						}}>
						<PlusOutlined />
						<p>Create new hierarchy</p>
					</div>

					<div className='card-legends'>
						<h3 className='recent'>Recently created views</h3>
						<div className='legends'>
							<p>
								<span className='drft'></span>Draft
							</p>
							<p>
								<span className='await'></span>Awaiting approval
							</p>
							<p>
								<span className='aprv'></span>Approved
							</p>
						</div>
					</div>

					<div>
						<div className='tile'>
							{lastEightView.length > 0 ? (
								lastEightView.map((i, index) => (
									<div
										onClick={() => {
											loadHier(i.ds_name);
										}}>
										<StatusBlock
											key={index}
											id={i.ds_name}
											status={i.view_status}
										// handleClickTiles={e => handleClickView(e, i)}
										/>
									</div>
								))
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
			<div >
				<Modal
					className="landing-modal"
					title="Create New Hierarchy"
					visible={isModalVisible}
					onCancel={handleCancel}
					footer={[
						<Button disabled={!hierarchyName.length > 0} className="custom-primary-button" onClick={() => {
							history.push({
								pathname: '/dashboard/molecule_hierarchy_configuration/untitled_view',
							});
						}}>Let's Go!</Button>
					]}>
					<div>
						<Row>
							<Col span={12}>
								<img src={Banner} />
							</Col>
							<Col span={12}>
								<Row>
									<p>Name of the drug you want to add</p>
									<div className="input-ant">
										<Input
											placeholder='Enter Name'
											onChange={(e) => {
												setHierarchyName(e.target.value),
													dispatch(sendDrugSub(e.target.value)),
													dispatch(loadDrug(false))
											}}
											value={hierarchyName}
										/>
									</div>
								</Row>

							</Col>
						</Row>
					</div>

				</Modal>
			</div>
		</div>
	);
}
