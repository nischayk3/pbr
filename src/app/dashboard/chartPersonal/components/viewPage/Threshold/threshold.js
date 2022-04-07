import React from 'react';
import './styles.scss'
import { Row, Col, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import SelectField from '../../../../../../components/SelectField/SelectField';
import InputField from '../../../../../../components/InputField/InputField';

const Threshold = () => {
    const mathList = ['Lesser than', 'Greater than', 'Lesser than or equal to', 'Greater than or equal to', 'Equal to', 'Not equal to'];
    return (
        <div className='tresh-container'>
            <Row>
                <Col span={24}>
                    <p>Math Symbols</p>
                    <SelectField placeholder='Select' selectList={mathList} />
                </Col>
            </Row>
            <Row className='mt'>
                <Col span={24}>
                    <p>Parameter</p>
                    <InputField placeholder='Enter Number' />
                </Col>
            </Row>
            <Row className='mt'>
                <Col span={12} />
                <Col className='arrow-right' span={12}>
                    <Button>Apply</Button>
                    <ArrowRightOutlined />
                </Col>
            </Row>
        </div>
    )
}

export default Threshold;