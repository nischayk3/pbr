import { Input } from 'antd';
import React,{ useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './forms.scss'

function Tableform({ layout, current, tableData, setTableData,setLayout, formData, setFormData, selecttable,editColumn,editRow,columnData, setColumnData}) {
    const [datas, setDatas] = useState([]);
    // const [formData, setFormData] = useState({  columns: '',rows: '' });
   
    const [columns, setColumns] = useState([
    //     {
    //     align: "center",
    //     dataIndex: "sample",
    //     editable: true,
    //     key: uuidv4(),
    //     label: "Sample Name",
    //     name: "Sample Name",
    //     title: "Sample Name",
    //     type: "input"
    // },
    // {
    //     align: "center",
    //     dataIndex: "loc_1",
    //     editable: true,
    //     key: uuidv4(),
    //     label: "Location 1",
    //     name: "Location 1",
    //     title: "Location 1",
    //     type: "input"
    // } 
]);
    const [rows, setRows] = useState([
        
    ]);

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
            type: "" })
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
      };
      
      
      const handleChange = (e) => {
        setColumnData({...columnData, title: e.target.value})
        const templayout = JSON.parse(JSON.stringify(layout));
        templayout.forEach(row => {
         row.children.forEach((col) => {
             col.children.forEach((component) => {
                component.columns.forEach((colid) => {
                 if(colid.key === columnData.id){
                    colid.title= e.target.value;
                        //  component.columns=tempColumns;
                   
                 }
                })
             })
         } )
        });
        setLayout(templayout)
                // let fields_data = [...columns]
                // var foundIndex =
                //  fields_data.findIndex(x => x.key == id);
                //         fields_data[foundIndex]['title'] = event
                    
                  
                    
                
                // setColumns(fields_data)
            }

  return (
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
        {/* {editColumn.length > 0 ? editColumn.map((i) =>  */}
      <div className='textfields'>
          <label className='textlabels'>Enter Column title</label>
          <Input name="title" type="text" value={ columnData.title} onChange={(e) => handleChange(e)} />
        </div>
        {/* ) : ''} */}
      </form>
    </div>
  )
}

export default Tableform
