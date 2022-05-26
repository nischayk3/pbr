import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input, Form } from 'antd';

const EditableContext = React.createContext(null)

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
}

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  onChangeInput,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      onChangeInput({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
        <style>{`
            .editable-row .ant-form-item-explain {
              position: absolute;
              top: 100%;
              font-size: 12px;
            }
        `}</style>
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}

export const addRow = state => {
  let { dataSource, rowInitialData, count } = JSON.parse(JSON.stringify(state))
  dataSource.unshift(rowInitialData)
  count++
  return { dataSource, count }
}

export const changeInput = (row, state) => {
  const dataSource = [...state.dataSource];
  const index = dataSource.findIndex((item) => row.key === item.key)
  const item = dataSource[index]
  item.updated = true
  dataSource.splice(index, 1, { ...item, ...row })
  return dataSource
}

export const changeSelectInput = (value, record, column, state) => {
  const dataSource = JSON.parse(JSON.stringify(state.dataSource))
  if (column.mode === 'single') value = [`${value}`]
  const index = dataSource.findIndex(item => record.key === item.key)
  const name = column.name
  dataSource[index][name] = value
  dataSource[index].updated = true
  return dataSource
}

export const changeToggleInput = (value, record, column, state) => {
  const dataSource = JSON.parse(JSON.stringify(state.dataSource))
  const index = dataSource.findIndex(item => record.key === item.key)
  const name = column.name
  dataSource[index][name] = value
  dataSource[index].updated = true
  return dataSource
}

export const adjustColumnWidths = columns => {
  columns.forEach(column => {
    if (column.type === 'toggle') {
      column.width = '8%'
    } else if (column.type === 'action_delete') {
      column.width = '8%'
    } else if (column.type === 'parent') {
      adjustColumnWidths(column.children)
    }
  })
}

export const deleteRowCheck = (key, checked, dataSource) => {
  const dataSourceCopy = JSON.parse(JSON.stringify(dataSource))
  dataSourceCopy.forEach(data => {
    if (data.key === key) data.deleteRowChecked = checked
  })
  return dataSourceCopy
}

export const selectAllRowsForDeletion = (checked, dataSource) => {
  const dataSourceCopy = JSON.parse(JSON.stringify(dataSource))
  dataSourceCopy.forEach(data => data.deleteRowChecked = checked)
  return dataSourceCopy
}

export const checkDeleteButtonDisabledState = dataSource => {
  let rowsMarkedForDeletion = false
  dataSource.forEach(data => {
    if (data.deleteRowChecked) rowsMarkedForDeletion = true
  })
  return rowsMarkedForDeletion
}

export const deleteRow = (rowsToDelete, state) => {
  const dataSource = [...state.dataSource]
  for (let i = 0; i < dataSource.length; i++) {
    if (dataSource[i].deleteRowChecked) {
      dataSource.splice(i, 1)
      i--
    }
  }
  const count = state.count - rowsToDelete.length
  return { dataSource, count }
}