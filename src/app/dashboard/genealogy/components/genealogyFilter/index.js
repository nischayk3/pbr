import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { getGeanealogyFilter } from '../../../../../services/genealogyService.js';
import './style.scss';
import SelectSearchField from '../../../../../components/SelectSearchField/SelectSearchField';
import Toggle from '../../../../../components/Toggle';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../../duck/actions/commonActions.js';
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
    console.log('eeeeeeeeeeeeeeeeeeeeeee', {
      [e.target.name]:
        typeof [e.target.name] === 'boolean'
          ? ![e.target.name]
          : e.target.value,
    });
    setisCheck(typeof isCheck === 'boolean' ? !isCheck : e.target.value);
  };

  const onChangeParam = (value, field) => {
    console.log('value', value);

    console.log('field', field);
    if (value != null) {
      if (field === 'plant') {
        setselectParam((prevState) => {
          return { ...prevState, plant: value };
        });
      } else if (field === 'product_code') {
        setselectParam((prevState) => {
          return { ...prevState, productCode: value };
        });
      }
      if (field === 'batch_num') {
        setselectParam((prevState) => {
          return { ...prevState, batchNum: value };
        });
      }
      setDisabled(false);
    }
  };

  const onSearchParam = (type, field) => {
    console.log('type', type);
    console.log('field', field);
    if (type != null) {
      if (field === 'plant') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['batch'],
          selectParam['productCode'],
          '',
          type,
          ''
        );
      } else if (field === 'product_code') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['batch'],
          selectParam['productCode'],
          '',
          '',
          type
        );
      }
      if (field === 'batch_num') {
        getGenealogyFilterData(
          selectParam['plant'],
          selectParam['batch'],
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
      setParamList((prevParamList) => {
        return {
          ...prevParamList,
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
    console.log(
      'plantttttt',
      selectParam['plant'],
      selectParam['productCode'],
      selectParam['batchNum']
    );
    let paramDetail = {
      plant: selectParam['plant'],
      product: selectParam['productCode'],
      batch: selectParam['batchNum'],
      treeType: isCheck ? 'Backward' : 'Forward',
    };
    props.parameterDetails(paramDetail);
    if (isCheck) {
      console.log('iffff');
      setisBackward(true);
      setisForward(false);
    } else {
      console.log('else');
      setisForward(true);
      setisBackward(false);
    }
  };

  console.log('isCheckeddddd', isCheck);
  return (
    <div className='param-filter-wrap'>
      <div className='param-filter'>
        <div>
          <SelectSearchField
            allowClear
            showSearch
            label='Plant'
            placeholder='Select'
            onChangeSelect={(value) => onChangeParam(value, 'plant')}
            onSearchSelect={(type) => onSearchParam(type, 'plant')}
            selectList={paramList['plantList']}
            selectedValue={selectParam['plant']}
          />
          <SelectSearchField
            allowClear
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
            allowClear
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
        <Button type='link' className='custom-secondary-btn-link'>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Filter;
