import React from 'react';
import './ScatterStyles.scss';
//antd imports
import { Row, Col } from 'antd';
//components
import SelectField from '../../../../../../../components/SelectField/SelectField';

const ScatterChart = () => {
    return (
        <div className='chartLayout-container'>
            <Row gutter={24}>
                <Col span={6}>
                    <label>Chart Type</label>
                    <SelectField placeholder="Selec Chart type" />
                </Col>
                <Col span={6}>
                    <label>X-axis</label>
                    <SelectField placeholder="Select X-axis" />
                </Col>
                <Col span={6}>
                    <label>Y-axis</label>
                    <SelectField placeholder="Select Y-axis" />
                </Col>
                <Col span={6} />
            </Row>
        </div>
    )
}

export default ScatterChart