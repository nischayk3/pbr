import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal } from 'antd';
import FunctionKey from '../../../../../assets/images/key1.png';
import InputField from '../../../../../components/InputField/InputField';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
	saveAsViewFunction,
	saveViewFunction,
	sendFunctionName,
	sendFunDetails,
} from '../../../../../duck/actions/viewAction';

const MathFunction = props => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFunctionVisible, setIsFunctionVisible] = useState(false);
	const [functionName, setFunctionName] = useState('');
	const [mathEditorValue, setmathEditorValue] = useState('');

	const dispatch = useDispatch();

	const showModal = () => {
		setIsModalVisible(true);
		let funDetails = mathEditorValue && mathEditorValue.split(/\W+/);

		dispatch(sendFunDetails(funDetails));
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleChangeFunction = e => {
		setmathEditorValue(e.target.value);
		setIsFunctionVisible(true);
	};
	const onChangeFunName = e => {
		setFunctionName(e.target.value);
		dispatch(sendFunctionName(e.target.value));
	};

	const handleSave = () => {
		dispatch(saveViewFunction(true));
		setIsModalVisible(false);
	};
	console.log('isFunctionVisible', isFunctionVisible);
	return (
		<>
			<div className='function-editor'>
				<Input
					onChange={e => handleChangeFunction(e)}
					placeholder='Create variables using parameters below to use them here'
					suffix={
						<span>
							{isFunctionVisible && (
								<Button
									onClick={showModal}
									type='text'
									className='custom-primary-btn '>
									Create Function
								</Button>
							)}
							<img src={FunctionKey} />
						</span>
					}
				/>
			</div>
			<Modal
				width={400}
				// title='Basic Modal'
				visible={isModalVisible}
				// onOk={handleOk}
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
		</>
	);
};

export default MathFunction;
