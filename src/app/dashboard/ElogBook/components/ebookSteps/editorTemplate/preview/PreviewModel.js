import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Input, Radio, Checkbox, Divider } from 'antd';
import Formtable from '../components/Formtable';
import { center } from 'svg-pan-zoom';
import Previewtable from './previewtable';

function PreviewModel({ previewData, layout }) {
  const [isModalOpen, setIsModalOpen] = useState(previewData);
 
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(previewData)
  }, [previewData])

  return (


    <Modal
      className="landing-modal"
      title="Preview Template"
      visible={isModalOpen}
      onCancel={handleCancel}
      width={1000}
      centered
      footer={null}
      style={{ height: 'calc(100vh - 200px)' }}
      bodyStyle={{ overflowY: 'scroll' }}
    >
      <div>
        {layout.map((row) =>
          <Row key={row.id} flex="auto" style={{ display: 'flex' }} >
            {row?.children?.map((col,index) =>
              <Col key={col.id} span={col?.span} >
                {col?.children?.map((component) => {
                  switch (component.type) {
                    case 'Input field':
                      return <div key={component.id} style={{ display: 'flex', textAlign: "start", marginLeft: '10px', padding: '10px' }}>
                        <label style={{ paddingRight: "10px", width: '100px' }}>{component.label}</label>
                        <Input type={component.datatype} name={component.technicalname} style={{ width: `${component.width || 200}px` }} />
                      </div>;
                    case 'Text':
                      return <div key={component.id} style={{ padding: '10px', display: 'flex', textAlign: "center", marginLeft: '10px' }}><div style={{ fontSize: `${component.fontSize}px`, fontWeight: component.fontWeight }}>{component.textlabel || "Enter text"}</div></div>;
                    case 'Table':
                      return <div key={component.id} style={{ textAlign: "center", marginLeft: '10px', paddingRight: '50px', marginTop: "30px", padding: '5px' }}><Previewtable layout={component} /></div>;
                    case 'Line':
                      return <div key={component.id} >  <div style={{ width: `${component.width}px`, alignItems: component.lineAlign }}>
                        <Divider style={{ color: "#000000" }} />
                      </div></div>
                    case 'Multiple choice':
                      return <div key={component.id} style={{ display: 'flex', textAlign: "center", marginLeft: '10px', padding: '10px' }}>  <Radio.Group name="radiogroup" defaultValue={1}>
                        {component?.fieldData.map((i) =>
                          <Radio key={i.id}>
                            {i.value}
                          </Radio>
                        )}

                      </Radio.Group> </div>
                    case 'Checkbox':
                      return <div key={component.id} style={{ display: 'flex', textAlign: "center", marginLeft: '10px', padding: '10px' }}> <Checkbox defaultChecked={component.defaultvalue == "true" ? true : false} >{component.textlabel}</Checkbox> </div>
                    default:
                      return null;
                  }
                }


                )}
              </Col>
            )}</Row>
        )}
      </div>

    </Modal >


  )
}

export default PreviewModel
