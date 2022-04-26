import { useHistory, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const GoBack = props => {
    const history = useHistory()
    const location = useLocation()

    const goBackOnePage = () => {
        const { pathname } = location
        const path = pathname.substring(0, pathname.lastIndexOf('/'))
        history.push(path)
    }

    return (
        <div className='sub-header' style={{ cursor: 'pointer' }} onClick={goBackOnePage}>
            <div className='sub-header-title'>
                <ArrowLeftOutlined className='header-icon' /> &nbsp;
                <span className='header-title' style={{ textTransform: 'none' }}>{props.currentPage}</span>
            </div>
        </div>
    )
}

export default GoBack