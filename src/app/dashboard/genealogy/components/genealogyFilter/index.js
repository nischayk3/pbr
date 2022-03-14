/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - Dinesh Kumar
 */

import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { getGeanealogyFilter } from '../../../../../services/genealogyService.js';
import './style.scss';
import SelectSearchField from '../../../../../components/SelectSearchField/SelectSearchField';
import Toggle from '../../../../../components/Toggle';
import { showNotification } from '../../../../../duck/actions/commonActions.js';
import { useDispatch } from 'react-redux';

function Filter(props) {
  const [disabled, setDisabled] = useState(true);
  const [isCheck, setisCheck] = useState(true);
  const [isBackward, setisBackward] = useState(true);
  const [isForward, setisForward] = useState(false);
  const [selectParam, setselectParam] = useState({
    plant: '',
    productCode: '',
    batchNum: '',
  });
  const [paramList, setParamList] = useState({
    plantList: [],
    produtList: [],
    batchList: [],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    getGenealogyFilterData();
  }, []);

  const handleChangeToggle = (e) => {
    setisCheck(typeof isCheck === 'boolean' ? !isCheck : e.target.value);
  };

  const onChangeParam = (value, field) => {
    if (value != null) {
      if (field === 'plant') {
        getGenealogyFilterData(
          value,
          selectParam['batchNum'],
          selectParam['productCode'],
          '',
          '',
          ''
        );
        setselectParam((prevState) => {
          return { ...prevState, plant: value };
        });
      } else if (field === 'product_code') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['batchNum'],
          value,

          '',
          '',
          ''
        );
        setselectParam((prevState) => {
          return { ...prevState, productCode: value };
        });
      }
      if (field === 'batch_num') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['productCode'],
          value,

          '',
          '',
          ''
        );
        setselectParam((prevState) => {
          return { ...prevState, batchNum: value };
        });
      }
      setDisabled(false);
    }
  };

  const onSearchParam = (type, field) => {
    if (type != null) {
      if (field === 'plant') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['batchNum'],
          selectParam['productCode'],
          '',
          type,
          ''
        );
      } else if (field === 'product_code') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['batchNum'],
          selectParam['productCode'],
          '',
          '',
          type
        );
      }
      if (field === 'batch_num') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['batchNum'],
          selectParam['productCode'],
          type,
          '',
          ''
        );
      }
    }
  };
  const getGenealogyFilterData = async (
    selectedPlantValue,
    selectedBatchValue,
    selectedProductValue,
    batchText,
    plantText,
    matText
  ) => {
    let reqFilter = {
      batch_no: selectedBatchValue ? selectedBatchValue : '',
      material: selectedProductValue ? selectedProductValue : '',
      plant_no: selectedPlantValue ? selectedPlantValue : '',
      batchText: batchText ? batchText : '',
      plantText: plantText ? plantText : '',
      matText: matText ? matText : '',
    };

    try {
      const filterRes = await getGeanealogyFilter(reqFilter);
      setParamList(() => {
        return {
          plantList: filterRes && filterRes.plant_no,
          batchList: filterRes && filterRes.batch_no,
          produtList: filterRes && filterRes.material,
        };
      });
    } catch (err) {
      dispatch(showNotification('error', err));
    }
  };

  const OnSearchTree = () => {
    let paramDetail = {
      plant: selectParam['plant'],
      product: selectParam['productCode'],
      batch: selectParam['batchNum'],
      treeType: isCheck ? 'Backward' : 'Forward',
    };
    props.parameterDetails(paramDetail);
    if (isCheck) {
      setisBackward(true);
      setisForward(false);
    } else {
      setisForward(true);
      setisBackward(false);
    }
  };

  const handleClear = () => {
    setselectParam((prevState) => {
      return { ...prevState, plant: '', productCode: '', batchNum: '' };
    });
    getGenealogyFilterData();
  };

  return (
    <div className='param-filter-wrap'>
      <div className='param-filter'>
        <div>
          <SelectSearchField
            showSearch
            label='Plant'
            placeholder='Select'
            onChangeSelect={(value) => onChangeParam(value, 'plant')}
            onSearchSelect={(type) => onSearchParam(type, 'plant')}
            selectList={paramList['plantList']}
            selectedValue={selectParam['plant']}
          />
          <SelectSearchField
            showSearch
            label='Batch'
            placeholder='Select'
            onChangeSelect={(value) => onChangeParam(value, 'batch_num')}
            onSearchSelect={(type) => onSearchParam(type, 'batch_num')}
            selectList={paramList['batchList']}
            selectedValue={selectParam['batchNum']}
          />
        </div>
        <div>
          <SelectSearchField
            showSearch
            label='Product'
            placeholder='Select'
            onChangeSelect={(value) => onChangeParam(value, 'product_code')}
            onSearchSelect={(type) => onSearchParam(type, 'product_code')}
            selectList={paramList['produtList']}
            selectedValue={selectParam['productCode']}
          />
          <Toggle
            name='isChecked'
            checked={isCheck}
            inline={true}
            labels={['Backward', 'Forward']}
            handleChange={handleChangeToggle}
          />
        </div>
      </div>
      <div className='param-filter-btn'>
        <Button
          type='primary'
          className='custom-secondary-btn'
          onClick={OnSearchTree}
          disabled={disabled}
        >
          Search
        </Button>
        <Button
          type='link'
          className='custom-secondary-btn-link'
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Filter;
