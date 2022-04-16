import { Card, Empty, Table } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import LabelTag from '../../../../../components/LabelTag';
import './styles.scss';
import InputField from '../../../../../components/InputField/InputField';
const ViewSummaryData = props => {
	const summaryTableData = useSelector(
		state => state.viewCreationReducer.summaryTableData
	);
	const functionName = useSelector(
		state => state.viewCreationReducer.functionName
	);
	const [funTableColumn, setFunTableColumn] = useState([]);
	const [funTableData, setFunTableData] = useState([]);
	const [viewName, setViewName] = useState('');
	const [viewDesc, setViewDesc] = useState('');
	const { saveResponseView, viewJson, setViewJson } = props;

	console.log('view sum propsss', props);

	useEffect(() => {
		setFunTableData(summaryTableData);
		setFunTableColumn(sumTableColumn);
	}, [summaryTableData]);

	// useEffect(() => {
	// 	const jsonView = [...viewJson.data];
	// 	jsonView.forEach(element => {
	// 		if (element.view_name) {
	// 			setViewName(element.view_name);
	// 		} else if (element.view_description) {
	// 			setViewDesc(element.view_description);
	// 		}
	// 	});
	// }, [viewJson]);

	const sumTableColumn = [
		{
			title: 'Year',
			key: 'year',
			dataIndex: 'year',
		},
		{
			title: 'Batch',
			key: 'batch',
			dataIndex: 'batch',
		},
		{
			title: functionName,
			key: functionName,
			dataIndex: functionName,
			render: value =>
				value ? (
					<span className='batchChecked'>
						<CheckOutlined />
					</span>
				) : (
					<span className='batchClosed'>
						<CloseOutlined />
					</span>
				),
		},
	];

	const onChangeView = (e, value, field) => {
		const newArr = [...viewJson];
		if (field === 'name') {
			newArr.forEach(element => {
				element.view_name = e.target.value;
			});
		} else if (field === 'description') {
			newArr.forEach(element => {
				element.view_description = e.target.value;
			});
		}
		setViewJson(newArr);
	};

	return (
		<Card title='View Summary'>
			<div className='view-summary_lable'>
				<InputField
					label='View Name'
					onChangeInput={(e, value) => onChangeView(e, value, 'name')}
					placeholder='Enter View Name'
					// value={viewName}
				/>
				<InputField
					label='Description'
					onChangeInput={(e, value) => onChangeView(e, value, 'description')}
					placeholder='Enter View Name'
					// value={viewDesc}
				/>
			</div>
			<div className='view-summary_lable' style={{ paddingTop: '20px' }}>
				<LabelTag
					lableName='View ID'
					lableValue={saveResponseView && saveResponseView.viewId}
				/>
				<LabelTag
					lableName='Status'
					lableValue={saveResponseView && saveResponseView.viewStatus}
				/>
				<LabelTag
					lableName='Version'
					lableValue={saveResponseView && saveResponseView.version}
				/>
			</div>

			<div className='summary-table_block'>
				<Table
					rowClassName={index =>
						index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
					}
					locale={{
						emptyText: (
							<Empty
								image={Empty.PRESENTED_IMAGE_SIMPLE}
								description={
									<span>You will see the created fucntions here</span>
								}
							/>
						),
					}}
					rowKey='key'
					columns={funTableColumn}
					dataSource={funTableData}
					size='small'
					scroll={{ y: 250 }}
					pagination={false}
				/>
			</div>
		</Card>
	);
};

export default ViewSummaryData;
