import React from 'react';
import { Button, Tabs } from 'antd';
import './style.scss';
import SelectSearchField from '../../../../../components/SelectSearchField/SelectSearchField';
const { TabPane } = Tabs;

const searchParam = () => {};

function Filter() {
  return (
    <Tabs className='custom-tabs' defaultActiveKey='1'>
      <TabPane tab='Select Parameter' key='1'>
        <div className='param-filter-wrap'>
          <div className='param-filter'>
            <SelectSearchField
              showSearch
              label='Region'
              placeholder='Select '
              onChangeSelect={(e) => searchParam(e, 'region')}
              //  selectList={xAxisList}
              //selectedValue={selectedXAxis}
            />
            <SelectSearchField
              showSearch
              label='Plant type'
              placeholder='Select '
              onChangeSelect={(e) => searchParam(e, 'plant_type')}
              //  selectList={xAxisList}
              //selectedValue={selectedXAxis}
            />
            <SelectSearchField
              showSearch
              label='Plant'
              placeholder='Select '
              onChangeSelect={(e) => searchParam(e, 'plant')}
              //  selectList={xAxisList}
              //selectedValue={selectedXAxis}
            />
            <SelectSearchField
              showSearch
              label='UPC '
              placeholder='Select '
              onChangeSelect={(e) => searchParam(e, 'upc')}
              //  selectList={xAxisList}
              //selectedValue={selectedXAxis}
            />
            <SelectSearchField
              showSearch
              label='Product type'
              placeholder='Select '
              onChangeSelect={(e) => searchParam(e, 'product_type')}
              //  selectList={xAxisList}
              //selectedValue={selectedXAxis}
            />
            <SelectSearchField
              showSearch
              label='Product code'
              placeholder='Select '
              onChangeSelect={(e) => searchParam(e, 'product_code')}
              //  selectList={xAxisList}
              //selectedValue={selectedXAxis}
            />
            <SelectSearchField
              showSearch
              label='Batch number'
              placeholder='Select '
              onChangeSelect={(e) => searchParam(e, 'batch_num')}
              //  selectList={xAxisList}
              //selectedValue={selectedXAxis}
            />
          </div>
          <div className='param-filter-btn'>
            <Button type='primary' className='custom-secondary-btn'>
              Search
            </Button>
            <Button type='link' className='custom-secondary-btn-link'>
              Clear
            </Button>
          </div>
        </div>
      </TabPane>
      {/* <TabPane tab='Tab 2' key='2'>
        Content of Tab Pane 2
      </TabPane> */}
    </Tabs>
  );
}

export default Filter;
