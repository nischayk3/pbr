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
    (state) => state.chartPersReducer.getBatchCoverage
  );

  const [paramData, setparamData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
     if (parameterData) {
      setparamData(parameterData.parameter);
      dispatch(sendParameterTableData(parameterData.parameter ? parameterData.parameter : []));
     }
  }, [parameterData]);

  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  console.log(paramData,'parameter')
  const objkeys =
    paramData !== undefined && paramData.length > 0
      ? Object.keys(paramData[0])
      : [];

  const filterColumn = objkeys.filter(uniqueArr);

  const columns = [];

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
          <Tabs defaultActiveKey='3'>
            <TabPane tab='Exclusion' key='1'>
              <ExclusionTable />
            </TabPane>
            {/* <TabPane tab='Shift' key='2'>
                              <ShiftTable />
                          </TabPane>
                          <TabPane tab='Trends' key='3'>
                              <TrendTable />
                          </TabPane> */}
            <TabPane tab='Violation' key='2'>
              <ViolationTable />
            </TabPane>
            <TabPane tab='Data Table' key='3'>
              {<Table
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
                }
                size='small'
                className='parameter_table'
                columns={columns}
                // dataSource={paramData}
                scroll={{ y: 350 }}
                pagination={false}
              />}
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default ChartDataTable;
