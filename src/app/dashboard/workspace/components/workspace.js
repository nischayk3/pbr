import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Card, Table, Input, Space, Avatar, Row, Col } from 'antd';
import illustrations from '../../../../assets/images/Group 33808.svg';
import DeviationTable from './deviationTable/deviationTable';
import DataQuality from './dataQuality/dataQuality';
import { BellOutlined, LayoutOutlined, ArrowRightOutlined } from '@ant-design/icons';
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
  const dispatch = useDispatch();
  const history = useHistory();

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
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <img src={illustrations} className='workspace-illustration' />
          </div>
          <div>
            <span className='workspace-resultdate'>{resultDate}</span>
          </div>

        </Card>
        <div className='workspace-wrapper'>
          <div className='workspace-main-block'>
            <div className='workspace-innerColumn'>
              <div className='workspace-card1'>
                <div className='innercard'>
                  <LayoutOutlined style={{ color: '#0CE7CC', fontSize: '15px' }} />
                  <span className='deviation-text'> Workflow Approvals</span>
                  <span style={{ float: 'right' }}>
                    <ArrowRightOutlined style={{ color: '#0CE7CC', fontSize: '15px' }} />
                    <a className='workspace-review' onClick={() => history.push('/dashboard/workflow')}>Review</a>
                  </span>

                  <Row gutter={4}>
                    {tilesData.map((item, index) => {
                      return (
                        <Col className="gutter-row" span={4}>
                          {item.item_count > 0 && (
                            <div style={{ marginTop: '15px' }} key={index}>
                              <p className='approval-text'>{item.text.split(" ")[0]}</p>
                              <p className='approval-count'>{item.item_count}</p>
                            </div>
                          )}
                        </Col>
                      )

                    })}
                  </Row>
                </div>
                <div>
                  <p>5 People awaiting your approval!</p>
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                      color: '#f56a00',
                      backgroundColor: '#fde3cf',
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: '#f56a00',
                      }}
                    >
                      V
                    </Avatar>
                  </Avatar.Group>
                </div>
              </div>
              <div className='workspace-card2'>
                <div className='innercard'>
                  <LayoutOutlined style={{ color: '#0CE7CC', fontSize: '15px' }} />
                  <span className='deviation-text'>Paper Batch Records</span>
                  <span style={{ float: 'right' }}>
                    <ArrowRightOutlined style={{ color: '#0CE7CC', fontSize: '15px' }} />
                    <a onClick={() => console.log('PBR')} className='workspace-review'>View All</a>
                  </span>
                  <div className='paper-batch-card'>
                    <p className='paper-batch-count'>5</p>
                    <p className='paper-batch-desc'>New paper batch records are awaiting your approval!</p>
                  </div>
                </div>

              </div>
            </div>
            <div className='workspace-chart'>
              <div className='innercard'>
                <LayoutOutlined style={{ color: '#0CE7CC', fontSize: '15px' }} />
                <span className='deviation-text'>Process Control Charts</span>
              </div>
            </div>

          </div>

          <div className='workspace-outerColumn'>
            <div className='workspace-table1'>
              <div className='innercard'>
                <LayoutOutlined style={{ color: '#0CE7CC', fontSize: '15px' }} />
                <span className='deviation-text'> Recent Deviations</span>
                <DeviationTable />
              </div>

            </div>
            <div className='workspace-table2'>
              <div className='innercard'>
                <LayoutOutlined style={{ color: '#0CE7CC', fontSize: '15px' }} />
                <span className='deviation-text'> Data Quality</span>
                <DataQuality />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}


export default Workspace;