import React, { Component } from 'react';
import { Card, Collapse } from 'antd';
import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import './Personalization.scss';

class Personalization extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { Panel } = Collapse;
        return (
            <div>
                <Card style={{ width: 350, height: 825 }}>
                    <Collapse defaultActiveKey={['1']} ghost>
                        <Panel header='Alerts' key='1'>
                            <div className='alerts-input'>
                                <p>Params</p>
                                <div className='alerts-input-param'>
                                    <InputField vlaue='' />
                                    <SelectField />
                                    <InputField vlaue='' />
                                </div>
                            </div>
                            <div>
                                <InputField label='Users' vlaue='' />
                            </div>
                            <div>
                                <SelectField label='Schedule' />
                            </div>
                        </Panel>
                        <Panel header='Sharing' key='2'>
                            <div>
                                <InputField label='Edit' vlaue='' />
                                <InputField label='View' vlaue='' />
                            </div>
                        </Panel>
                        <Panel header='Customization' key='3'></Panel>

                        <panel header='Panel Options' key='4'></panel>
                        <panel header='Panel Links' key='5'></panel>
                        <panel header='Repeat Options' key='6'></panel>
                        <panel header='Display' key='7'></panel>
                        <panel header='Legend' key='8'></panel>
                        <panel header='Axis' key='9'></panel>

                        <Panel header='Control Limits' key='10'>
                            <p>Text</p>
                        </Panel>
                        <Panel header='Rule' key='11'>
                            <p>Text</p>
                        </Panel>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

export default Personalization;
