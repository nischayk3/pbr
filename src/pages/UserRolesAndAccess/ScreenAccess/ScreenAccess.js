import { useHistory, useLocation } from 'react-router-dom';
import { Collapse, Select } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'

const { Panel } = Collapse;
const { Option } = Select;

const ScreenAccess = () => {
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
                    <span className='header-title' style={{ textTransform: 'none' }}>Screen access</span>
                </div>
            </div>

            <Collapse
                defaultActiveKey={['1']}
                expandIconPosition="right">
                <Panel header="User" key="1">
                    <p>Screen</p>
                    <Select defaultValue="max" style={{ width: 120 }}>
                        <Option value="max">Max</Option>
                    </Select>
                </Panel>
                <Panel header="Admin" key="2">
                    <p>Screen</p>
                </Panel>
                <Panel header="CMO" key="3">
                    <p>Screen</p>
                </Panel>
            </Collapse>
            {/* expandIcon={({ isActive }) => isActive ? <DeleteOutlined /> : <DeleteOutlined />} */}
        </div>
    )
}

export default ScreenAccess