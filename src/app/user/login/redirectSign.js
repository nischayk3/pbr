import { Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	hideLoader, showLoader, showNotification
} from '../../../duck/actions/commonActions';
import { sendLoginDetails } from '../../../duck/actions/loginAction';
import { getSession } from '../../../services/loginService';

export default function RedirectSign() {
	const dispatch = useDispatch();
	const history = useHistory();

	const GetSession = async () => {
		dispatch(showLoader())
		let res = await getSession()
		let data = res['Data']
		if (data) {
			dispatch(sendLoginDetails(data))
			sessionStorage.setItem('login_details', JSON.stringify(data))
			sessionStorage.setItem('user', data.email_id.replaceAll('^"|"$', ''));
			sessionStorage.setItem('username', data.firstname ? data.firstname.replaceAll('^"|"$', '') : data.email_id.replaceAll('^"|"$', ''));
			sessionStorage.setItem("loginwith", 'WITH_AD')
			dispatch(showNotification('success', `Logined As ${data.email_id}`))
			dispatch(hideLoader())
			setIsPublish(true)
			let url = sessionStorage.getItem('redirectUrl')
			// http://localhost/#/dashboard/view_creation?id=V84&version=1&
			window.open(url + '&publish=True', '_self')
		}
		else {
			dispatch(showNotification('error', 'Error in Login'))
			dispatch(hideLoader())
			history.push('/user/workflow')
		}
	}

	useEffect(() => {
		GetSession()
	})
	return (
		<div>
			<Result
				title="Electonic Signature"
			/>
		</div>
	)
}