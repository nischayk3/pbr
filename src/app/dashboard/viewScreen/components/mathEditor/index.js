import React, { useEffect, useState } from 'react';

import CreateVariable from './createVariable';
import { Collapse } from 'antd';
import './style.scss';
import MathFunction from './mathFunction';
import ParameterTable from './parameterTable';
import VariableCard from './variableCard';

const variableData = [];
const MathEditor = props => {
	const [varData, setVarData] = useState([]);
	const [count, setCount] = useState(1);
	const [cardTitle, setCardTitle] = useState('Create Variable');
	const [rowDisable, setRowDisable] = useState(true);
	const [variableCreate, setVariableCreate] = useState(false);

	const { Panel } = Collapse;

	function callback(key) {
		console.log(key);
	}

	const addVariable = () => {
		setCardTitle('Select parameters');
		setRowDisable(false);
	};

	const createVariable = () => {
		variableData.push({
			variableName: `${'V' + count}`,
			key: count,
		});
		setCardTitle('Select parameters');
		setCount(count + 1);
		setVarData(variableData);
		setVariableCreate(true);
	};
	const callbackCheckbox = val => {
		if (val) {
			setCardTitle('Done');
		}
	};

	return (
		<Collapse
			className='viewCreation-accordian '
			defaultActiveKey={['1']}
			onChange={callback}>
			<Panel
				className='viewCreation-materialsPanel'
				header='Math Editor'
				key='1'>
				<MathFunction />
				<div className='variable-wrapper'>
					<CreateVariable
						addVariable={addVariable}
						title={cardTitle}
						createVariable={createVariable}
					/>
					{varData.map((item, index) => (
						<VariableCard key={index} variableName={item.variableName} />
					))}
				</div>
				<ParameterTable
					variableCreate={variableCreate}
					callbackCheckbox={callbackCheckbox}
					rowDisable={rowDisable}
					paramTableData={props.paramTableData}
					viewSummaryColumns={props.viewSummaryColumns}
					newBatchData={props.newBatchData}
					setViewSummaryColumns={props.setViewSummaryColumns}
					parentBatches={props.parentBatches}
				/>
			</Panel>
		</Collapse>
	);
};

export default MathEditor;
