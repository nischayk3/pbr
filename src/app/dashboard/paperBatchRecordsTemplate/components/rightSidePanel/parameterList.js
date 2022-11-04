import React from 'react'
import {
    Collapse,
    Form,
} from 'antd';
import {
    CaretDownOutlined,
} from '@ant-design/icons';
import InputField from '../../../../../components/InputField/InputField';
const { Panel } = Collapse;
function ParameterList(props) {
    let {areasMapObject,params,clickedSnippetId,onChangeChart} = props
  return (
    <Collapse
    accordion
    expandIconPosition='right'
    defaultActiveKey={['1']}>
    <Panel header='Parameters' key='1'>
        <div className='snippetsBlock'>
           
        </div>
    </Panel>
</Collapse>
  )
}

export default ParameterList