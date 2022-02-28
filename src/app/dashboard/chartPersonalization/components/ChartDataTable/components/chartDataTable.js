import './chartTableStyles.scss';

import { Card, Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExclusionTable from './exclusion_table';
import ParameterTable from './parameter_table/components/ParameterTable';
import ShiftTable from './shift_table';
import TrendTable from './trend_table';
import ViolationTable from './violation';
import { sendParameterTableData } from '../../../../../../duck/actions/chartPersonalizationAction';
import { updateTableColumn } from '../../../../../../utils/updateTableColumns';

function ChartDataTable(props) {
  const parameterData = useSelector(
    (state) => state.chartPersReducer.getBatchCoverage.data
  );

  const [paramData, setparamData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setparamData(parameterData);
    dispatch(sendParameterTableData(parameterData));
  }, [parameterData]);

  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const objkeys =
    paramData !== undefined && paramData.length > 0
      ? Object.keys(paramData[0])
      : [];

  const filterColumn = objkeys.filter(uniqueArr);
  console.log('filter column', filterColumn);
  const columns = [];
  // columns.map((item) => {
  //   item.title.toUpperCase();
  // });
  filterColumn.map((item, i) => {
    columns.push({
      title: item.toUpperCase(),
      dataIndex: item,
      key: `${item}-${i}`,
    });
  });

  const { TabPane } = Tabs;
  return (
    <div>
      <div>
        <Card bordered={false} style={{ height: '430px' }}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Exclusion' key='1'>
              <ExclusionTable />
            </TabPane>
            {/* <TabPane tab='Shift' key='2'>
                              <ShiftTable />
                          </TabPane>
                          <TabPane tab='Trends' key='3'>
                              <TrendTable />
                          </TabPane> */}
            <TabPane tab='Violation' key='4'>
              <ViolationTable />
            </TabPane>
            <TabPane tab='Data Table' key='5'>
              <Table
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                }
                size='small'
                className='parameter_table'
                columns={columns}
                dataSource={paramData}
                scroll={{ y: 350 }}
                pagination={false}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default ChartDataTable;
