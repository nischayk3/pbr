import React, { useEffect, useState } from 'react';
import './styles.scss';

import {
    CheckCircleOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { Form, Input, Space, Table, Tag } from 'antd';

// const columns = [
//   {
//     title: 'Action',
//     key: 'action',
//     width: 100,
//     fixed: 'left',
//     render: (text, record) => (
//       <Space size="middle" className="deleteTableAction">
//         Delete
//       </Space>
//     ),
//   },
//   {
//     title: 'Function',
//     key: 'param',
//     dataIndex: 'param',
//     width: 150,
//     fixed: 'left',
//     render: param => (
//       <>
//         {param.map(item => {
//           return (
//             <Tag color="magenta" key={item} onClick={() => onClickTag(item)}>
//               {item.toUpperCase()}
//             </Tag>
//           )
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Status',
//     key: 'status',
//     dataIndex: 'status',
//     width: 100,
//     fixed: 'left',
//     render: status => (
//       <>
//         {status === 'success' ? (
//           <span className="statusChecked">
//             <CheckCircleOutlined />
//           </span>
//         ) : (
//           <span className="statusClosed">
//             <CloseOutlined />
//           </span>
//         )}
//       </>
//     ),
//   },
//   {
//     title: 'Batch 1',
//     key: 'batch1',
//     dataIndex: 'batch1',
//     width: 100,
//     render: batch1 => (
//       <>
//         {batch1 === 'yes' ? (
//           <span className="batchChecked">
//             <CheckOutlined />
//           </span>
//         ) : (
//           <span className="batchClosed">
//             <CloseOutlined />
//           </span>
//         )}
//       </>
//     ),
//   },
//   {
//     title: 'Batch 2',
//     key: 'batch2',
//     dataIndex: 'batch2',
//     width: 100,
//     render: batch2 => (
//       <>
//         {batch2 === 'yes' ? (
//           <span className="batchChecked">
//             <CheckOutlined />
//           </span>
//         ) : (
//           <span className="batchClosed">
//             <CloseOutlined />
//           </span>
//         )}
//       </>
//     ),
//   },
//   {
//     title: 'Batch 3',
//     key: 'batch3',
//     dataIndex: 'batch3',
//     width: 100,
//     render: batch3 => (
//       <>
//         {batch3 === 'yes' ? (
//           <span className="batchChecked">
//             <CheckOutlined />
//           </span>
//         ) : (
//           <span className="batchClosed">
//             <CloseOutlined />
//           </span>
//         )}
//       </>
//     ),
//   },
//   {
//     title: 'Batch 4',
//     key: 'batch4',
//     dataIndex: 'batch4',
//     width: 100,
//     render: batch4 => (
//       <>
//         {batch4 === 'yes' ? (
//           <span className="batchChecked">
//             <CheckOutlined />
//           </span>
//         ) : (
//           <span className="batchClosed">
//             <CloseOutlined />
//           </span>
//         )}
//       </>
//     ),
//   },
// ]

const onClickTag = (item) => {
    // console.log('item', item)
};

// const dataSource = [
//   {
//     key: '1',
//     functions: ['parameter1', 'material1'],
//     status: 'caution',
//     batch1: 'yes',
//     batch2: 'yes',
//     batch3: 'yes',
//     batch4: 'no',
//   },
//   {
//     key: '2',
//     functions: ['parameter2', 'material2'],
//     status: 'success',
//     batch1: 'yes',
//     batch2: 'yes',
//     batch3: 'yes',
//     batch4: 'no',
//   },
//   {
//     key: '3',
//     functions: ['parameter3'],
//     status: 'success',
//     batch1: 'yes',
//     batch2: 'yes',
//     batch3: 'yes',
//     batch4: 'no',
//   },
//   {
//     key: '4',
//     functions: ['parameter4', 'material4'],
//     status: 'success',
//     batch1: 'yes',
//     batch2: 'yes',
//     batch3: 'yes',
//     batch4: 'no',
//   },
// ]

function ViewSummary(props) {
    const {
        viewSummaryTable,
        setViewSummaryTable,
        parentBatches,
        setParentBatches,
        viewSummaryColumns,
        setViewSummaryColumns,
        newBatchData,
        setNewBatchData,
    } = props;

    const onChangeColumnsHandler = () => {
        let columns = [];
        // parentBatches.map((item, index) => {
        //     let obj = {
        //         title: `Batch ${++index}`,
        //         key: index,
        //         dataIndex: item,
        //         width: 100,
        //         render: value =>
        //             value ? (
        //                 <span className="batchChecked">
        //                     <CheckOutlined />
        //                 </span>
        //             ) : (
        //                 <span className="batchClosed">
        //                     <CloseOutlined />
        //                 </span>
        //             ),
        //     };
        //     columns.push(obj);
        // });
        Object.entries(newBatchData).map(([key, value], index) => {
            let obj = {
                title: `Batch ${++index}`,
                key: index,
                dataIndex: key,
                width: 100,
                render: (value) =>
                    value ? (
                        <span className='batchChecked'>
                            <CheckOutlined />
                        </span>
                    ) : (
                        <span className='batchClosed'>
                            <CloseOutlined />
                        </span>
                    ),
            };
            columns.push(obj);
        });

        if (viewSummaryColumns.length === 3) {
            let data = [...viewSummaryColumns, ...columns];
            setViewSummaryColumns(data);
        }
    };

    useEffect(() => {
        onChangeColumnsHandler();
    }, [newBatchData]);

    console.log('viewSummaryColumns', viewSummaryColumns);
    console.log('viewSummaryTable', viewSummaryTable);
    console.log('newBatchData', newBatchData);
    return (
        <div className='viewSummary-container'>
            <div className='viewSummary-FormBlock'>
                <Form.Item label='View ID' name='viewID'>
                    <Input placeholder='Enter View ID' disabled />
                </Form.Item>
                <Form.Item label='Name' name='name'>
                    <Input placeholder='Enter Name' />
                </Form.Item>
                <Form.Item label='Status' name='status'>
                    <Input placeholder='Status' disabled />
                </Form.Item>
                <Form.Item label='Version' name='version'>
                    <Input placeholder='Version' disabled />
                </Form.Item>
            </div>

            <div className='viewSummary-TableBlock'>
                <Table
                    className='viewSummary-table viewSummary-tablewidth'
                    pagination={false}
                    columns={viewSummaryColumns}
                    dataSource={viewSummaryTable}
                    scroll={{ x: 900 }}
                    rowKey={(record) => record.param}
                />
            </div>
        </div>
    );
}

export default ViewSummary;
