import React, { useCallback, useEffect, useState } from 'react';

import { notification, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { hideNotification } from '../../duck/actions/commonActions';

const DEFAULT_PLACEMENT = 'topRight';

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
			``;
			setAlertType(noticeType);
			setTimeout(() => {
				dispatch(hideNotification());
			}, 5000);
		}

		// notification[noticeType]({
		// 	message,
		// 	description,
		// 	placement: placement || DEFAULT_PLACEMENT,
		// 	onClose: () => {
		// 		dispatch(hideNotification());
		// 	},
		// });
	}, [description, dispatch, message, type]);
	const hide = () => {
		setIsAlertShow(false);
		//notification.destroy();
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
