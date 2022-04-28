import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateVariable from './createVariable';
import { Collapse } from 'antd';
import './style.scss';
import MathFunction from './mathFunction';
import { MemoizedParameterTable } from './parameterTable';
import VariableCard from './variableCard';

const variableData = [];

const MathEditor = props => {
	const isLoadView = useSelector(state => state.viewCreationReducer.isLoad);

	const [varData, setVarData] = useState([]);
	const [count, setCount] = useState(1);
	const [cardTitle, setCardTitle] = useState('Create Variable');
	const [rowDisable, setRowDisable] = useState(true);
	const [variableCreate, setVariableCreate] = useState(false);
	const [ischeckBox, setIscheckBox] = useState(false);
	const [varClick, setVarClick] = useState(false);

	const { Panel } = Collapse;
	const {
		newBatchData,
		parentBatches,
		viewJson,
		setViewJson,
		viewSummaryBatch,
		setViewSummaryBatch,
	} = props;

	function callback(key) {
		console.log(key);
	}

	useEffect(() => {
		if (isLoadView) {
			console.log('viewJson', viewJson);
			let paramKey = [];
			const viewJsonData = [...viewJson];
			viewJsonData.forEach((element, index) => {
				paramKey.push(Object.keys(element.parameters));
			});
			console.log('param key', paramKey);
			paramKey.forEach((element, index) => {
				variableData.push({
					variableName: element,
					key: index,
				});
			});
			setVarData(variableData);
		}
	}, [isLoadView]);

	const addVariable = () => {
		console.log('add variable');
		setCardTitle('Select parameters');
		setRowDisable(false);

		setIscheckBox(true);
	};

	const createVar = () => {
		console.log('create varrrrrrr');
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
					newBatchData={newBatchData}
					parentBatches={parentBatches}
					ischeckBox={ischeckBox}
					viewJson={viewJson}
					setViewJson={setViewJson}
					viewSummaryBatch={viewSummaryBatch}
					setViewSummaryBatch={setViewSummaryBatch}
				/>
			</Panel>
		</Collapse>
	);
};

export const MemoizedMathEditor = React.memo(MathEditor);
