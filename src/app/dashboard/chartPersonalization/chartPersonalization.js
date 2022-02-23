import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChartDataTable from './components/ChartDataTable/index';
import ChartDetails from './components/ChartDetails';
import ChartFilter from './components/ChartFilter/index';
import ChartType from './components/ChartType/index';
import ChartView from './components/ChartView/index';
import './ChartStyle.scss';
import Personalization from './components/Personalization/components/Personalization';

import {
  ArrowLeftOutlined,
  CheckCircleTwoTone,
  FileDoneOutlined,
  InfoCircleTwoTone,
  Loading3QuartersOutlined,
  PlusOutlined,
  SaveOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';

import chartObj from './get_chart.json';
import ViewTable from '../../../components/ViewTable';
import { getViewTable } from '../../../services/commonService';

function ChartPersonalization() {
  const [chartDetails, setChartdetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isSaveAs, setIsSaveAs] = useState(false);
  const [isDiscard, setIsDiscard] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showChartType, setShowChartType] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartObjData, setChartObjData] = useState(chartObj);
  const [viewTableData, setviewTableData] = useState([]);
  const [isModal, setisModal] = useState(true);

  const filterData = useSelector((state) => state.chartPersReducer);
  console.log('filter dataaa', filterData);

  useEffect(() => {
    getViewTableData();
  }, []);

  function handleOk() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setIsShare(false);
      setIsLoad(false);
      setIsNew(false);
      setIsSave(false);
      setIsSaveAs(false);
      setIsDiscard(false);
    }, 3000);
  }

  function handleCancel() {
    setVisible(false);
    setIsShare(false);
    setIsLoad(false);
    setIsNew(false);
    setIsSave(false);
    setIsSaveAs(false);
    setIsDiscard(false);
  }

  function handleTitleChange() {
    if (isDiscard)
      return (
        <span>
          <InfoCircleTwoTone
            twoToneColor='orange'
            style={{ fontSize: '20px', margin: '10px' }}
          />{' '}
          Discard Changes
        </span>
      );
    if (isSave) return <span>Congratulations</span>;
    // if (isLoad)
    //   return (
    //     <span>
    //       <InfoCircleTwoTone
    //         twoToneColor='orange'
    //         style={{ fontSize: '20px', margin: '10px' }}
    //       />{' '}
    //       Load
    //     </span>
    //   );
    if (isNew)
      return (
        <span>
          <InfoCircleTwoTone
            twoToneColor='orange'
            style={{ fontSize: '20px', margin: '10px' }}
          />{' '}
          Unsaved Changes
        </span>
      );
    if (isShare)
      return (
        <span>
          <ShareAltOutlined twoToneColor='Green' /> Share
        </span>
      );
  }

  function callbackViewType(param) {
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  }

  const handleSaveAs = () => {
    const chartData = chartObj;
    chartData.data_filter.site = filterData.site;
    chartData.data_filter.unapproved_data = filterData.unApprovedData;
    chartData.data_filter.date_range = filterData.dateRange;
    chartData.view_id = filterData.selectedView.view_disp_id;
    chartData.view_name = filterData.selectedView.view_name;
    chartData.view_status = filterData.selectedView.view_status;
    chartData.view_version = filterData.selectedView.view_version;
    console.log('chartData', chartData);
  };

  const handleCloseViewModal = () => {
    setisModal(false);
    setIsLoad(false);
  };
  /* eslint-disable-no-undeaf  */
  const getViewTableData = () => {
    let reqView = { vew_status: 'APRD' };
    let antdDataTable = [];

    getViewTable(reqView).then((res) => {
      res.Data.forEach((item, key) => {
        let antdObj = {};
        antdObj['key'] = key;
        antdObj['created_by'] = item.created_by;
        antdObj['created_on'] = item.created_on;
        antdObj['product_num'] = item.product_num;
        antdObj['view_disp_id'] = item.view_disp_id;
        antdObj['view_info'] = item.view_info;
        antdObj['view_name'] = item.view_name;
        antdObj['view_status'] = item.view_status;
        antdObj['view_version'] = item.view_version;
        antdDataTable.push(antdObj);
      });
      console.log('antdDataTable', antdDataTable);

      setviewTableData(antdDataTable);

      // else if (
      //     res.data.status - code === 400 ||
      //     res.data.status - code === 401
      // ) {
      //     dispatch(
      //         showNotification(
      //             'error',
      //             'Chart Type Error - ' + res.data.message
      //         )
      //     );
      // }
    });
  };

  return (
    <div className='chart-wrapper'>
      <div className='sub-header'>
        <h1 className='sub-header-title'>
          <ArrowLeftOutlined /> Chart Personalization
        </h1>

        <div className='sub-header-btns'>
          <Button
            className='custom-primary-btn  '
            onClick={() => {
              setVisible(true);
              setIsNew(true);
            }}
            type='primary'
          >
            <PlusOutlined /> New
          </Button>
          <Button
            className='custom-primary-btn  '
            onClick={() => {
              // setVisible(true);
              // setIsNew(true);
              setIsLoad(true);
            }}
            type='primary'
          >
            <Loading3QuartersOutlined /> Load
          </Button>
          <Button
            className='custom-primary-btn'
            onClick={() => {
              setVisible(true);
              setIsNew(true);
            }}
            type='primary'
          >
            <SaveOutlined /> Save
          </Button>
          <Button
            className='custom-primary-btn'
            onClick={handleSaveAs}
            type='primary'
          >
            <FileDoneOutlined /> Save As
          </Button>
          <Button
            className='custom-primary-btn'
            onClick={() => {
              setVisible(true);
              setIsNew(true);
            }}
            type='primary'
          >
            <ShareAltOutlined /> Share
          </Button>
        </div>
      </div>
      <div className='chart-block'>
        <div className='chart-left-panel'>
          <div style={{ marginBottom: '10px' }}>
            <ChartView
              callbackViewType={callbackViewType}
              chartObj={chartObjData}
            />
          </div>
          {showFilter && (
            <div style={{ marginBottom: '10px' }}>
              <ChartFilter chartObj={chartObjData} />
            </div>
          )}
          {showChartType && (
            <div>
              <ChartType chartObj={chartObjData} />
            </div>
          )}
        </div>
        {showChart && (
          <div className='chart-center-panel'>
            <ChartDetails chartObj={chartObjData} />
            <ChartDataTable />
          </div>
        )}
        {showCustomization && (
          <div className='chart-right-panel'>
            <Personalization />
          </div>
        )}
      </div>
      <ViewTable
        isModal={isLoad}
        data={viewTableData}
        handleCloseModal={handleCloseViewModal}
      />
      <div className='modalPopup'>
        <Modal
          visible={visible}
          title={handleTitleChange}
          width={500}
          mask={true}
          onCancel={handleCancel}
          centered={true}
          footer={null}
        >
          {/* {isLoad && (
            <div>
              <p>
                You Have made some changes <br /> Do you want to save or discard
                them ?
              </p>

              <div className='loadButton'>
                <Button className='loadButtons' style={{ width: '80px' }}>
                  Save As
                </Button>
                <Button
                  style={{ width: '80px' }}
                  className='loadButtons'
                  onClick={() => {
                    setVisible(false);
                    setIsSave(true);
                    setIsLoad(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  style={{ width: '80px' }}
                  className='loadButtons'
                  onClick={() => {
                    setVisible(false);
                    setIsSave(true);
                    setIsLoad(false);
                  }}
                >
                  Discard
                </Button>
              </div>
            </div>
          )} */}
          {/* {isSave && (
                        <div>
                            <center>
                                <CheckCircleTwoTone
                                    className='circleIcon'
                                    twoToneColor='Green'
                                />
                                <br />
                                <p>
                                    {' '}
                                    Chart ID : 12345 <br /> Your Changes Have
                                    Been Successfully Saved
                                </p>
                            </center>

                            <div>
                                <Button className='saveOkBtn'>OK</Button>
                            </div>
                        </div>
                    )}

                    {isShare && (
                        <div>
                            <div>
                                <div className='shareButton'>
                                    <Text>Edit</Text>
                                    <Text>View</Text>
                                </div>
                            </div>
                            <div>
                                <div className='shareButton'>
                                    <Input width='30' />
                                    <Input />
                                </div>
                            </div>
                            <div>
                                <Button className='shareOkBtn'>OK</Button>
                            </div>
                        </div>
                    )}
                    {isLoad && (
                        <div>
                            <ViewTable />
                            <p>
                                You Have made some changes <br /> Do you want to
                                save or discard them ?
                            </p>

                            <div className='loadButton'>
                                <Button
                                    className='loadButtons'
                                    style={{ width: '80px' }}
                                >
                                    Save As
                                </Button>
                                <Button
                                    style={{ width: '80px' }}
                                    className='loadButtons'
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ width: '80px' }}
                                    className='loadButtons'
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Discard
                                </Button>
                            </div>
                        </div>
                    )}
                    {isNew && (
                        <div>
                            <p>
                                You Have made some changes <br /> Do you want to
                                save or discard them ?
                            </p>
                            <div className='loadButton'>
                                <Button className='custom-primary-btn  '>
                                    Save As
                                </Button>
                                <Button
                                    className='custom-primary-btn  '
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    className='custom-primary-btn  '
                                    onClick={() => {
                                        setVisible(true);
                                        setIsSave(true);
                                        setIsLoad(false);
                                    }}
                                >
                                    Discard
                                </Button>
                            </div>
                        </div>
                    )}
                    {isDiscard && (
                        <div>
                            <p>Are you sure you want to discard changes ?</p>
                            <div className='discardButton'>
                                <Button className='custom-primary-btn  '>
                                    Ok
                                </Button>
                                <Button className='custom-primary-btn  '>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )} */}
        </Modal>
      </div>
    </div>
  );
}

export default ChartPersonalization;
