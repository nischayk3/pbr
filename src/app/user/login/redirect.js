import React, { useEffect } from 'react'
import { Result, Button } from 'antd';
import { getSession } from '../../../services/loginService';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    showNotification,
    showLoader,
    hideLoader
} from '../../../duck/actions/commonActions';
import { sendLoginDetails } from '../../../duck/actions/loginAction';


export default function Redirect(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const GetSession = async () => 
    {
        dispatch(showLoader())
        let res = await getSession()
        let data = res['Data']
        if (data) 
        {
            dispatch(sendLoginDetails(data))
            dispatch(showNotification('success', `Logined As ${data.email_id}`))
            history.push('/dashboard/genealogy');
            dispatch(hideLoader())
        }
        else 
        {
            dispatch(showNotification('error', 'Error in Login'))
            dispatch(hideLoader())
            history.push('/user/login')
        }
    }


    useEffect(() => {
        GetSession()
    })
    return (
        <div>
            <Result
                title="Redirecting You to the Main Screen"
                extra={
                    <Button type="primary" key="console">
                        CPV
                    </Button>
                }
            />

        </div>
    )
}