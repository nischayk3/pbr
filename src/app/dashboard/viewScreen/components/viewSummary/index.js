import { Card, Empty, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import LabelTag from '../../../../../components/LabelTag';
import './styles.scss';

const ViewSummaryData = props => {
	console.log('propsssss', props);
	const summaryTableData = useSelector(
		state => state.viewCreationReducer.summaryTableData
	);
	const functionName = useSelector(
		state => state.viewCreationReducer.functionName
	);

	const [funTableData, setFunTableData] = useState([]);

	const { viewDisplayId, viewStatus, viewVersion, viewJson, setViewJson } =
		props;

	let columns = [];
	const objKey =
		funTableData !== undefined && funTableData.length > 0
			? Object.keys(funTableData[0])
			: [];
	const uniqueArr = (value, index, self) => {
		return self.indexOf(value) === index;
	};
	const summaryColumn = objKey.filter(uniqueArr);

	summaryColumn.map((item, i) => {
		if (item === 'batch' || item === 'batch_year') {
			columns.push({
				title: item.toUpperCase().replace('_', ' '),
				dataIndex: item,
				key: `${item}-${i}`,
			});
		} else {
			columns.push({
				title: item.toUpperCase().replace('_', ' '),
				dataIndex: item,
				key: `${item}-${i}`,
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
			});
		}
	});

	useEffect(() => {
		if (functionName !== '') {
			setFunTableData(summaryTableData);
		}
	}, [summaryTableData]);

	return (
		<Card title='View Summary'>
			<div className='view-summary_lable' style={{ paddingTop: '20px' }}>
				<LabelTag lableName='View ID' lableValue={viewDisplayId} />
				<LabelTag lableName='Status' lableValue={viewStatus} />
				<LabelTag lableName='Version' lableValue={viewVersion} />
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
					columns={columns}
					dataSource={funTableData}
					size='small'
					scroll={{ y: 250 }}
					pagination={false}
				/>
			</div>
		</Card>
	);
};

export const MemoizedViewSummaryData = React.memo(ViewSummaryData);
