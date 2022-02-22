import React from 'react';
import { Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusSquareTwoTone } from '@ant-design/icons';
import './styles.scss';
import ReportDesignerDynamicRow from './reportDesignerDynamicRow/reportDesignerDynamicRow';

function ReportDesignerDynamicSections(props) {
   
    const {formData}=props;
    console.log('form dyn section',formData);

    return (
        <div className="reportDesigner-dynamicSections bg-white">
            <h6 className="dynamicSections-noteHeadline">Note</h6>
            <ul className="dynamicSections-ul">
                <li>
                To Create multiple sections, Please click on Add Multiple Sections
                </li>
                <li style={{marginTop:'10px'}}>To Create multiple rows, Please click on plus icon in the row</li>
            </ul>

            <div className="dynamicSections-container">
                <div className="dynamicSections-section">
                    <div className="dynamicSections-block">
                        <Form.List name={["response"]}>
                            {(fields, { add, remove }) => (
                                
                                <>
                                {console.log('fileds',fields)}
                                    {fields.map(({ key, name, ...restField }) => (
                                        
                                        <div> 
                                            {/* {console.log('fill',key, name, ...restField )} */}
                                            <Form.Item {...restField} name={[name, 'sectionName']}>
                                                <Input placeholder="Section" style={{marginLeft:'300px'}} className="input-section"  />
                                            </Form.Item>
                    
                                            <Space
                                                className="dynamicSections-spaceSection"
                                                key={key}
                                                style={{ display: 'flex', justifyContent: 'center' }}
                                                align="baseline"
                                            >
                      
                                                <table className="dynamicSections-table">
                                                    <thead className="dynamicSections-thead">
                                                        <tr>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                            <th>Action</th>
                                                            <th></th>                          
                                                        </tr>
                                                    </thead>
                                                    <tbody className="dynamicSections-tbody">
                                                        <tr><td></td></tr>
                                                        <ReportDesignerDynamicRow fieldKey={name} />
                                                    </tbody>
                                                </table>

                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <p>
                                            <PlusSquareTwoTone style={{fontSize:'16px',marginLeft:'10px'}} onClick={() => add()} /> Add Multiple Sections
                                        </p> 
                      
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportDesignerDynamicSections;
