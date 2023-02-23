import { Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showNotification } from '../../../duck/actions/commonActions';
import { sendLoginDetails } from '../../../duck/actions/loginAction';
import { getSession } from '../../../services/loginService';

export default function RedirectSign() {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		getSessionDetail()
	})

	const getSessionDetail = async () => {
		try {
			const res = await getSession()
			if (res.Status === 200) {
				const data = res['Data']
				dispatch(sendLoginDetails(data))
				localStorage.setItem('login_details', JSON.stringify(data))
				localStorage.setItem('user', data.user_id);
				localStorage.setItem('username', data.firstname ? data.firstname.replaceAll('^"|"$', '') : data.email_id.replaceAll('^"|"$', ''));
				dispatch(showNotification('success', `Logined As ${data.email_id}`))
				setIsPublish(true)
				let url = localStorage.getItem('redirectUrl')
				window.open(url + '&publish=True', '_self')
			} else {
				dispatch(showNotification("error", 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'));
				history.push('/user/workflow')
			}
		} catch (error) {
			console.log('error', error)
			dispatch(showNotification("error", 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'));
			history.push('/user/workflow')
		}
	}


	return (
		<div>
			<Result
				title="Electonic Signature"
			/>
		</div>
	)
}