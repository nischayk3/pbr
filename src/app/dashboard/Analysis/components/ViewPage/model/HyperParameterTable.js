import React from 'react'
import { Table, Input } from 'antd'
import './model.scss'


const HyperParameterTable = (props) => {
  
    const { columns, dataSource, setDataSource } = props
    

    const handleChange = (index, event) => {
		const rowsInput = [...dataSource];
        const { name, value } = event.target;
        rowsInput[index][name] = value;
		setDataSource(rowsInput);
	};

 
    
    const obj = {
        title: "CUSTOM VALUE",
        dataIndex: "customValue",
        key: "customValue",
        render: (text, record) =>
           dataSource.map((data, index) => {
                if (record.key === data.key) {
                    return (
                        <Input
                            name="customValue"
                            // status={
                            //     data.customValue &&
                            //     (typeof(data.customValue) !== data.valid_value) &&
                            //     "error"
                            // }
                            value={data.customValue}
                            onChange={(e) => handleChange(index, e)}
                        />
                    );
                }
            }),
    }
   
    columns.push(obj);
    
    
    return (
      <div className='hyper_table'>
          <Table
              columns={columns}
              dataSource={dataSource}
          />
      </div>
  )
}

export default HyperParameterTable