import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Table, Input, Space, Avatar,Row, Col } from 'antd';
import illustrations from '../../../../assets/images/Group 33808.svg';
import DeviationTable from './deviationTable/deviationTable';
import { BellOutlined, LayoutOutlined } from '@ant-design/icons';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import { getCountData } from '../../../../services/workFlowServices';
import './styles.scss';
const { Search } = Input;
const Workspace = () => {

  const [resultDate, setResultDate] = useState('');
  const [tilesData, setTilesData] = useState([]);
  const dispatch=useDispatch();

  useEffect(() => {
    updateDate();
    getTilesData();
  }, []);

  const updateDate = () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const latestDate = date.getDate();
    const year = date.getFullYear();
    const resultDate = month + ' ' + latestDate + ',' + ' ' + year
    setResultDate(resultDate);
  }
  
  const getTilesData = async () => {
    let req = {};
    try {
        dispatch(showLoader());
        const tilesResponse = await getCountData(req);
        setTilesData(tilesResponse['Data']);
        dispatch(hideLoader());
    } catch (error) {
        dispatch(hideLoader());
        dispatch(showNotification('error', error.message));
    }
}
  return (
    <div className='custom-wrapper'>
      <div className='workspace-subheader'>
        <Search
          placeholder="Search"
          allowClear
          //onSearch={ }
          style={{ width: 304 }}
        />
        <BellOutlined style={{ margin: '0px 25px' }} />
        <div>
          <Avatar style={{ backgroundColor: 'orange' }}>{(localStorage.getItem('user')).split("")[0].toUpperCase()} </Avatar>
          <span style={{ padding: '0px 10px' }}>{(localStorage.getItem('user'))}</span>
        </div>

      </div>
      <div className='custom-content-layout'>
        <Card className='workspace_head'>
          <div>
            <p className='workspace-username'>Howdy {(localStorage.getItem('user'))}! Good Morning</p>
            <p className='workspace-text'>Let's see what you have on your plate today!</p>
          </div>
          <img src={illustrations} className='workspace-illustration' />
          <span className='workspace-resultdate'>{resultDate}</span>

        </Card>
        <div className='workspace-wrapper'>
          <div className='workspace-main-block'>
            <div className='workspace-innerColumn'>
              <div className='workspace-card1'>
                <div className='innercard'>
                  <LayoutOutlined />
                  <span className='deviation-text'> Workflow Approvals</span>
                  <Row gutter={4}>
                  {tilesData.map((item, index) => {
                    return(
                      <Col className="gutter-row" span={6}>
                      {item.item_count>0&&(
                      <div style={{marginTop:'15px'}}>
                      <p className='approval-text'>{item.text.split(" ")[0]}</p>
                      <p className='approval-count'>{item.item_count}</p>
                      </div>
                      )}
                    </Col>
                    )
                    
                  })}
                  </Row>
                </div>
              </div>
              <div className='workspace-card2'><Card >Hello</Card></div>
            </div>
            <div className='workspace-chart'>
              <Card>
                Hello
              </Card>
            </div>

          </div>

          <div className='workspace-outerColumn'>
            <div className='workspace-table1'>
              <div className='innercard'>
                <LayoutOutlined />
                <span className='deviation-text'> Recent Deviations</span>
                <DeviationTable />
              </div>

            </div>
            <div className='workspace-table2'>
              <Card >Hello</Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}


export default Workspace;