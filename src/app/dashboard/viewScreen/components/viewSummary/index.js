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

	const { saveResponseView, viewJson, setViewJson } = props;

	useEffect(() => {
		setFunTableData(summaryTableData);
		setFunTableColumn(sumTableColumn);
	}, [summaryTableData]);

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

	return (
		<Card title='View Summary'>
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
