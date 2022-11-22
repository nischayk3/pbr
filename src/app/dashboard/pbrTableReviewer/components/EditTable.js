import { Button, Form, Input, Popconfirm, Table, Radio, Tag } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { tableColumns } from '../../../../utils/TableColumns'
import ReactDragListView from "react-drag-listview";
import {
  CloseOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
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
/* istanbul ignore next */
const App = (props) => {
  const tabledata = useSelector((state) => state?.pbrReducer?.initialTableData)
  let { templateData, setTemplateData } = props
  const [defaultColumns, setDefaultColumns] = useState([]);
  const [showMove, setShowMove] = useState(true);
  const [count, setCount] = useState(0);
  const [showDrag, setShowDrag] = useState(false);
  const [dragProps, setDragProps] = useState({});
  const [originalTableData, setOriginalTableData] = useState([]);
  const [enableDelete, setEnableDelete] = useState(false);



  useEffect(() => {
    let col = tableColumns(templateData)
    col = col.filter(item => item.title != "KEY")
    col = col.map(item => ({ ...item, editable: true }))
    col.push({
      title: 'operation',
      dataIndex: 'operation',
      width: "20%",
      render: (_, record) =>
        templateData.length >= 1 ? showDrag ? <a>Drag</a> : (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    })
    setDefaultColumns(col)
    if (count == 0) {
      setCount(templateData.length)
    }
    if (originalTableData.length == 0) {
      setOriginalTableData(templateData)
    }

  }, [templateData, showDrag])

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

  const handleAddColumn = () => {
    let arr = templateData
    arr = arr.map(item => {
      let count = Object.keys(item).length
      let obj = { ...item }
      obj[`Column${count}`] = ""
      return obj
    })
    setTemplateData(arr);
  }

  const handleSave = (row) => {
    const newData = [...templateData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTemplateData(newData);
  };

  const handleDeleteColumn = (record) => {
    let arr = templateData
    arr = arr.map(item => {
      delete item[record.dataIndex]
      return item
    })
    setTemplateData(arr);
  }

  const handleMovementChange = () => {
    setShowMove(false)
  }

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
      onHeaderCell: (record) => ({
        onDoubleClick: () => {
          if (enableDelete) {
            handleDeleteColumn(col)
            setEnableDelete(false)
          }

        },
      })
    };
  });

  const onDragEnd = (fromIndex, toIndex) => {
    if (showDrag) {
      const data = [...templateData.slice()];
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setTemplateData(data)
    } else {
      let data = [...templateData.slice()];
      let arr = []
      data.map(item => {
        let keysArr = Object.keys(item)
        keysArr = keysArr.filter(i => i != "key")
        keysArr.push("key")
        const item1 = keysArr.splice(fromIndex, 1)[0];
        keysArr.splice(toIndex, 0, item1);
        let obj = {}
        keysArr.forEach(el => {
          obj[el] = item[el]
          if (!arr.includes(obj)) {
            arr.push(obj)
          }
        })
      })
      setTemplateData(arr)
    }

  }

  const handleRadioChange = (vall) => {
    if (vall.target.value === "move_row") {
      setShowDrag(true)
      setDragProps({
        handleSelector: 'a'
      })
    } else {
      setShowDrag(false)
      setDragProps({
        nodeSelector: 'th',
      })
    }
  }

  return (
    <div>
      <div className='tableEdit'>
        <h3 style={{ marginLeft: 20 }}>Selected Table Preview</h3>
        <div>
          {enableDelete &&
            <div>
              <ExclamationCircleOutlined style={{ fontSize: 16, color: "orange", marginRight: 5 }} />
              <Tag color={'warning'}>
                Double click column header to delete
              </Tag>
            </div>
          }
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
        <Button
          onClick={handleAddColumn}
          type="primary"
          style={{
            marginBottom: 16,
            marginLeft: 10
          }}
        >
          Add Column
        </Button>
        <Button
          onClick={() => setEnableDelete(!enableDelete)}
          type="primary"
          // disabled ={enableDelete}
          style={{
            marginBottom: 16,
            marginLeft: 10
          }}
        >
          {enableDelete ? "Cancel" : "Delete Column"}
        </Button>
        {showMove && <Button
          onClick={handleMovementChange}
          type="primary"
          style={{
            marginBottom: 16,
            marginLeft: 10
          }}
        >
          Move Row/Column
        </Button>}
        {!showMove && <Radio.Group style={{ marginLeft: 10 }} buttonStyle="solid" onChange={handleRadioChange}>
          <Radio.Button value="move_row">Move Row</Radio.Button>
          <Radio.Button value="move_column">Move Column</Radio.Button>
        </Radio.Group>}
        {!showMove && <CloseOutlined style={{ cursor: "pointer", marginLeft: 5 }} onClick={() => {
          setShowDrag(false)
          setShowMove(true)
        }} />}

        <ReactDragListView
          {...dragProps}
          onDragEnd={onDragEnd}
        // nodeSelector={showDrag ? "a" : "th"}
        >
          <Table
            pagination={false}
            size="small"
            showHeader={true}
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={templateData}
            columns={columns}
          />
        </ReactDragListView>
      </div>
    </div>
  );
};

export default App;