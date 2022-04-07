
import React from 'react';
import { Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
//cjson
//import cjson from './chartObj2.json';

const ChartSearchTable = (props) => {

    const columns = [
        {
            title: 'Name',
            key: 'chart_name',
            dataIndex: 'chart_name',
            
        },
        {
            title: 'Chart',
            key: 'chart_disp_id',
            dataIndex: 'chart_disp_id',
            width:'100px'
            
            
        },
        {
            title: 'Product Number',
            key: 'product_num',
            dataIndex: 'product_num',
           
        }
    ]

    return (
        <div style={props.style}>
            <Table
                bordered={false}
                columns={columns}
                dataSource={[]}
                pagination={false}
                scroll={{ y: 150 ,x:350}}
                rowKey='key'
                // onRow={(record) => ({
                //     onClick: () => {
                //         let tempVersionList = [0];
                //         searchViewData.current.forEach((ele) => {
                //             if (ele.view_disp_id === record.view_disp_id) {
                //                 tempVersionList.push(ele.view_version);
                //                 tempVersionList = tempVersionList.sort((a, b) => a - b);
                //                 setVersionList(tempVersionList);
                //             }
                //         })
                //         setViewData({ ...viewData, viewName: record.view_name, viewDispId: record.view_disp_id, status: record.view_status, searchValue: record.view_disp_id, chartVersion: record.view_version });
                //         let newArr = [...postChartData.data];
                //         newArr.forEach((ele) => {
                //             ele.view_id = record.view_disp_id,
                //                 ele.view_name = record.view_name
                //         })
                //         setPostChartData({ ...postChartData, data: newArr })
                //         setViewSearch(false);
                //         setData();
                //     },
                // })}
            />
        </div>
    )
}

export default ChartSearchTable;