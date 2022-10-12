import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { tableColumns } from '../../../../utils/TableColumns'
import './styles.scss';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
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
      handleSave({ ...record, ...values });
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
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const App = (props) => {
  let { templateData, setTemplateData } = props
  const [defaultColumns, setDefaultColumns] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let col = tableColumns(templateData)
    col = col.filter(item => item.title != "KEY")
    col = col.map(item => ({ ...item, editable: true }))
    col.push({
      title: 'operation',
      dataIndex: 'operation',
      width: "20%",
      render: (_, record) =>
        templateData.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    })
    setDefaultColumns(col)
    if (count == 0) {
      setCount(templateData.length)
    }

  }, [templateData])

  const handleDelete = (key, val) => {
    const newData = templateData.filter((item) => item.key !== key);
    setTemplateData(newData);
  };



  const handleAdd = () => {
    const newData = {};
    if (defaultColumns.length > 0) {
      defaultColumns.forEach(item => {
        if (item.dataIndex != "operation") {
          newData[item.dataIndex] = ""
        }
      })
    }
    newData["key"] = count
    setTemplateData([...templateData, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...templateData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTemplateData(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <div className='tableEdit'>
        <h3 style={{ marginLeft: 20 }}>Selected Table Preview</h3>
        <div>
          {/* <Button id="editLogs" style={{
            borderRadius: "5px",
            textTransform: "none",
            background: "#ffffff",
            borderColor: "#303f9f",
            color: "#303f9f",
            marginRight: '15px',

          }}
            type='primary'>
            Edit
          </Button> */}
          {/* <Button id="save_button" style={{
            backgroundColor: '#303f9f',
            color: '#ffffff',
            borderColor: "#303f9f",
            borderRadius: "5px",
            marginRight: 10

          }}
            type='primary'>Validate</Button> */}
        </div>

      </div>
      <div style={{ padding: 10 }}>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          pagination={false}
          size="small"
          showHeader={false}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={templateData}
          columns={columns}
        />
      </div>

    </div>
  );
};

export default App;