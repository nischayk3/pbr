import React,{useEffect,useState} from 'react';
import { useDispatch } from 'react-redux';
import {Table} from 'antd';
import { getDataQualityData } from '../../../../../services/workSpaceServices';
import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../../duck/actions/commonActions';
import './styles.scss';

const DeviationTable=()=> {
    const [dataSource, setDataSource] = useState([]);
    const dispatch = useDispatch();
    const columns=[
        {
            title: 'Display ID',
            key: 'view_disp_id',
            dataIndex: 'view_disp_id'
        },
        {
            title: 'View Name',
            key: 'view_name',
            dataIndex: 'view_name',          
        },
        {
            title: 'Version',
            key: 'view_version',
            dataIndex: 'view_version',    
        },
        {
            title: 'Product Name',
            key: 'product_descr',
            dataIndex: 'product_descr',    
        }
    ]
    
    useEffect(()=>{
        dataQualityTableData();
    },[])

    const dataQualityTableData=async()=>{
        let req={limit:5}
        try {
            dispatch(showLoader());
            const tableResponse = await getDataQualityData(req);
            if (tableResponse['status-code'] === 200) {
                setDataSource(tableResponse.Data);
                dispatch(hideLoader());
            }
            else if (tableResponse['status-code'] === 404) {
                setDataSource(tableResponse.Data);
                dispatch(hideLoader());
                dispatch(showNotification('error', tableResponse.Message));
            }

        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error.Message));
        }
    }
    return (
        <div className='data-quality-main'>
            <Table
                className='data-quality-table'
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                style={{ border: '1px solid #ececec', borderRadius: '2px' }}
            />
        </div>
    )
}

export default DeviationTable;