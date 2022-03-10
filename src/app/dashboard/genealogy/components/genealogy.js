import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tabs, Popover, Button, message } from 'antd';
import Filter from './genealogyFilter';
import TreePlot from './TreePlot/TreePlot';
import response from '../treePlot.json';
import { useDispatch } from 'react-redux';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import {
  getBackwardData,
  getForwardData,
} from '../../../../services/genealogyService';
import { setMinZoom } from 'svg-pan-zoom';

const { TabPane } = Tabs;
function Genealogy() {
  const [chartType, setchartType] = useState('backward');
  const [isBackward, setisBackward] = useState(true);
  const [isForward, setisForward] = useState(false);
  const [genealogyData, setGenealogyData] = useState(response);
  const [showTree, setShowTree] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [activateKey, setActivateKey] = useState('1');
  // const [popVisible, setPopVisible] = useState(false);

  const dispatch = useDispatch();

  const onClickNode = (node) => {
    console.log('nodeeeeeeee', node);
    if (node.clickType === 'backward') {
      let _reqBackward = {
        level: 5,
        matBatchNo: node.nodeId,
      };
      getBackwardGeneology(_reqBackward);
      setchartType('backward');
      setProductCode(node.product);
    } else {
      let _reqFor = {
        level: 5,
        matBatchNo: node.nodeId,
      };
      getForwardGeneology(_reqFor);
      setchartType('forward');
      setProductCode(node.product);
    }
  };

  const selectedParameter = (param) => {
    console.log('param', param);
    const product = param && param.product.split('-');
    const selectedValue = param.plant + '|' + product[0] + '|' + param.batch;

    if (param.treeType === 'Backward') {
      let _reqBack = {
        level: 5,
        batch_id: '1007|1015769|9F05217',
        //selectedValue.replace(/\s/g, ''),
        backward: true,
      };
      setisBackward(false);
      setisForward(true);
      setShowTree(true);
      setActivateKey('2');
      getBackwardGeneology(_reqBack);
      setchartType('backward');
      setProductCode(product[0]);
    } else {
      let _reqFor = {
        level: 5,
        batch_id: selectedValue.replace(/\s/g, ''),
        backward: false,
      };
      getForwardGeneology(_reqFor);
      setchartType('forward');
      setProductCode(product[0]);
    }
  };

  const getBackwardGeneology = async (_reqBack) => {
    try {
      dispatch(showLoader());
      const backwardRes = await getBackwardData(_reqBack);
      console.log('backwardRes', backwardRes);
      if (backwardRes.length > 0) {
        setGenealogyData(backwardRes[0]);
        setisBackward(true);
        setisForward(false);
        setShowTree(true);
        setActivateKey('2');
        dispatch(hideLoader());
      } else {
        dispatch(hideLoader());
        dispatch(showNotification('error', 'No Data Found'));
      }
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error));
    }
  };

  const getForwardGeneology = async (_reqFor) => {
    try {
      dispatch(showLoader());
      const forwardRes = await getForwardData(_reqFor);
      if (forwardRes.length > 0) {
        setGenealogyData(forwardRes[0]);
        setisBackward(false);
        setisForward(true);
        setShowTree(true);
        setActivateKey('2');
        dispatch(hideLoader());
      } else {
        dispatch(hideLoader());
        dispatch(showNotification('error', 'No Data Found'));
      }

      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error));
    }
  };

  const handleChangeTab = (activateKey) => {
    setActivateKey(activateKey);
  };

  console.log('genealogyData key', genealogyData);
  return (
    <div className='custom-wrapper'>
      <div className='sub-header'>
        <div className='sub-header-title'>
          <ArrowLeftOutlined className='header-icon' />
          <span className='header-title'>Genealogy</span>
        </div>
      </div>
      <div className='custom-content-layout'>
        <Tabs
          className='custom-tabs'
          activeKey={activateKey}
          onChange={handleChangeTab}
        >
          <TabPane tab='Select Parameter' key='1'>
            <Filter parameterDetails={selectedParameter} />
          </TabPane>
          {showTree && (
            <TabPane
              tab={
                <>
                  <p className='tab-label'>
                    <span className='tree-type-icon'></span>
                    {productCode} - {chartType}
                  </p>
                </>
              }
              key='2'
              style={{ height: '1000px' }}
              className='tree-wrap'
            >
              <TreePlot
                chartType={chartType}
                Backward={isBackward}
                Forward={isForward}
                data={response[0]}
                nodeClick={onClickNode}
                //  handleChartClick={handleClickNode}
              />
            </TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default Genealogy;
