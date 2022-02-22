import React, { useEffect, useState } from 'react';
import {
    Button,
    Input,
    Select,
    Typography,
    Modal,
    Table,
} from 'antd';
import {
    BuildTwoTone
} from '@ant-design/icons';
import './styles.scss';


const { Option } = Select;
const { Text } = Typography;


const columns = [
    {
        title: 'Product Num',
        dataIndex: 'product_num',
        key: 'name',
    },
    {
        title: 'View ID',
        dataIndex: 'view_disp_id',
        key: 'view_disp_id',
    },
    {
        title: 'View Name',
        dataIndex: 'view_name',
        key: 'view_name',
    },
    {
        title: 'Created By',
        dataIndex: 'created_by',
        key: 'created_by',
    },
];
function ReportDesignerForm(props) {
      
    const { viewId, setViewId,  viewList, setViewList, status, setStatus, isLoad, reportName, setReportName } = props;

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterTable, setFilterTable] = useState(null);
    const [viewListviewListForm,setViewListForm]=useState(viewList);
    // eslint-disable-next-line react/prop-types
    
    const search = (value) => {
        console.log(value);
        const tableData = viewList;
        const filterTable = tableData.filter((o) =>
            Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilterTable(filterTable);
    };
    
    
    console.log('viewList',viewList);
    console.log('isLoad',isLoad);


    return (
        <div className="reportDesigner-grid bg-white" >
            <div className="reportDesigner-block-left bg-white" >
                <Text className="filter-text" > Report ID  </Text>
                <Text className="filter-text" >Report Name</Text>
                <Text className="filter-text">View</Text>
                <Text className="filter-text">Status</Text>
                <Input className="filter-button" value="123456" disabled />
                <Input className="filter-button" value={reportName} disabled={isLoad} onChange={(e)=>setReportName(e.target.value)}  />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <Select className="filter-button" defaultValue={viewId} onChange={(e, value) => {
                        return setViewId(value);
                    }}
                    value={viewId}
                    disabled={isLoad}
                    >
                        {/* <Option value="{item.view_disp_id}">hello</Option> */}

                    </Select>
                    <Button style={{width:'40px'}} onClick={() => setVisible(true)}><BuildTwoTone style={{marginRight:'5px'}} twoToneColor="#093185"  /></Button>
                </div>
                <Input className="filter-button" value={status} disabled={isLoad} />
            </div>
            <Modal
                title={<span>Select View  <Input.Search
                    className='table-search'
                    placeholder='Search by...'
                    enterButton
                    onSearch={search}
                    style={{marginBottom:'40px'}}
                /></span>}
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                bodyStyle={{height: 400}}
            >    
                <Table
                    dataSource={filterTable === null ? viewList : filterTable}
                    columns={columns}
                    pagination={false}
                    onRow={record => ({
                        onClick: e => {
                            setViewId(record.view_disp_id);
                            setStatus(record.view_status);                        }
                    })}
                    scroll={{y:200}}
                    style={{ height: '200px' }}
                    loading={loading}
                />
            </Modal>
        </div>
    );
}

export default ReportDesignerForm;
