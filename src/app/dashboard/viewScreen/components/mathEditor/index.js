import React, { useEffect, useState } from 'react';

import CreateVariable from './createVariable';
import { Collapse } from 'antd';
import './style.scss';
import MathFunction from './mathFunction';
import { MemoizedParameterTable } from './parameterTable';
import VariableCard from './variableCard';

const variableData = [];

const MathEditor = props => {
	const [varData, setVarData] = useState([]);
	const [count, setCount] = useState(1);
	const [cardTitle, setCardTitle] = useState('Create Variable');
	const [rowDisable, setRowDisable] = useState(true);
	const [variableCreate, setVariableCreate] = useState(false);
	const [ischeckBox, setIscheckBox] = useState(false);
	const [varClick, setVarClick] = useState(false);

	const { Panel } = Collapse;

	function callback(key) {
		console.log(key);
	}

	const addVariable = () => {
		setCardTitle('Select parameters');
		setRowDisable(false);
		setVarClick(true);
		setIscheckBox(true);
	};

	const createVar = () => {
		variableData.push({
			variableName: `${'V' + count}`,
			key: count,
		});

		setCount(count + 1);
		setVarData(variableData);
		setVariableCreate(true);
		setVarClick(false);
		setCardTitle('Create Variable');
	};
	const callbackCheckbox = val => {
		if (val) {
			setCardTitle('Done');
			setVarClick(true);
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
						createVar={createVar}
						className={'add-var_block add-var_block_bg'}
					/>
					{varData.map((item, index) => (
						<VariableCard key={index} variableName={item.variableName} />
					))}
				</div>
				<MemoizedParameterTable
					variableCreate={variableCreate}
					callbackCheckbox={callbackCheckbox}
					varClick={varClick}
					setVarClick={setVarClick}
					rowDisable={rowDisable}
					newBatchData={props.newBatchData}
					parentBatches={props.parentBatches}
					ischeckBox={ischeckBox}
					viewJson={props.viewJson}
					setViewJson={props.setViewJson}
					viewSummaryBatch={props.viewSummaryBatch}
					setViewSummaryBatch={props.setViewSummaryBatch}
				/>
			</Panel>
		</Collapse>
	);
};

export const MemoizedMathEditor = React.memo(MathEditor);
