import React, { useState, useEffect } from 'react';
import { Input, Table, Tabs, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import illustrations from '../../../../../assets/images/ViewCreation_bannerillustration.png';
import './styles.scss';
import StatusBlock from '../../../../../components/StatusBlock/statusBlock';
import { getViews } from '../../../../../services/viewCreationPublishing';
import ScreenHeader from '../../../../../components/ScreenHeader/screenHeader';
import { useHistory } from 'react-router';

export default function Landing(props) {
	const [searched, setSearched] = useState(false);
	const [viewList, setViewList] = useState([]);
	const [filterTable, setFilterTable] = useState(null);
	const [lastEightView, setLastEightView] = useState([]);

	const history = useHistory();
	const columns = [
		{
			title: 'View',
			dataIndex: 'view',
			key: 'view',
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
			title: 'View Name',
			dataIndex: 'view_name',
			key: 'view_name',
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
			title: 'View Status',
			dataIndex: 'view_status',
			key: 'rep_status',
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

	useEffect(() => {
		getViewsList();
	}, []);

	const getRandomColor = index => {
		let colors = ['#56483F', '#728C69', '#c04000', '#c19578'];
		return colors[index % 4];
	};

	const search = value => {
		setSearched(true);
		const tableData = viewList;
		const filterTable = tableData.filter(o =>
			Object.keys(o).some(k =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterTable(filterTable);
	};

	const getViewsList = () => {
		let req = {};
		getViews(req).then(res => {
			const viewRes = res['Data'];
			const lastEight = viewRes.slice(Math.max(viewRes.length - 8, 1));
			setViewList(viewRes);
			setLastEightView(lastEight);
		});
	};

	const handleClickView = (e, element) => {
		console.log('e,element', e, element);
		history.push({
			pathname:
				'/dashboard/view_creation_view?view_disp_id=' +
				element.view_disp_id +
				'&view_version=' +
				element.view_version,
		});
		window.location.reload();
	};

	return (
		<div>
			<ScreenHeader
				bannerbg={{
					background:
						'linear-gradient(180deg, rgba(224, 145, 15, 0.35) 0%, rgba(255, 208, 123, 0.42) 100%)',
				}}
				title={`Howdy ${localStorage.getItem('username')}!`}
				description='Let’s get configuring some Views!'
				source={illustrations}
				sourceClass='geanealogy-image'
			/>

			<div className='landing-search-wrapper'>
				<div className='landing-card'>
					<Input.Search
						placeholder='Search by view ID or name'
						allowClear
						className='landing-btn'
						enterButton='Search'
						size='large'
						onSearch={search}
					/>
					{searched ? (
						<Table
							className='landing-table'
							columns={columns}
							dataSource={filterTable === null ? viewList : filterTable}
						/>
					) : (
						<></>
					)}
					<div
						className='create-new'
						onClick={() => {
							history.push({
								pathname: '/dashboard/view_creation_view',
							});
						}}>
						<PlusOutlined />
						<p>Create new view</p>
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
									<StatusBlock
										key={index}
										id={i.view}
										status={i.view_status}
										handleClickTiles={e => handleClickView(e, i)}
									/>
								))
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
