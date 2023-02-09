import { Input, Select, Collapse,Button } from 'antd';
import React,{ useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './forms.scss'
const { Panel } = Collapse;

function Tableform({ layout, current, tableData, setTableData,setLayout, formData, setFormData, selecttable,editColumn,editRow,columnData, setColumnData}) {
  const [datas, setDatas] = useState([]);
    const [formTable, setFormtable] = useState({  tabletype: '' });
   
    const [columns, setColumns] = useState([ ]);
    const [rows, setRows] = useState([]);

    const [subcolumns, setSubColumns] = useState({sub: '' });
    const [subcol, setSubcol] = useState([]);
    const [subcolName, setSubColName] = useState({ name: ''})


    useEffect(() => {

    },[subcolumns])

    const handleSubmit = (e) => {
        e.preventDefault();
        let tempColumns = [];
        let tempRows = [];
        for (let i = 0; i < Number(formData.columns); i++) {
            tempColumns.push({align: "",
            dataIndex: `column${i+1}`,
            editable: true,
            key: uuidv4(),
            label: "",
            name: "",
            title: `column${i+1}`,
            type: "" ,
            sub:"",
            children:''})
        }
        for (let i = 0; i < Number(formData.rows); i++) {
            tempRows.push({
               
            })
            
        }
       
    tempRows.forEach((row,index) => {
        tempColumns.forEach((item) =>{
            row[item.dataIndex] = `Row${index+1}`
            row.key= uuidv4()
            row.tableId = tableData.id
        })
    })
       
setColumns(tempColumns)
    const templayout = JSON.parse(JSON.stringify(layout));
    templayout.forEach(row => {
     row.children.forEach((col) => {
         col.children.forEach((component) => {
             if(component.id === tableData.id){
                     component.datasource= tempRows;
                     component.columns=tempColumns;
                     component.tableName=formData.tableName;
                     component.technicalName= formData.technicalName;
                     component.description=formData.description
             }
         })
     } )
    });
    setLayout(templayout)
    setTableData({...tableData, datasource: rows, columns: columns})
    setColumnData(tempColumns)
      };
      
     const handleColSave = (e) => {
      e.preventDefault();
      const templayout = JSON.parse(JSON.stringify(layout));
      templayout.forEach(row => {
       row.children.forEach((col) => {
           col.children.forEach((component) => {
               if(component.id === tableData.id){
                       component.columns=columns;
                       component.tableName=formData.tableName;
                       component.technicalName= formData.technicalName;
                       component.description=formData.description
               }
           })
       } )
      });
      setLayout(templayout)
      setTableData({...tableData, datasource: rows, columns: columns})
      setColumnData(tempColumns)

     } 
      const handleChange = (e) => {
        setColumnData({...columnData, title: e.target.value})
        const templayout = JSON.parse(JSON.stringify(layout));
        templayout.forEach(row => {
         row.children.forEach((col) => {
             col.children.forEach((component) => {
                component.columns.forEach((colid) => {
                 if(colid.key === columnData.id){
                    colid.title= e.target.value;
                 }
                })
             })
         } )
        });
        setLayout(templayout)
            }

  const handleTable = (e) => {
        e.preventDefault();
  }    

 

  const handleColumns = (i) => {

  }
  

  const handleTabletype = (e) => {
   const tempColumns =  [

      {
        "align": "",
        "dataIndex": "column1",
        "editable": true,
        "key": uuidv4(),
        "label": "",
        "name": "",
        "title": "column1",
        "type": ""
      },
      {
        "align": "",
        "dataIndex": "column2",
        "editable": true,
        "key": uuidv4(),
        "label": "",
        "name": "",
        "title": "column2",
        "type": ""
      },
      {
        "align": "",
        "dataIndex": "column3",
        "editable": true,
        "key": uuidv4(),
        "label": "",
        "name": "",
        "title": "column3",
        "type": ""
      }

    ]
    const tempMultiColumns= [

      {
        "align": "",
        "dataIndex": "column1",
        "editable": true,
        "key": uuidv4(),
        "label": "",
        "name": "",
        "title": "column1",
        "type": "",
        "children": [
          {
            "align": "",
            "dataIndex": "subcolumn1",
            "editable": true,
            "key": "168255f7-fa56-4dcf-88da-293441125be4",
            "label": "",
            "name": "",
            "title": "subcolumn1",
            "type": ""
          }
        ]
      },
      {
        "align": "",
        "dataIndex": "column2",
        "editable": true,
        "key": uuidv4(),
        "label": "",
        "name": "",
        "title": "column2",
        "type": "",
        "children": [
          {
            "align": "",
            "dataIndex": "subcolumn1",
            "editable": true,
            "key": "11e92ebe-5d1e-43cb-8ebb-2bffdf4a4dc7",
            "label": "",
            "name": "",
            "title": "subcolumn1",
            "type": ""
          },
          {
            "align": "",
            "dataIndex": "subcolumn2",
            "editable": true,
            "key": "0f58d30a-22eb-4438-8311-d76af4ef161e",
            "label": "",
            "name": "",
            "title": "subcolumn2",
            "type": ""
          }
        ]
      },
      {
        "align": "",
        "dataIndex": "column3",
        "editable": true,
        "key": uuidv4(),
        "label": "",
        "name": "",
        "title": "column3",
        "type": "",
        "children": [
          {
            "align": "",
            "dataIndex": "subcolumn1",
            "editable": true,
            "key": "2bc42260-b687-4d65-ac47-f59a2f4a1acc",
            "label": "",
            "name": "",
            "title": "subcolumn1",
            "type": ""
          },
          {
            "align": "",
            "dataIndex": "subcolumn2",
            "editable": true,
            "key": "08c70fc1-f95f-4efc-9c0e-c261dd6d3a98",
            "label": "",
            "name": "",
            "title": "subcolumn2",
            "type": ""
          }
        ]
      },
      {
        "align": "",
        "dataIndex": "column4",
        "editable": true,
        "key": uuidv4(),
        "label": "",
        "name": "",
        "title": "column4",
        "type": "",
        "children": [
          {
            "align": "",
            "dataIndex": "subcolumn1",
            "editable": true,
            "key": uuidv4(),
            "label": "",
            "name": "",
            "title": "subcolumn1",
            "type": ""
          },
          {
            "align": "",
            "dataIndex": "subcolumn2",
            "editable": true,
            "key": uuidv4(),
            "label": "",
            "name": "",
            "title": "subcolumn2",
            "type": ""
          }
        ]
      }


    ] 
    setColumns(tableData.tableType === "Nested table" ? tempMultiColumns: tempMultiColumns)
    const templayout = JSON.parse(JSON.stringify(layout));
    templayout.forEach(row => {
     row.children.forEach((col) => {
         col.children.forEach((component) => {
             if(component.id === tableData.id){
                    
                     component.tableType= e;
                     component.columns= e === "Normal table" ? tempColumns : tempMultiColumns;
             }
         })
     } )
    });
    setLayout(templayout)
    setTableData({...tableData, tableType: e})
  }
 
  const handleSubcolumns = (index,e,i) => {
    setSubColumns({...subcolumns, sub: e.target.value})


      let tempsubcolumns = [];
      for (let i = 0; i < Number(e.target.value); i++) {
        tempsubcolumns.push({align: "",
        dataIndex: `subcolumn${i+1}`,
        editable: true,
        key: uuidv4(),
        label: "",
        name: "",
        title: `subcolumn${i+1}`,
        type: "" ,
        })
    }
    setSubcol(tempsubcolumns);
    const newcolumns = [...columns];
    newcolumns[index].children = tempsubcolumns
    newcolumns[index].sub = e.target.value
  setColumns(columns)

  setLayout(layout)
  }

  const handleSubcol = (index,ind, e,j,i) => {
    columns.map((parent) => {
     if(parent.key === i.key){
  
   
    const newcolumns = [...columns];
    newcolumns[index].children[ind].title = e.target.value
    // newcolumns[index].sub = e.target.value
    setSubColName({...subcolName, name: e.target.value})
  }})
  setLayout(layout)
  }

  const handleSave = (e) => {
    e.preventDefault();
    setLayout(layout)
  }
  return (
    <div>
      <form 
      // onSubmit={handleTable}
       className='textform'>
      <div className='textfields'>
                        <label className='textlabels'>Select table type</label> <br/>
                        <Select name="datatype" style={{ width: "100%"}} value={tableData.tableType} onChange={(e) => handleTabletype( e)}
                            options={[
                                {
                                    value: 'Normal table',
                                    label: 'Normal table',
                                },
                                {
                                    value: 'Nested table',
                                    label: 'Nested table',
                                }
                            ]}
                        />
       </div>         
      </form>
      {tableData.tableType === 'Normal table' ? 
       <form onSubmit={handleSubmit} className='textform'>  
       <div className='textfields'>
          <label className='textlabels'>Enter table name</label>
          <Input name="columns" type="text" value={formData.tableName} onChange={(e) => setFormData({ ...formData, tableName: e.target.value })} />
        </div>
        <div className='textfields'>
          <label className='textlabels'>Enter technical name</label>
          <Input name="columns" type="text" value={formData.technicalName} onChange={(e) => setFormData({ ...formData, technicalName: e.target.value })} />
        </div>
        <div className='textfields'>
          <label className='textlabels'>Enter description</label>
          <Input name="columns" type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
       <div className='textfields'>
          <label className='textlabels'>Enter Columns</label>
          <Input name="columns" type="number" value={formData.columns} onChange={(e) => setFormData({ ...formData, columns: e.target.value })} />
        </div>
        <div className='textfields'>
          <label className='textlabels'>Enter Rows</label>
          <Input name="rows" type="number" value={formData.rows } onChange={(e) => setFormData({ ...formData, rows: e.target.value })} />
        </div>
        <div className='textfields'>
          <button type="submit">Create Table</button>
        </div>
      <div className='textfields'>
          <label className='textlabels'>Enter Column title</label>
          <Input name="title" type="text" value={ columnData.title} onChange={(e) => handleChange(e)} />
        </div>
      </form> 
      : 
      <div>
      <form onSubmit={handleSubmit} className='textform'>  
      <div className='textfields'>
         <label className='textlabels'>Enter table name</label>
         <Input name="columns" type="text" value={formData.tableName} onChange={(e) => setFormData({ ...formData, tableName: e.target.value })} />
       </div>
       <div className='textfields'>
         <label className='textlabels'>Enter technical name</label>
         <Input name="columns" type="text" value={formData.technicalName} onChange={(e) => setFormData({ ...formData, technicalName: e.target.value })} />
       </div>
       <div className='textfields'>
         <label className='textlabels'>Enter description</label>
         <Input name="columns" type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
       </div>
      {/* <div className='textfields'>
         <label className='textlabels'>Enter Columns</label>
         <Input name="columns" type="number" value={formData.columns} onChange={(e) => setFormData({ ...formData, columns: e.target.value })} />
       </div>
       <div className='textfields'>
         <label className='textlabels'>Enter Rows</label>
         <Input name="rows" type="number" value={formData.rows } onChange={(e) => setFormData({ ...formData, rows: e.target.value })} />
       </div>
       <div className='textfields'>
         <button type="submit">Create Table</button>
       </div>    */}
        
        {/* <form> */}
        {/* <div className='textfields'>
          <label className='textlabels'>Enter Column title</label>
          <Input name="title" type="text" value={ columnData.title} onChange={(e) => handleChange(e)} />
        </div> */}
        {/* </form>  */}
        <div>
        <Collapse defaultActiveKey={['1']} >
          {columns.map((i,index) => 
      <Panel header={i.title} key={i.key}>
        {/* <form onSubmit={handleColumns}> */}
        <div className='textfields' key={i.key}>
         <label className='textlabels'>Enter subcolumns</label>
         <Input  type="number" 
         value={i.sub || i.children.length} onChange={(e) => handleSubcolumns(index, e,i )}
                   key={index}

          />
            <div>
        {i.children.length > 0 && i.children?.map((j,ind) => 
        <div className='textfields' key={j.key}>
        <label className='textlabels'>Enter {j.dataIndex} name</label>
        <Input  type="text" 
        value={j.title} onChange={(e) => handleSubcol(index,ind, e,j,i )}
                  key={index}

         />
      </div>
        )}
        </div>
       </div>
       {/* <div className='textfields'>
         <button type='button' onClick={handleColumns(i)}>Create subcolumns</button>
       </div>    */}
        {/* </form> */}
      
      </Panel>
          )}
    </Collapse>
        </div>    
        <div className='tablebuttons'>
        <Button onClick={handleColSave}>Save  </Button>
       </div> 
       </form>  
        </div> }
    </div>
  )
}

export default Tableform
