import React, { useState } from 'react';
import { Col, Row, Typography, Button } from 'antd';
import "./elogCard.scss";
import InputField from '../../../../../components/InputField/InputField';
import LogTable from '../elogTable/logTable';
const { Title } = Typography;

function ElogCard() {
    const [drive, setDrive] = useState(null);
    const [formData, setFormData] = useState({ Name: '', Class: '', Address: '' });
    const sendDataToParent = (index) => { // callback
        console.log(index);
        setDrive(index);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    console.log(drive, formData);
    return (
        <div>
            <div className='elog-main-wrapper'>
                <form>
                    <Row >
                        <Col span={8} align="start">
                            <Title level={4}>Title</Title>
                        </Col>
                        <Col span={4} offset={8} align="end">
                            <Button type="primary" className='custom-secondary-btn' onSubmit={handleSubmit}>
                                Save
                            </Button>
                        </Col>
                        <Col span={4} align="middle">
                            <Button type="primary" className='custom-secondary-btn'>
                                Cancel
                            </Button>
                        </Col>
                    </Row>

                    <Row>

                        <Col span={8} align="middle">
                            <div className='select-field'>
                                <InputField
                                    placeholder="Name"
                                    type="text"
                                    value={formData.Name}
                                    onChangeInput={(e) => setFormData({ ...formData, Name: e.target.value })}
                                />
                            </div>
                        </Col>
                        <Col span={8} align="middle">
                            <div className='select-field'>
                                <InputField
                                    placeholder="Class"
                                    type="Number"
                                    value={formData.Class}
                                    onChangeInput={(e) => setFormData({ ...formData, Class: e.target.value })}
                                />
                            </div>
                        </Col>
                        <Col span={8} align="middle">
                            <div className='select-field'>
                                <InputField
                                    placeholder="Address"
                                    type="text"
                                    value={formData.Address}
                                    onChangeInput={(e) => setFormData({ ...formData, Address: e.target.value })}
                                />
                            </div>
                        </Col>

                    </Row>

                    <Row>
                        <Col span={24}>
                            <LogTable sendDataToParent={sendDataToParent} />
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    )
}

export default ElogCard
