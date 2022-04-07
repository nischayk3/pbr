import { Checkbox, Collapse } from 'antd';
import React from 'react';
import './styles.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import InputField from '../../../../../../components/InputField/InputField';


const { Panel } = Collapse;

const rules = () => {
    return (
        <div className='rule-container'>
            <Collapse expandIconPosition='right' ghost className='collapse-rule'>
                <Panel header="Western Electric rule" key='1'>
                    <Collapse expandIconPosition='left' expandIcon={() => <PlusCircleOutlined />} ghost className='rule-content'>
                        <Panel header="Rule1" key='1'>
                            <div className='rules'>
                                <span><Checkbox />Any <InputField /> data point falls outside the 3-limit from the centerline (i.e,any point that falls outside 7 Zone A,beyond either the upper or control limit)</span>
                            </div>
                        </Panel>
                        <Panel header="Rule2" key='2'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls beyond the 2 limit(in zone A or beyond), on the same side of the centeer line</p>
                        </Panel>
                        <Panel header="Rule3" key='3'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls beyond the 1 limit(in zone B or beyond), on the same side of the centeer line</p>
                        </Panel>
                        <Panel header="Rule4" key='4'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls on the same side of centerline (in zone C or beyond)</p>
                        </Panel>
                    </Collapse>
                </Panel>
                <Panel header="Nelson rule" key='2'>
                    <Collapse expandIconPosition='left' expandIcon={() => <PlusCircleOutlined />} ghost className='rule-content'>
                        <Panel header="Rule1" key='1'>
                            <Checkbox /> <p><InputField /> point is more than 3 standard deviations from the mean</p>
                        </Panel>
                        <Panel header="Rule2" key='2'>
                            <Checkbox /> <p><InputField /> (or more) points in a row are on the same side of mean</p>
                        </Panel>
                        <Panel header="Rule3" key='3'>
                            <Checkbox /> <p><InputField /> (or more) points in a row are on contionusly increasing (or decreasing)</p>
                        </Panel>
                        <Panel header="Rule4" key='4'>
                            <Checkbox /> <p><InputField /> (or more) points in a row in alternate in direction,increasing then decreasing</p>
                        </Panel>
                        <Panel header="Rule5" key='5'>
                            <Checkbox /> <p><InputField /> out of three points in a row are more than 2 standard deviations from the mean in same direction</p>
                        </Panel>
                        <Panel header="Rule6" key='6'>
                            <Checkbox /> <p><InputField />(or five) out of five points in a row are more than 1 standard deviations from the mean in same direction</p>
                        </Panel>
                        <Panel header="Rule7" key='7'>
                            <Checkbox /> <p><InputField />points in a row are on are all within 1 standard deviation of the mean on either side of mean</p>
                        </Panel>
                        <Panel header="Rule8" key='8'>
                            <Checkbox /> <p><InputField />points in row exist, but none within 1 standard deviation of the mean,and the points are</p>
                        </Panel>
                    </Collapse>
                </Panel>
                <Panel header="Westgard rule" key='3'>
                    <Collapse expandIconPosition='left' expandIcon={() => <PlusCircleOutlined />} ghost className='rule-content'>
                        <Panel header={<p>Rule1<sub>2s</sub></p>} key='1'>
                            <Checkbox /> <p>Any <InputField /> data point falls outside the 3-limit from the centerline (i.e,any point that falls outside 7 Zone A,beyond either the upper or control limit)</p>
                        </Panel>
                        <Panel header={<p>Rule1<sub>3s</sub></p>} key='2'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls beyond the 2 limit(in zone A or beyond), on the same side of the centeer line</p>
                        </Panel>
                        <Panel header={<p>Rule2<sub>2s</sub></p>} key='3'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls beyond the 1 limit(in zone B or beyond), on the same side of the centeer line</p>
                        </Panel>
                        <Panel header={<p>RuleR<sub>4s</sub></p>} key='4'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls on the same side of centerline (in zone C or beyond)</p>
                        </Panel>
                        <Panel header={<p>Rule4<sub>1s</sub></p>} key='3'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls beyond the 1 limit(in zone B or beyond), on the same side of the centeer line</p>
                        </Panel>
                        <Panel header={<p>Rule1<sub>10x</sub></p>} key='4'>
                            <Checkbox /> <p><InputField />out of <InputField /> consecutive points falls on the same side of centerline (in zone C or beyond)</p>
                        </Panel>
                    </Collapse>
                </Panel>
            </Collapse>
        </div>
    )
}

export default rules