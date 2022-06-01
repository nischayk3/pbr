import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../duck/actions/commonActions';
import './style.scss';

const Notification = () => {
	const [alertMessage, setAlertMessage] = useState();
	const [alertDescription, setAlertDescription] = useState();
	const [alertType, setAlertType] = useState();
	const [isAlertShow, setIsAlertShow] = useState(false);

	const notice = useSelector(state => state.commonReducer.notification);
	const dispatch = useDispatch();
	const { type, message, description, status } = notice;

	const show = useCallback(() => {
		const noticeType = type || 'open';
		if (noticeType !== 'open') {
			setIsAlertShow(true);
			setAlertMessage(message);
			setAlertDescription(description);
			setAlertType(noticeType);
			setTimeout(() => {
				dispatch(hideNotification());
			}, 5000);
		}
	}, [description, dispatch, message, type]);
	const hide = () => {
		setIsAlertShow(false);
	};

	useEffect(() => {
		if (status) {
			show();
		} else {
			hide();
		}
	}, [show, status]);

	return (
		<>
			{isAlertShow && (
				<Alert
					className='alert-right-top'
					message={alertMessage}
					description={alertDescription}
					type={alertType}
					onClose={() => dispatch(hideNotification())}
					closable
					showIcon
				/>
			)}
		</>
	);
};

export default Notification;
