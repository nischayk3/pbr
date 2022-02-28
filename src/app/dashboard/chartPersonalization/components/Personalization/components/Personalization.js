import './Personalization.scss';

import { Card, Collapse } from 'antd';
import React, { Component } from 'react';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';

class Personalization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Panel } = Collapse;
    return (
      <Card title='Configuration'>
        <Collapse
          // defaultActiveKey={['1']}
          ghost
        >
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

          <Panel header='Panel Options' key='4'></Panel>
          <Panel header='Panel Links' key='5'></Panel>
          <Panel header='Repeat Options' key='6'></Panel>
          <Panel header='Display' key='7'></Panel>
          <Panel header='Legend' key='8'></Panel>
          <Panel header='Axis' key='9'></Panel>

          <Panel header='Control Limits' key='10'>
            <p>Text</p>
          </Panel>
          <Panel header='Rule' key='11'>
            <p>Text</p>
          </Panel>
        </Collapse>
      </Card>
    );
  }
}

export default Personalization;
