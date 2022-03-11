import React, { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tabs, Popover, Button, message } from 'antd';
import Filter from './genealogyFilter';
import TreePlot from './TreePlot/TreePlot';
import response from '../treePlot.json';
import batchIcon from '../../../../assets/images/material.png';
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
  const [genealogyData, setGenealogyData] = useState([]);
  const [showTree, setShowTree] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [activateKey, setActivateKey] = useState('1');
  // const [popVisible, setPopVisible] = useState(false);

  const dispatch = useDispatch();

  const onClickNode = (node) => {
    console.log('nodeeeeeeee', node);
    if (node.clickType === 'backward') {
      let _reqBackward = {
        levels: 5,
        matBatchNo: node.nodeId,
        backward: true,
      };
      getBackwardGeneology(_reqBackward);
      setActivateKey('2');
      setchartType('backward');
      setProductCode(node.product);
    } else {
      let _reqFor = {
        levels: 5,
        matBatchNo: node.nodeId,
        backward: false,
      };
      getForwardGeneology(_reqFor);
      setActivateKey('2');
      setchartType('forward');
      setProductCode(node.product);
    }
  };

  const selectedParameter = (param) => {
    console.log('parammmmmmmmmmm', param);
    const product = param && param.product.split('-');
    const plant = param && param.plant.split('-');
    const selectedValue = plant[0] + '|' + product[0] + '|' + param.batch;

    if (param.treeType === 'Backward') {
      let _reqBack = {
        levels: 5,
        batch_id: selectedValue.replace(/\s/g, ''),
        backward: true,
      };
      setActivateKey('2');
      setisBackward(true);
      setisForward(false);

      getBackwardGeneology(_reqBack);
      setchartType('backward');
      setProductCode(product[0]);
    } else {
      let _reqFor = {
        levels: 5,
        batch_id: selectedValue.replace(/\s/g, ''),
        backward: false,
      };
      setActivateKey('2');
      setisBackward(false);
      setisForward(true);
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
        setGenealogyData(backwardRes);
        setisBackward(true);
        setisForward(false);
        setShowTree(true);
        setActivateKey('2');
        dispatch(hideLoader());
      } else if (backwardRes.status === 400) {
        setGenealogyData([]);
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
        setGenealogyData(forwardRes);
        setisBackward(false);
        setisForward(true);
        setShowTree(true);
        setActivateKey('2');
        dispatch(hideLoader());
      } else if (forwardRes.status === 400) {
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
                    <img className='tree-type-icon' src={batchIcon} />
                    {productCode} - {chartType}
                  </p>
                </>
              }
              closable={true}
              key='2'
              className='tree-wrap'
            >
              {genealogyData && genealogyData.length > 0 && (
                <TreePlot
                  chartType={chartType}
                  Backward={isBackward}
                  Forward={isForward}
                  data={genealogyData[0]}
                  nodeClick={onClickNode}
                  //  handleChartClick={handleClickNode}
                />
              )}
            </TabPane>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default Genealogy;
