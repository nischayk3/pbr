import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
  let rowArray = ["id", "param_name", "anchor_key", "snippet_image", "changed_by"]
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (!rowArray.includes(record.column)) {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }

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
        <Input id="editTableID" ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : 
    (
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
 /* istanbul ignore next */
const App = (props) => {
  let { templateData, setTemplateData,setTextInput,textInput } = props

  const defaultColumns = [
    {
      title: "Columns",
      dataIndex: "column",
      key: "columns",
      width: "30%"
    },
    {
      title: "Values",
      dataIndex: "value",
      key: "values",
      editable: true,
      render: (text, record, index) => {
        if (record.column === "snippet_image") {
          return (
            <img src={`data:image/png;base64,${text}`} width="50%" height="15%" />
          )
        } else {
          return text
        }
      }
    },
  ];


  const handleSave = (row) => {
    setTextInput({
      ...textInput, [row.column]: row.value
    });
    const newData = [...templateData];
    const index = newData.findIndex((item) => row.column === item.column);
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
  console.log("template", templateData)
  return (
    <div>
      <Table
        className='edit-table'
        components={components}
        pagination={false}
        size="small"
        showHeader={false}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={templateData}
        columns={columns}
        style={{ border: '1px solid #ececec', borderRadius: '2px', marginTop: 26 }}
      />
    </div>
  );
};

export default App;