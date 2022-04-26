import { Collapse, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBack from '../../../components/GoBack/GoBack';

const { Panel } = Collapse;
const { Option } = Select;

const ScreenControls = () => {
    return (
        <div className='custom-wrapper'>
            <BreadCrumbWrapper />
            <GoBack currentPage="Screen controls" />

            <Collapse defaultActiveKey={['1']} expandIconPosition="right">
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
        </div>
    )
}

export default ScreenControls