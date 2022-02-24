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
  InfoCircleTwoTone,
  ShareAltOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';

import chartObj from './get_chart.json';
import ViewTable from '../../../components/ViewTable';
import { getViewTable } from '../../../services/commonService';
import {
  getChartObj,
  putChartObj,
  viewBatchData,
} from '../../../services/chartPersonalizationService';
import LoadModal from '../../../components/LoadModal';
import BatchJson from '../chartPersonalization/components/ChartView/batch.json';

function ChartPersonalization() {
  const [chartDetails, setChartdetails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isShare, setIsShare] = useState(false);
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
  const [chartObjData, setChartObjData] = useState(chartObj);
  const [viewTableData, setviewTableData] = useState([]);
  const [batchCoverage, setbatchCoverage] = useState();
  const [batchData, setbatchData] = useState(BatchJson);
  const [resChartId, setresChartId] = useState('');

  const filterData = useSelector((state) => state.chartPersReducer);
  console.log('filter dataaa', filterData);

  useEffect(() => {
    getViewTableData();
    viewParamData();
  }, []);

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

  const callbackViewType = (param) => {
    console.log('param..', param);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

  const handleSaveAs = () => {
    const chartData = chartObj;
    let putChartSaveAs = {
      data: [
        {
          view_id: filterData.viewId,
          view_name: filterData.viewName,
          data_filter: {
            date_range: filterData.dateRange,
            unapproved_data: filterData.unApprovedData,
            site: filterData.site,
          },
          chart_name: filterData.chartName,
          chart_description: filterData.chartDesc,
          //      chart_version: filterData.chart_version,
          // chart_status: filterData.chart_status,
          chart_type: filterData.chartType,
        },
      ],
      savetype: 'saveas',
    };
    //  putChartObjData(putChart);
    console.log('chartData', chartData);
  };

  const handleSave = () => {
    let putChart = {
      data: [
        {
          view_id: filterData.viewId,
          view_name: filterData.viewName,
          data_filter: {
            date_range: filterData.dateRange,
            unapproved_data: filterData.unApprovedData,
            site: filterData.site,
          },
          chart_name: filterData.chartName,
          chart_description: filterData.chartDesc,
          chart_version: '',
          chart_id: '',
          chart_status: 'draft',
          chart_type: filterData.chartType,
          chart_mapping: {},
          data: [],
          layout: {},
          exclusions: [],
          violations: [],
          limits: {},
          alerts: [],
        },
      ],
      savetype: 'save',
    };
    putChartObjData(putChart);
    console.log('putcharttttt save ', putChart);
  };

  const handleCloseViewModal = () => {
    setIsLoad(false);
    setIsView(false);
  };

  const handleCloseLoadModal = () => {
    setIsLoad(false);
  };

  function callbackIsLoad() {
    setIsView(true);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  }

  const openLoadModal = () => {
    setIsView(true);
    setShowChart(true);
    setShowChartType(true);
    setShowFilter(true);
    setShowCustomization(true);
  };

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
        antdObj['view'] = item.view;
        antdDataTable.push(antdObj);
      });
      console.log('antdDataTable', antdDataTable);

      setviewTableData(antdDataTable);
    });
  };

  // const getChrtObjData = () => {
  //   let reqChartObj = { chartId: 'C1', version: '10' };
  //   getChartObj();
  // };

  const putChartObjData = (reqChart) => {
    putChartObj(reqChart).then((res) => {
      console.log('res.chart_id', res.chart_id);
      if (res.statuscode === 200) {
        setVisible(true);
        setIsSave(true);
        setresChartId(res.chart_id);
      }
    });
  };

  const viewParamData = () => {
    let reqViewParam = {
      view_disp_id: "'V23'",
      view_version: '1',
      site: '1255',
      date: '2019-01-01T13:00:00Z/2022-12-31T15:30:00Z',
      unapproved_data: 'True',
    };
    console.log('reqViewParam', reqViewParam);
    viewBatchData(reqViewParam).then((res) => {
      console.log('ressssss view batche', res);
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
              // setVisible(true);
              setIsNew(true);
              setShowChart(true);
              setShowChartType(true);
              setShowFilter(true);
              setShowCustomization(true);
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
          <Button
            className='custom-primary-btn'
            onClick={() => {
              setVisible(true);
              setIsNew(true);
            }}
            type='primary'
          >
            Share
          </Button>
        </div>
      </div>

      <div className='chart-block'>
        <div className='chart-left-panel'>
          <div style={{ marginBottom: '10px' }}>
            <ChartView
              // callbackViewType={callbackViewType}
              callbackViewTable={callbackIsLoad}
              callbackViewData={callbackViewType}
              chartObj={chartObjData}
              viewTableData={viewTableData}
              batchCoverageData={batchData}
              isNew={isNew}
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
        isModal={isView}
        data={viewTableData}
        handleCloseModal={handleCloseViewModal}
      />
      <LoadModal
        isModal={isLoad}
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
                  Chart ID : {resChartId ? resChartId : ''} <br /> Your Changes
                  Have Been Successfully Saved
                </p>
              </center>

              <div>
                <Button
                  onClick={() => {
                    setVisible(false);
                    setIsSave(false);
                  }}
                  className='saveOkBtn'
                >
                  OK
                </Button>
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
                <Button
                  onClick={() => {
                    setVisible(false);
                    setIsSave(false);
                  }}
                  className='shareOkBtn'
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
                You Have made some changes <br /> Do you want to save or discard
                them ?
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
  );
}

export default ChartPersonalization;
