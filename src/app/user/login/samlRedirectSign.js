import { Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	hideLoader, showLoader, showNotification
} from '../../../duck/actions/commonActions';
import { getSession } from '../../../services/loginService';

export default function RedirectSAMLSign() {
	const dispatch = useDispatch();
	const history = useHistory();

	const GetSession = async () => {
		dispatch(showLoader())
		let res = await getSession()
		let data = res['Data']
		if (data) {
			console.log("saml redirect dataaaaaaaaa", data);
			dispatch(sendLoginDetails(data))
			localStorage.setItem('login_details', JSON.stringify(data))
			localStorage.setItem('user', data.email_id.replaceAll('^"|"$', ''));
			localStorage.setItem('username', data.firstname ? data.firstname.replaceAll('^"|"$', '') : data.email_id.replaceAll('^"|"$', ''));
			// localStorage.setItem("loginwith", 'WITH_AD')
			dispatch(showNotification('success', `Logined As ${data.email_id}`))
			dispatch(hideLoader())
			setIsPublish(true)
			let url = localStorage.getItem('redirectUrl')
			console.log("urllllllllll", url);
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
				title="Electonic Signature SAML"
			/>
		</div>
	)
}