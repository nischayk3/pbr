/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 15 March, 2022
 * @Last Changed By - Dinesh Kumar
 */
import React, { useEffect, useState } from 'react';
import { Collapse, List, Table } from 'antd';
import { tableColumns } from '../../../../../utils/TableColumns';

function GenealogyDataTable(props) {
  const [batchData, setbatchData] = useState({});
  const [limsBatchData, setLimsBatchData] = useState([]);
  const [proInput, setProInput] = useState([]);
  const [proOutput, setProOutput] = useState([]);
  const { Panel } = Collapse;
  const limsColumns = [
    { title: 'Batch', dataIndex: 'batch_num', key: '1' },
    { title: 'Plant', dataIndex: 'site_code', key: '2' },
    { title: 'Product', dataIndex: 'product_num', key: '3' },
    { title: 'Parameter Name', dataIndex: 'parameter_name', key: '4' },
    { title: 'Parameter Value', dataIndex: 'parameter_value', key: '5' },
    { title: 'Data Source', dataIndex: 'data_source', key: '6' },
    { title: 'System Code', dataIndex: 'system_code', key: '7' },
  ];
  const processColumns = [
    { title: 'Process Order', dataIndex: 'po_no', key: '1' },
    { title: 'Plant', dataIndex: 'plant', key: '2' },
    { title: 'Product', dataIndex: 'mat_no', key: '3' },
    { title: 'Batch', dataIndex: 'batch_no', key: '4' },
    { title: 'Product Desc', dataIndex: 'mat_desc', key: '5' },
    { title: 'Product Type', dataIndex: 'mat_type', key: '6' },
    { title: 'Node Id', dataIndex: 'node_id', key: '7' },
    { title: 'Unit', dataIndex: 'unit', key: '8' },
    { title: 'Qty', dataIndex: 'qty', key: '9' },
  ];
  useEffect(() => {
    if (props && props.batchInfo) {
      setbatchData(props.batchInfo);
    }
    if (props && props.limsBatchInfo && props.limsBatchInfo.length > 0) {
      setLimsBatchData(props.limsBatchInfo);
    }
    if (props && props.processInput && props.processInput.length > 0) {
      setProInput(props.processInput);
    }
    if (props && props.processOutput && props.processOutput.length > 0) {
      setProOutput(props.processOutput);
    }
  }, [
    props.processInput,
    props.processOutput,
    props.batchInfo,
    props.limsBatchInfo,
  ]);

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      className={props.className}
    >
      {props.type === 'Material' ? (
        <Panel header='Batch details' key='1'>
          <div className='batch-list'>
            <ul>
              <li>
                <p>
                  <span>Batch</span> {batchData.batch}
                </p>
              </li>
              <li>
                <p>
                  <span>Product</span> {batchData.product}
                </p>
              </li>
              <li>
                <p>
                  <span>Description</span> {batchData.product_desc}
                </p>
              </li>
              <li>
                <p>
                  <span>Node Id</span> {batchData.node_id}
                </p>
              </li>
            </ul>
          </div>
        </Panel>
      ) : (
        <></>
      )}
      {props.type === 'Material' ? (
        <Panel header='LIMS details' key='2'>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
            size='small'
            columns={limsColumns}
            dataSource={limsBatchData}
            scroll={{ x: 1600, y: 350 }}
            pagination={false}
          />
        </Panel>
      ) : (
        <></>
      )}
      {props.type === 'Process Order' ? (
        <Panel header='Into process order' key='3'>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
            size='small'
            columns={processColumns}
            dataSource={proInput}
            scroll={{ x: 1200, y: 350 }}
            pagination={false}
          />
        </Panel>
      ) : (
        <></>
      )}

      {props.type === 'Process Order' ? (
        <Panel header='From process order' key='4'>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
            size='small'
            columns={processColumns}
            dataSource={proOutput}
            scroll={{ x: 1200, y: 350 }}
            pagination={false}
          />
        </Panel>
      ) : (
        <></>
      )}

      {props.type === 'Material' ? (
        <Panel header='Purchase information' key='5'>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
            size='small'
            // columns={columns}
            // dataSource={dataTable}
            scroll={{ y: 350 }}
            pagination={false}
          />
        </Panel>
      ) : (
        <></>
      )}

      {props.type === 'Material' ? (
        <Panel header='Component details' key='6'>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
            size='small'
            // columns={columns}
            // dataSource={dataTable}
            scroll={{ y: 350 }}
            pagination={false}
          />
        </Panel>
      ) : (
        <></>
      )}
    </Collapse>
  );
}

export default GenealogyDataTable;
