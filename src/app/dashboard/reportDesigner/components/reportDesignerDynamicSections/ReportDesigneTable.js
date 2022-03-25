import React from 'react';
import { Form, Input, Space, Popconfirm, Card, Button } from 'antd';
import { DeleteTwoTone, PlusOutlined, EditOutlined } from '@ant-design/icons';
import './styles.scss';
import ReportDesignerDynamicRow from './reportDesignerDynamicRow/reportDesignerDynamicRow';

function ReportDesigneTable(props) {

    const { formData } = props;

    return (
        <Card className="reportTableCard" title="Report Table" >
            <div className="designer-block">
                <Form.List name={["response"]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div style={{ border: "1px solid #486BC9", marginBottom: "10px", minHeight: "160px", borderRadius: "4px" }}>
                                    <div style={{ marginLeft: '35px', marginTop: '20px' }}>
                                        <p className="section-count">Section {name + 1}</p>
                                    </div>
                                    <Form.Item {...restField} name={[name, 'sectionName']}>
                                        <Input placeholder="Section Name" style={{ marginLeft: '35px', width: '150px' }} bordered={false} className="input-section" disabled={props.show} />
                                    </Form.Item>
                                    
                                    <div style={{ marginLeft: '1200px' }}>
                                        {/* <Button>+Add Chart</Button> */}
                                        <div>+ ADD Chart</div>
                                        <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => remove(name)} disabled={props.show}>
                                            <DeleteTwoTone twoToneColor="red" style={{ marginBottom: '100px' }} />
                                        </Popconfirm>
                                    </div>

                                    <Space
                                        className="designer-spaceSection"
                                        key={key}
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                        align="baseline"
                                    >
                                        <table className="designer-table">
                                            <thead className="designer-thead">
                                                <tr>
                                                    <th>Action</th>
                                                    <th>Key</th>
                                                    <th>Value</th>
                                                    <th>Editable?</th>
                                                </tr>
                                            </thead>
                                            <tbody className="designer-tbody">
                                                <ReportDesignerDynamicRow fieldKey={name} show={props.show} />
                                            </tbody>
                                        </table>
                                        {/* <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => remove(name)} disabled={props.show}>
                                            <DeleteTwoTone twoToneColor="red" />
                                        </Popconfirm> */}
                                    </Space>
                                    {/* <PlusOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', marginLeft: '10px', color: '#093185', background: "white", position: "absolute", bottom: 0, right: 0, padding: "2px", borderRadius: "50px" }} onClick={() => add()} /> <u disabled={props.show}></u> */}
                                </div>

                            ))}
                            <Form.Item >
                                <p disabled={props.show}>
                                    <div classname="dynamicDiv" style={{ border: "1px solid #486BC9", marginBottom: "10px", minHeight: "160px", borderRadius: "4px" }}>
                                    <div >+ ADD Chart</div>
                                    <div onClick={() => add()} >ADD</div>
                                    </div>
                                    <PlusOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', marginLeft: '10px', color: '#093185', background: "white", position: "absolute", bottom: 6, right: -10, padding: "2px", borderRadius: "50px" }} onClick={() => add()} /> <u disabled={props.show}></u>
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



