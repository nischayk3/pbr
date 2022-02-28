import './ChartStyle.scss';

import {
  ArrowLeftOutlined,
  CheckCircleTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getChartList,
  getChartObj,
  putChartObj,
  viewBatchData,
} from '../../../services/chartPersonalizationService';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../duck/actions/commonActions';
import {
  sendBatchCoverage,
  sendChartData,
} from '../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import BatchJson from '../chartPersonalization/components/ChartView/batch.json';
import ChartDataTable from './components/ChartDataTable/index';
import ChartDetails from './components/ChartDetails';
import ChartFilter from './components/ChartFilter/index';
import ChartTable from '../../../components/ChartTable';
import ChartType from './components/ChartType/index';
import ChartView from './components/ChartView/index';
import LoadModal from '../../../components/LoadModal';
import Personalization from './components/Personalization/components/Personalization';
import ViewTable from '../../../components/ViewTable';
import chartObj from './get_chart.json';
import { getViewTable } from '../../../services/commonService';

function ChartPersonalization() {
  const [chartDetails, setChartdetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isSaveAs, setIsSaveAs] = useState(false);
  const [isDiscard, setIsDiscard] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showChartType, setShowChartType] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [chartObjData, setChartObjData] = useState([]);
  const [chartResObj, setchartResObj] = useState([]);
  const [showBatch, setshowBatch] = useState(false);

  const [viewTableData, setviewTableData] = useState([]);
  const [batchCoverage, setbatchCoverage] = useState();
  const [batchData, setbatchData] = useState({});
  const [resChartId, setresChartId] = useState('');
  const [resChartVersion, setresChartVersion] = useState('');
  const [chartTypeList, setchartTypeList] = useState([]);
  const [isChart, setIsChart] = useState(false);

  const chartPersReducer = useSelector((state) => state.chartPersReducer);
  const chartDataReducer = useSelector((state) => state.chartDataReducer);
  const chartViewReducer = useSelector((state) => state.chartViewReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getViewTableData();
    getChartListSer();
  }, []);

  function handleCancel() {
    setVisible(false);

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
  }

  const destroyState = () => {
    dispatch(sendChartData({}));
    dispatch(sendBatchCoverage({}));
  };

  const callbackViewType = (param) => {
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
    let paramSplit = param ? param.split('-') : '';
    viewParamData(paramSplit[0], paramSplit[1], '', '', '');
  };

  const handleSaveAs = () => {
    let putChartSaveAs = {
      data: [
        {
          chart_id: '',
          chart_name: chartDataReducer.chartName,
          chart_description: chartDataReducer.chartDesc,
          chart_version: '',
          chart_status: 'NEW',
          view_id: chartViewReducer.viewId,
          view_name: chartViewReducer.viewName,
          data_filter: {
            date_range: chartPersReducer.dateRange,
            unapproved_data: chartPersReducer.unApprovedData,
            site: chartPersReducer.site,
          },
          chart_type: chartDataReducer.chartType,
          chart_mapping: chartDataReducer.chartMapping,
          data: chartDataReducer.data,
          layout: chartDataReducer.layout,
          exclusions: [],
          violations: [],
          limits: {},
          alerts: [],
        },
      ],
      savetype: 'saveas',
    };
    putChartObjData(putChartSaveAs);
    console.log('putChartSaveAs', putChartSaveAs);
  };

  const handleSave = () => {
    let putChart = {
      data: [
        {
          chart_id: chartDataReducer.chartId,
          chart_name: chartDataReducer.chartName,
          chart_description: chartDataReducer.chartDesc,
          chart_version: chartDataReducer.chartVersion,
          chart_status: 'DRFT',
          view_id: chartViewReducer.viewId,
          view_name: chartViewReducer.viewName,
          data_filter: {
            date_range: chartPersReducer.dateRange,
            unapproved_data: chartPersReducer.unApprovedData,
            site: chartPersReducer.site,
          },
          chart_type: chartDataReducer.chartType,
          chart_mapping: chartDataReducer.chartMapping,
          data: chartDataReducer.data,
          layout: chartDataReducer.layout,
          exclusions: [],
          violations: [],
          limits: {},
          alerts: [],
        },
      ],
      savetype: 'save',
    };
    // putChartObjData(putChart);
    console.log('putcharttttt save ', putChart);
  };

  const handleCloseViewModal = () => {
    setIsView(false);
  };

  const handleCloseChartModal = (chart_id, chart_ver) => {
    setIsLoad(false);
    setIsChart(false);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);

    let reqChartObj = { chartId: chart_id, version: chart_ver };
    getChrtObjData(reqChartObj);
  };

  const handleCloseLoadModal = (chart_id, chart_ver) => {
    setIsLoad(false);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);

    let reqChartObj = { chartId: chart_id, version: chart_ver };
    getChrtObjData(reqChartObj);
  };

  const callbackIsLoad = () => {
    setIsView(true);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

  const openLoadModal = () => {
    setIsChart(true);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

  const callFilterAPI = (site, dateRange, isUnApproved) => {
    let viewDisplayId =
      chartViewReducer.viewId !== '' ? chartViewReducer.viewId : '';
    let viewVersionId =
      chartViewReducer.viewVersion !== '' ? chartViewReducer.viewVersion : '';
    viewParamData(viewDisplayId, viewVersionId, site, dateRange, isUnApproved);
  };

  const getChartListSer = async () => {
    let reqChartList = { chart_status: 'ALL' };
    try {
      dispatch(showLoader());
      const chartListRes = await getChartList(reqChartList);
      if (chartListRes.statuscode === 200) {
        setchartTypeList(chartListRes.data);
        dispatch(hideLoader());
      }
    } catch (err) {
      dispatch(hideLoader());
      dispatch(showNotification('error', err.message));
    }
  };

  const getViewTableData = async () => {
    let reqView = { vew_status: 'APRD' };
    let antdDataTable = [];

    try {
      dispatch(showLoader());
      const viewRes = await getViewTable(reqView);
      viewRes.Data.forEach((item, key) => {
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
        antdObj['view'] = item.view;
        antdDataTable.push(antdObj);
      });

      setviewTableData(antdDataTable);

      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.message));
    }
  };

  const getChrtObjData = async (reqChartObj) => {
    try {
      dispatch(showLoader());
      const chartRes = await getChartObj(reqChartObj);
      if (chartRes.statuscode === 200) {
        let chartResData =
          chartRes.data && chartRes.data.length > 0 ? chartRes.data[0][0] : [];
        setchartResObj(chartResData);
        dispatch(sendChartData(chartResData));
        console.log('chartResData', chartResData);
      }
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', 'Chart Data Error - ', error));
    }
  };

  const putChartObjData = async (reqChart) => {
    try {
      dispatch(showLoader());
      const putChart = await putChartObj(reqChart);
      if (putChart.statuscode === 200) {
        setVisible(true);
        setIsSave(true);
        setresChartId(putChart.chart_id);
        setresChartVersion(putChart.chart_version);
      }
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.message));
    }
  };

  async function viewParamData(
    viewDisId,
    viewVer,
    site,
    dateRange,
    isUnApproved
  ) {
    let reqViewParam = {
      view_disp_id: viewDisId ? `'${viewDisId}'` : '',
      view_version: viewVer ? viewVer : '',
      site: site ? site : '',
      date: dateRange ? dateRange : '',
      unapproved_data: isUnApproved ? isUnApproved : false,
    };
    try {
      dispatch(showLoader());
      const viewData = await viewBatchData(reqViewParam);

      if (viewData.statuscode === 200) {
        let batchRes = viewData && viewData.data ? viewData.data : {};
        setbatchData(batchRes);
        dispatch(sendBatchCoverage(batchRes));
      }

      dispatch(hideLoader());
    } catch (error) {
      setbatchData({});
      dispatch(hideLoader());
      dispatch(showNotification('error', 'Parameter Data Error - '));
    }
  }

  return (
    <div className='custom-wrapper'>
      <div className='sub-header'>
        <div className='sub-header-title'>
          <ArrowLeftOutlined className='header-icon' />
          <span className='header-title'>Chart Personalization</span>
        </div>

        <div className='sub-header-btns'>
          <Button
            className='custom-primary-btn  '
            onClick={() => {
              // setVisible(true);
              setIsNew(true);
              setShowChart(true);
              setShowChartType(true);
              setShowFilter(true);
              setShowCustomization(true);
              setshowBatch(true);
              destroyState();
            }}
            type='primary'
          >
            New
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
            Load
          </Button>
          <Button
            className='custom-primary-btn'
            onClick={handleSave}
            type='primary'
          >
            Save
          </Button>
          <Button
            className='custom-primary-btn'
            onClick={handleSaveAs}
            type='primary'
          >
            Save As
          </Button>

          <Button className='custom-secondary-btn' type='primary'>
            Publish
          </Button>
        </div>
      </div>
      <div className='custom-content-layout'>
        <div className='chart-block'>
          <div className='chart-left-panel'>
            <div style={{ marginBottom: '24px' }}>
              <ChartView
                // callbackViewType={callbackViewType}
                callbackViewTable={callbackIsLoad}
                callbackViewData={callbackViewType}
                viewTableData={viewTableData}
                batchCoverageData={batchData}
                isNew={isNew}
                showBatch={showBatch}
              />
            </div>
            {showFilter && (
              <div style={{ marginBottom: '24px' }}>
                <ChartFilter applyDateFilter={callFilterAPI} />
              </div>
            )}
            {showChartType && (
              <div>
                <ChartType />
              </div>
            )}
          </div>
          {showChart && (
            <div className='chart-center-panel'>
              <ChartDetails />
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
          isModal={isView}
          data={viewTableData}
          handleCloseModal={handleCloseViewModal}
        />

        <ChartTable
          isModal={isChart}
          data={chartTypeList}
          handleCloseModal={handleCloseChartModal}
        />

        <LoadModal
          isModal={isLoad}
          data={chartTypeList}
          callbackLoadModal={openLoadModal}
          handleCloseModal={handleCloseLoadModal}
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
            {isSave && (
              <div>
                <center>
                  <CheckCircleTwoTone
                    className='circleIcon'
                    twoToneColor='Green'
                  />
                  <br />
                  <p>
                    Chart ID : {resChartId ? resChartId : ''} <br />
                    Chart Version : {resChartVersion ? resChartVersion : ''}
                    <br />
                    Your Changes Have Been Successfully Saved
                  </p>
                </center>

                <div>
                  <Button
                    onClick={() => {
                      setVisible(false);
                      setIsSave(false);
                      destroyState();
                    }}
                    className='saveOkBtn'
                  >
                    OK
                  </Button>
                </div>
              </div>
            )}

            {isLoad && (
              <div>
                <ViewTable />
                <p>
                  You Have made some changes <br /> Do you want to save or
                  discard them ?
                </p>

                <div className='loadButton'>
                  <Button className='loadButtons' style={{ width: '80px' }}>
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
                  You Have made some changes <br /> Do you want to save or
                  discard them ?
                </p>
                <div className='loadButton'>
                  <Button className='custom-primary-btn  '>Save As</Button>
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
                  <Button className='custom-primary-btn  '>Ok</Button>
                  <Button className='custom-primary-btn  '>Cancel</Button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ChartPersonalization;
