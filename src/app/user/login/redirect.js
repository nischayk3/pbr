import { Button, Card, Result } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showNotification } from '../../../duck/actions/commonActions';
import { sendLoginDetails } from '../../../duck/actions/loginAction';
import { getSession } from '../../../services/loginService';

export default function Redirect() {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		getSessionDetail();
	}, []);

	const getSessionDetail = async () => {
		try {
			const sessionres = await getSession()
			if (!sessionres.SignedInfo) {
				window.open("https://mi-dev.mareana.com", '_self')

				return;
			}
			if (sessionres.Status === 200) {
				const data = sessionres['Data'];
				localStorage.setItem('login_details', JSON.stringify(data));
				localStorage.setItem('user', data?.user_id);
				localStorage.setItem('username', data?.firstname ? data?.firstname.replaceAll('^"|"$', '') : data?.email_id.replaceAll('^"|"$', ''));
				localStorage.setItem("user_id", data?.user_id)
				
				dispatch(showNotification('success', `Logged in as ${data?.email_id}`));
				if (data?.token != '') {
					dispatch(sendLoginDetails(data));
					history.push('/dashboard/workspace');
					dispatch(sendLoginDetails(data));
				}
			} else {
				dispatch(showNotification("error", 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'));
			}
		} catch (error) {
			console.log('error', error)
			window.open("https://mi-dev.mareana.com", '_self')
			dispatch(showNotification("error", 'Login Failed', 'Sorry, an unexpectede error occurred. Please try logging in again.'));
		}
	}


	return (
		<div className="custom-wrapper">
			<div className="custom-content-layout">
				<Card>
					<Result
						title='You are being redirected, please, wait.... '
						subTitle="If you haven't been redirected in 30 sececons, please click this button."
						extra={
							<Button type='primary' onClick={getSessionDetail} >
								Continue
							</Button>
						}
					/>
				</Card>
			</div>
		</div >
	);
}
