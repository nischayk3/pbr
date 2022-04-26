import { useHistory, useLocation } from 'react-router-dom';
import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import { ArrowLeftOutlined } from '@ant-design/icons';

const UserConfiguration = () => {
    const history = useHistory()
    const location = useLocation()

    const goBackOnePage = () => {
        const { pathname } = location
        const path = pathname.substring(0, pathname.lastIndexOf('/'))
        history.push(path)
    }

    return (
        <div className='custom-wrapper'>
            <BreadCrumbWrapper />
            <div className='sub-header' style={{ cursor: 'pointer' }} onClick={goBackOnePage}>
                <div className='sub-header-title'>
                    <ArrowLeftOutlined className='header-icon' /> &nbsp;
                    <span className='header-title' style={{ textTransform: 'none' }}>User Configuration</span>
                </div>

            </div>
        </div>
    )
}

export default UserConfiguration