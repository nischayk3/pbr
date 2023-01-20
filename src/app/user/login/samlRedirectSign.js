import { Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	hideLoader, showLoader, showNotification
} from '../../../duck/actions/commonActions';
import { sendLoginDetails } from '../../../duck/actions/loginAction';
import { getSession } from '../../../services/loginService';

export default function RedirectSAMLSign() {
	const dispatch = useDispatch();
	const history = useHistory();

	const GetSession = async () => {
		dispatch(showLoader())
		let res = await getSession()
		console.log("ressssssss", res);
		if (res.Status === 200) {
			let data = res['Data']
			console.log("dataaaaaaaa", data);
			dispatch(sendLoginDetails(data))
			localStorage.setItem('login_details', JSON.stringify(data))
			localStorage.setItem('user', data.email_id.replaceAll('^"|"$', ''));
			localStorage.setItem('username', data.firstname ? data.firstname.replaceAll('^"|"$', '') : data.email_id.replaceAll('^"|"$', ''));
			dispatch(showNotification('success', `Logined As ${data.email_id}`))
			dispatch(hideLoader())

			let url = localStorage.getItem('redirectUrl')
			console.log("urlllllll", url);
			history.push(`${url}`)
			// // console.log("urllllllllll", url);
			// window.open(url + '&publish=True', '_self')
			// window.location.reload()
		}

		else {
			dispatch(showNotification('error', 'Error in Login'))
			dispatch(hideLoader())
			history.push('/user/workflow')
		}
	}

	useEffect(() => {
		GetSession()
	}, [])
	return (
		<div>
			<Result
				title="Electonic Signature SAML"
			/>
		</div>
	)
}