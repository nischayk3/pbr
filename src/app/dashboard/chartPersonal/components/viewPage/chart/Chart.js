import React, { useEffect, useState } from 'react';
import './styles.scss';
//antd imports
import { Row, Col, Divider } from 'antd';
//components
import InputField from '../../../../../../components/InputField/InputField';
import ScatterChart from './scatterChart/ScatterChart';


//main component
const Chart = ({ postChartData, setPostChartData }) => {
    const [xaxisList, setXAxisList] = useState([]);
    const [yaxisList, setYAxisList] = useState([]);


    useEffect(() => {
        let list = [];
        postChartData.extras && postChartData.extras.coverage && postChartData.extras.coverage.forEach((ele) => {
            list.push(ele.function_name);
            setXAxisList(list);
            setYAxisList(list);
        })
    }, [postChartData])

    return (
        <div className='chart-container'>
            <Row>
                <Col span={24} className='header'>
                    <h3>Chart</h3>
                </Col>
            </Row>
            <Row gutter={24} className='details-container'>
                <Col span={6}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Chart ID</p>
                        </Col>
                        <Col span={8}>
                            <p>:Unassigned</p>
                        </Col>
                        <Col span={6} />
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Version</p>
                        </Col>
                        <Col span={8}>
                            <p>: 6</p>
                        </Col>
                        <Col span={6} />
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <p>Status</p>
                        </Col>
                        <Col span={8}>
                            <p>: Draft</p>
                        </Col>
                        <Col span={6} />
                    </Row>
                </Col>
                <Col span={6}>
                    <label>Chart Name</label>
                    <InputField placeholder="Enter name" />
                </Col>
                <Col span={10}>
                    <label>Chart description</label>
                    <InputField placeholder="Enter description" />
                </Col>
            </Row>
            <Divider />
            <ScatterChart postChartData={postChartData} setPostChartData={setPostChartData} xaxisList={xaxisList} yaxisList={yaxisList} />
        </div>
    )
}

export default Chart