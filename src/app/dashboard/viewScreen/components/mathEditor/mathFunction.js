import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, Alert, Table } from 'antd';
import FunctionKey from '../../../../../assets/images/key1.png';
import InputField from '../../../../../components/InputField/InputField';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {
	saveAsViewFunction,
	saveViewFunction,
	sendFunctionName,
	sendFunDetails,
} from '../../../../../duck/actions/viewAction';
import { viewEvaluate } from '../../../../../services/viewCreationPublishing';
import { showNotification } from '../../../../../duck/actions/commonActions';

const DataColumns = [
	{
		title: 'Batch Num',
		dataIndex: 'batch_num',
		key: 'batch_num',
		width: 150,
		fixed: 'left',
	},
	{
		title: 'PARAMETER',
		dataIndex: 'parameter',
		key: 'parameter',
		width: 150,
		fixed: 'left',
	},
	{
		title: 'Recorded Date',
		dataIndex: 'recorded_date',
		key: 'recorded_date',
		width: 150,
		fixed: 'left',
	},
	{
		title: 'Value',
		dataIndex: 'value',
		key: 'value',
		width: 150,
		fixed: 'left',
	},
]

const MathFunction = props => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFunctionVisible, setIsFunctionVisible] = useState(false);
	const [functionName, setFunctionName] = useState('');
	const [mathEditorValue, setMathEditorValue] = useState('');
	const [isAlertFunction, setIsAlertFunction] = useState(false);
	const [isFunction, setIsFunction] = useState(false);
	const [isEvaluatingFun, setIsEvaluatingFun] = useState(false);
	const [isFunValidate, setIsFunValidate] = useState(false);
	const [isFunctionInvalid, setIsFunctionInvalid] = useState(false);
	const [isTabelVisible, setIsTableVisible] = useState(false)
	const [evalTable, setEvalTable] = useState([])

	const dispatch = useDispatch();
	const showModal = () => {
		dispatch(saveViewFunction(false));
		setIsModalVisible(true);
		let funDetails = mathEditorValue;
		// mathEditorValue && mathEditorValue.split(/\W+/);
		dispatch(sendFunDetails(funDetails));
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleTableCancel = () => {
		setIsTableVisible(false);
	};

	const handleChangeFunction = e => {
		setMathEditorValue(e.target.value);
		setIsFunctionVisible(true);
	};
	const onChangeFunName = e => {
		setFunctionName(e.target.value);
	};

	const handleSave = () => {
		dispatch(sendFunctionName(functionName));
		dispatch(saveViewFunction(true));
		setIsModalVisible(false);
		setIsAlertFunction(true);
		setIsFunction(false);
		setTimeout(() => {
			setFunctionName('');
			setIsAlertFunction(false);
		}, 1000);
	};

	const functionEvaluate = async () => {
		let req = {
			material_id: "BELATACEPT",
			functions: { 1: { defination: mathEditorValue, name: 'function-1' } },
			parameters: props.data ? props.data : {}
		}

		let evaluate_respone = await viewEvaluate({ data: req })

		if (evaluate_respone.view_status == "") {
			setIsTableVisible(true)
			setEvalTable(evaluate_respone.functions)
			dispatch(showNotification('success', 'Evaluated'))
			setIsFunction(true);
		}
		else
			dispatch(showNotification('error', evaluate_respone.message))

		// if()

		//setIsEvaluatingFun(true);
		//	setIsFunctionInvalid(true);
	};

	const handleCloseError = () => {
		setIsFunctionInvalid(false);
		setIsEvaluatingFun(false);
	};


	return (
		<>
			<div className='function-editor'>
				{isAlertFunction ? (
					<div className='function-alert'>
						<p>{`Function '${functionName}' created `}</p>
						<span>
							<CheckCircleOutlined />
						</span>
					</div>
				) : isEvaluatingFun ? (
					<Alert message='Evaluating function...' type='info' />
				) : isFunValidate ? (
					<Alert
						closable
						afterClose={handleCloseError}
						message='Function valid!'
						type='success'
						showIcon
					/>
				) : isFunctionInvalid ? (
					<Alert
						closable
						afterClose={handleCloseError}
						message='Invalid function! Please use one of the functions below:'
						type='error'
						description={
							<div className='fun-error-list'>
								<ul>
									<li>1. round</li>
									<li>2. union</li>
								</ul>
							</div>
						}
						showIcon
					/>
				) : (
					<Input
						onChange={e => handleChangeFunction(e)}
						placeholder='Create variables using parameters below to use them here'
						suffix={
							<span>
								{isFunctionVisible && (
									<>
										{isFunction ? (
											<Button
												onClick={showModal}
												type='text'
												className='custom-primary-btn '>
												Create Function
											</Button>
										) : (
											<Button
												onClick={functionEvaluate}
												type='text'
												className='custom-primary-btn '>
												Function Evaluate
											</Button>
										)}
									</>
								)}

								<img src={FunctionKey} />
							</span>
						}
						value={mathEditorValue}
					/>
				)}
			</div>
			<Modal
				width={400}
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}>
				<div className='function-modal'>
					<p className='heading'>
						<InfoCircleOutlined className='heading-icon' /> Save
					</p>
					<div className='function-input'>
						<InputField
							label='Enter function name'
							placeholder='E.g. Function 1'
							onChangeInput={e => onChangeFunName(e)}
							value={functionName}
						/>

						<div className='function-btn'>
							<Button
								onClick={() => dispatch(saveAsViewFunction(true))}
								type='link'
								className='custom-secondary-btn-link '>
								Cancel
							</Button>
							<Button type='text' className='custom-primary-btn '>
								Save as a copy
							</Button>
							<Button
								onClick={() => {
									handleSave();
								}}
								type='text'
								className='custom-secondary-btn '>
								Save
							</Button>
						</div>
					</div>
				</div>
			</Modal>
			<Modal
				width={500}
				visible={isTabelVisible}
				onCancel={handleTableCancel}
				footer={null}>
				<Table className="eval-table" columns={DataColumns} dataSource={evalTable} />

			</Modal>
		</>
	);
};

export default MathFunction;
