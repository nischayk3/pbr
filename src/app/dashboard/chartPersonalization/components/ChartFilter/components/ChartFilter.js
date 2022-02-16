import React, { Component } from 'react';
import { Card, Checkbox, Input, DatePicker, Typography } from 'antd';
import SelectField from '../../../../../../components/SelectField/SelectField';
import { Modal, Button } from 'antd';

const { Text } = Typography;
const { Search } = Input;

class ChartFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false,
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        console.log(this.state.visible);
        return (
            <div>
                <Card title='Filters' style={{ width: 450 }}>
                    <div>
                        <div className='grid-2-columns'>
                            <SelectField label='Site' />
                            <DatePicker
                                style={{ height: '35px', marginTop: '20px' }}
                                onClick={() => this.showModal()}
                                disabled
                            />
                        </div>
                        <div style={{ padding: '4px 0' }}>
                            <Checkbox onChange={this.onChange}>Unapproved data</Checkbox>
                        </div>
                    </div>
                </Card>

                <Modal
                    visible={this.state.visible}
                    title='Absolute Time Range'
                    onOk={this.handleOk}
                    width={700}
                    onCancel={this.handleCancel}
                    footer={[
                        <p style={{ float: 'left' }}>Last 5 minutes United States EST</p>,
                        <Button key='back'>UTC-05:00</Button>,
                        <Button key='submit' type='primary' loading={this.state.loading}>
							Change Time Settings
                        </Button>,
                    ]}
                >
                    <div>
                        <div>
                            <Text>From</Text>
                            <br />
                            <DatePicker style={{ marginTop: '10px', marginBottom: '10px' }} />
                            <br />
                            <Text style={{ marginTop: '10px' }}>To</Text>
                            <br />
                            <DatePicker style={{ marginTop: '8px' }} />
                            <br />
                            <Button type='primary' style={{ marginTop: '20px' }}>
								Apply Time Range
                            </Button>
                            <p style={{ marginTop: '10px' }}>
                                <b>Recently Used time changes</b>
                            </p>
                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                            <p>2020-03-16T06:00:00Z - 2020-03-16T06:00:00Z </p>
                        </div>
                        <div>
                            <Search
                                placeholder='Search quick Ranges'
                                style={{ width: 200 }}
                            />
                            <p style={{ marginTop: '10px' }}>Last 5 minutes</p>
                            <p>Last 15 minutes</p>
                            <p>Last 25 minutes</p>
                            <p>Last 35 minutes</p>
                            <p>Last 45 minutes</p>
                            <p>Last 60 minutes</p>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ChartFilter;
