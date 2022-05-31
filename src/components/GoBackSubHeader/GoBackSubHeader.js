import { useHistory, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const GoBackSubHeader = props => {
    const history = useHistory()
    const location = useLocation()

    const goBackOnePage = e => {
        e.stopPropagation()
        const { pathname } = location
        const path = pathname.substring(0, pathname.lastIndexOf('/'))
        history.push(path)
    }

    return (
        <div className='custom-user-roles-sub-header'>
            <div className='sub-header-title' onClick={goBackOnePage}>
                <ArrowLeftOutlined className='go-back--header-icon' /> &nbsp;
                <span className='header-title'>{props.currentPage}</span>
            </div>
            <style>{`
                .header-title {
                    font-family: 'Maven Pro';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 22px;
                    color: #262626;
                }
            `}</style>
        </div>
    )
}

export default GoBackSubHeader