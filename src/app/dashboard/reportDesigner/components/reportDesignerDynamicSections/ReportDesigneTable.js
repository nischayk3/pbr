import React from 'react';
import { Form, Input, Space, Popconfirm, Card } from 'antd';
import { PlusSquareTwoTone, DeleteTwoTone ,PlusOutlined} from '@ant-design/icons';
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
                                        <div  style={{border:"1px solid #486BC9",marginBottom:"10px" ,minHeight:"160px",borderRadius:"4px"}}>
                                            
                                            <Form.Item {...restField} name={[name, 'sectionName']}>
                                                <p>section {name+1}</p>
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
                                            <PlusOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', marginLeft: '10px' ,color:'#093185',background:"white",position:"absolute",bottom:0,right:0,padding:"2px",borderRadius:"50px"}} onClick={() => add()} /> <u disabled={props.show}></u>
                                        </div>
                                        
                                    ))}
                                    <Form.Item >
                                        <p disabled={props.show}>
                                            <div classname="dynamicDiv" style={{border:"1px solid #486BC9",marginBottom:"10px" ,minHeight:"160px",borderRadius:"4px"}}>
                                                
                                            </div>
                                            <PlusOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', marginLeft: '10px' ,color:'#093185',background:"white",position:"absolute",bottom:6,right:-10,padding:"2px",borderRadius:"50px"}} onClick={() => add()} /> <u disabled={props.show}></u>
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



