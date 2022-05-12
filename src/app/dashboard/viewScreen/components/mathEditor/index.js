import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateVariable from './createVariable';
import { Collapse } from 'antd';
import './style.scss';
import MathFunction from './mathFunction';
import { MemoizedParameterTable } from './parameterTable';
import VariableCard from './variableCard';

let variableData = [];

const MathEditor = props => {
	const isLoadView = useSelector(state => state.viewCreationReducer.isLoad);
	const [varData, setVarData] = useState(variableData);
	const [count, setCount] = useState(1);
	const [cardTitle, setCardTitle] = useState('Create Variable');
	const [rowDisable, setRowDisable] = useState(true);
	const [variableCreate, setVariableCreate] = useState(false);
	const [ischeckBox, setIscheckBox] = useState(false);
	const [varClick, setVarClick] = useState(false);
	const [paramData, setParamData] = useState({})
	const [selectedVar, setSelectedVar] = useState('')

	const { Panel } = Collapse;
	const {
		newBatchData,
		parentBatches,
		viewJson,
		setViewJson,
		viewSummaryBatch,
		setViewSummaryBatch,
		materialId,
	} = props;

	function callback(key) {
		// console.log(key);
	}

	useEffect(() => {
		if (isLoadView) {
			let paramKey = [];
			const viewJsonData = [...viewJson];
			viewJsonData.forEach((element, index) => {
				paramKey.push(Object.keys(element.parameters));
			});
			let var_data = []
			paramKey = paramKey[0]
			if (paramKey.length > 0) {
				for (let i = 0; i < paramKey.length; i++) 
				{
                    let obj ={}
					obj['variableName'] = paramKey[i]
					obj['id'] = i
					var_data.push(obj)
				}
			}
			setVarData(var_data);

			if(viewJsonData[0] && Object.keys(viewJsonData[0].parameters).length >0)
			{
                setParamData(viewJsonData[0].parameters)
			}
		}
	}, [isLoadView]);

	const addVariable = () => {
		setCardTitle('Select parameters');
		setRowDisable(false);
		setIscheckBox(true);
	};

	const createVar = () => {
		variableData.push({
			variableName: `${'V' + count}`,
			id: count,
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

	const getParamData = (data) => {
		setParamData(data)
	}

	const setVariable = (data) => {
		setSelectedVar(data)
	}
	const deleteVariable = param => {
		let lastIndex;
		varData.forEach((item, i) => {
			if (item.variableName === param) {
				lastIndex = i - 1;
			}
		});
		variableData.forEach((item, i) => {
			if (item.variableName === param) {
				lastIndex = i - 1;
			}
		});
		const varArr = varData.filter(ele => {
			return ele.variableName !== param;
		});
		const varDataArr = variableData.filter(ele => {
			return ele.variableName !== param;
		});

		variableData = varDataArr;
		setVarData(varArr);
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
				<MathFunction data={paramData} materialId={materialId} />
				<div className='variable-wrapper'>
					<CreateVariable
						addVariable={addVariable}
						title={cardTitle}
						createVar={createVar}
						className={'add-var_block add-var_block_bg'}
					/>
					{varData.map((item, index) => {
						return (
							<VariableCard
								item={item}
								variableName={item.variableName}
								deleteVariable={deleteVariable}
								setVariable={setVariable}
							/>
						);
					})}
				</div>
				<MemoizedParameterTable
					variableCreate={variableCreate}
					setVariableCreate={setVariableCreate}
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
					getParamData={getParamData}
					selectedData={paramData}
					selectedVar={selectedVar}
					materialId={materialId}
				/>
			</Panel>
		</Collapse>
	);
};

export const MemoizedMathEditor = React.memo(MathEditor);
