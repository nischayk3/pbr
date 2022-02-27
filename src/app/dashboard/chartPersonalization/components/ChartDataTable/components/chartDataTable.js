import './chartTableStyles.scss';

import { Card, Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

import ExclusionTable from './exclusion_table';
import ParameterTable from './parameter_table/components/ParameterTable';
import ShiftTable from './shift_table';
import TrendTable from './trend_table';
import ViolationTable from './violation';
import { updateTableColumn } from '../../../../../../utils/updateTableColumns';
import { useSelector } from 'react-redux';

function ChartDataTable(props) {
  const parameterData = useSelector(
    (state) => state.chartPersReducer.getBatchCoverage.data
  );

  const [paramData, setparamData] = useState([]);

  useEffect(() => {
    setparamData(parameterData);
  }, [parameterData]);

  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const objkeys =
    paramData !== undefined && paramData.length > 0
      ? Object.keys(paramData[0])
      : [];

  const filterColumn = objkeys.filter(uniqueArr);

  const columns = [];
  filterColumn.map((item, i) => {
    columns.push({
      title: item,
      dataIndex: item,
      key: `${item}-${i}`,
    });
  });

  const { TabPane } = Tabs;
  return (
    <div>
      <div>
        <Card bordered={false} style={{ height: 285 }}>
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
                size='small'
                className='parameter_table'
                columns={columns}
                dataSource={paramData}
                bordered
                scroll={{ y: 150 }}
                pagination={false}
              />
              {/* <ParameterTable parameterData={paramData} /> */}
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default ChartDataTable;
