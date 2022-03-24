import React from 'react';
import { Form, Input, Space, Popconfirm, Card } from 'antd';
import { PlusSquareTwoTone, DeleteTwoTone ,PlusSquareOutlined} from '@ant-design/icons';
import './styles.scss';
import ReportDesignerDynamicRow from './reportDesignerDynamicRow/reportDesignerDynamicRow';

function ReportDesigneTable(props) {

    const { formData } = props;

    return (
    <Card className="reportTableCard" title="Report Table" >
        
                    <div className="dynamicSections-block">
                        <Form.List  name={["response"]}>
                            {(fields, { add, remove }) => (

                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div classname="dynamicDiv" style={{border:"1px solid blue",marginBottom:"10px"}}>
                                            <Form.Item {...restField} name={[name, 'sectionName']}>
                                                <p>section {key+1}</p>
                                                <Input placeholder="Section" style={{ marginLeft: '10px',marginTop:"10px",width:"140px" }} className="input-section" disabled={props.show}/>
                                                </Form.Item>
                                                    <span class="Legend-colorBox" style={{ backgroundColor: '#BAE7FF',marginRight:'10px' , marginLeft:'720px',fontSize:'12px' }}>
                                                    </span>
                                                    <span class="Legend-label" style={{marginBottom:'10px',fontSize:'12px'}}>
                                                        Edit
                                                    </span>
                                                    <span class="Legend-colorBox" style={{ backgroundColor: '#F5F5F5' ,marginLeft:'20px',fontSize:'12px'}}>
                                                    </span>
                                                    <span class="Legend-label" style={{marginLeft:'10px',fontSize:'12px'}}>
                                                        View Only
                                                    </span>                                            
                                            
                                            <Space
                                                className="dynamicSections-spaceSection"
                                                key={key}
                                                style={{ display: 'flex', justifyContent: 'center' }}
                                                align="baseline"
                                            >
                                                <table className="dynamicSections-table" style={{ width: '800px' }}>
                                                    <thead className="dynamicSections-thead">
                                                        <tr>
                                                        <th></th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                            <th>Action</th>
                                                            <th></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="dynamicSections-tbody">
                                                        <tr><td></td></tr>
                                                        <ReportDesignerDynamicRow fieldKey={name} show={props.show}/>
                                                    </tbody>
                                                </table>
                                                <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => remove(name)} disabled={props.show}>
                                                    <DeleteTwoTone twoToneColor="red" style={{marginBottom:'100px'}} />
                                                </Popconfirm>
                                            </Space>
                                        </div>
                                    ))}
                                    <Form.Item >
                                        <p disabled={props.show}>
                                            <PlusSquareOutlined  style={{ fontSize: '16px', marginLeft: '10px' ,color:'#093185'}} onClick={() => add()} /> <u disabled={props.show}>Add Multiple Sections</u>
                                        </p>

                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                  
        </div>
        </Card>
    );
}

export default ReportDesigneTable;
