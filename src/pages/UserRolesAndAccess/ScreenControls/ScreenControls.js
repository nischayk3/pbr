import { useState } from 'react'
import { Collapse, Select, Button, Row, Col } from 'antd';

import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper/index'
import GoBackSubHeader from '../../../components/GoBackSubHeader/GoBackSubHeader';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import classes from '../UserRolesAndAccess.module.scss'

const { Panel } = Collapse;
const { Option } = Select;

const INITIAL_USER_RESTRICTIONS = [
    {
        screens: ['a', 'c'],
        widgets: ['d', 'e']
    }
]

const ScreenControls = () => {

    const [userRestrictions, setUserRestriction] = useState(INITIAL_USER_RESTRICTIONS)

    const onAddRestriction = () => {
        const newRestrictions = [{
            screens: [],
            widgets: []
        }]
        setUserRestriction([...userRestrictions, ...newRestrictions])
    }

    const onDeleteRestriction = index => {
        const userRestrictionsCopy = [...userRestrictions]
        userRestrictionsCopy.splice(index, 1)
        setUserRestriction(userRestrictionsCopy)
    }

    return (
        <div className='custom-wrapper'>
            <BreadCrumbWrapper />
            <GoBackSubHeader currentPage="Screen controls" />

            <Collapse defaultActiveKey={['1']} expandIconPosition="right">
                <Panel header="User" key="1">
                    <Row style={{ position: 'relative'}}>
                        <Col span={18}>
                            <p>Restrict this role from</p>
                            {userRestrictions.map((userRestriction, i) => {
                                return (
                                    <div key={i}>
                                        <label>Screen</label>
                                        <Select placeholder="Select" value={userRestriction.screens} mode="multiple" style={{ width: 220 }}>
                                            <Option value="a">Screen A</Option>
                                            <Option value="b">Screen B</Option>
                                            <Option value="c">Screen C</Option>
                                        </Select>
                                        <label>Widget</label>
                                        <Select placeholder="Select" value={userRestriction.widgets} mode="multiple" style={{ width: 220 }}>
                                            <Option value="d">Widget D</Option>
                                            <Option value="e">Widget E</Option>
                                            <Option value="f">Widget F</Option>
                                            <Option value="g">Widget G</Option>
                                        </Select>
                                        {userRestrictions.length > 1 && <DeleteOutlined style={{ color: 'red' }} onClick={() => onDeleteRestriction(i)} />}
                                    </div>
                                )
                            })}
                        </Col>
                        <Button type="primary" style={{ position: 'absolute', right: 0, top: 0}}>Save</Button>
                        <Col span={6} style={{ position: 'absolute', right: 0, bottom: 0}}>
                            <Button type="dashed" block icon={<PlusOutlined />} onClick={onAddRestriction}>Add Control</Button>
                        </Col>

                    </Row>
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