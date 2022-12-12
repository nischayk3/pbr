import React,{useState, useEffect} from 'react';
import {
	Button, Modal, Select,Table,Avatar, Divider, Tooltip
} from 'antd';
import './importForms.scss';

function ImportForm({isTemplateModal}) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Option } = Select;
	const [selectedLimit, setSelectedLimit] = useState("Nevest first");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [ta, setTa] = useState([])
        const JJ =[
        {
            key: 1,
           dateofcreation: "12 Jan 2022",
           formname: "Ravi",
           creator: ["Adfd", "Bfdger"]
        },
        {
            key: 2,
            dateofcreation: "12 Mar 2022",
            formname: "Ravi",
            creator: ["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"]
         },
         {
            key: 3,
           dateofcreation: "12 Jan 2022",
           formname: "Ravi",
           creator: ["Adfd", "Bfdger"]
        },
        {
            key: 4,
            dateofcreation: "12 Mar 2022",
            formname: "Ravi",
            creator: ["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"]
         },
         {
            key: 5,
           dateofcreation: "12 Jan 2022",
           formname: "Ravi",
           creator: ["Adfd", "Bfdger"]
        },
        {
            key: 6,
            dateofcreation: "12 Mar 2022",
            formname: "Ravi",
            creator:["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"]
         
         }
    ]

    const [data, setData] = useState([])
    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    useEffect(() => {
		setIsModalVisible(isTemplateModal)
       
            JJ.map((i) =>{
        data.push(   {
                key: i.key,
                dateofcreation: i.dateofcreation,
                formname: i.formname,
                creator: <Avatar.Group
                maxCount={3}
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                }}
              >
                {i.creator.map((j, index) =>
                <Avatar
                  style={{
                    backgroundColor: "#0CE7CC",
                  }}
                  key={index}
                >
                  {j.split("")[0]?.toUpperCase()}
                </Avatar>
                )}
               
              </Avatar.Group>
            })
            
        }
        )
       
        const fil = Object.values(data.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}));
    var uniq = {};
    var arrFiltered = data.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));
    console.log('arrFiltered', arrFiltered);
	console.log(data,fil);
	},[isTemplateModal])

    
    
	const handleCancel = () => {
		setIsModalVisible(false);
	};
    const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    //   selections: [
    //     Table.SELECTION_ALL,
    //     Table.SELECTION_INVERT,
    //     Table.SELECTION_NONE,
        // {
        //   key: 'odd',
        //   text: 'Select Odd Row',
        //   onSelect: (changableRowKeys) => {
        //     let newSelectedRowKeys = [];
        //     newSelectedRowKeys = changableRowKeys.filter((_, index) => {
        //       if (index % 2 !== 0) {
        //         return false;
        //       }
        //       return true;
        //     });
        //     setSelectedRowKeys(newSelectedRowKeys);
        //   },
        // },
        // {
        //   key: 'even',
        //   text: 'Select Even Row',
        //   onSelect: (changableRowKeys) => {
        //     let newSelectedRowKeys = [];
        //     newSelectedRowKeys = changableRowKeys.filter((_, index) => {
        //       if (index % 2 !== 0) {
        //         return true;
        //       }
        //       return false;
        //     });
        //     setSelectedRowKeys(newSelectedRowKeys);
        //   },
        // },
    //   ],
    };

    const columns = [
		{
			title: "Date of creation",
			dataIndex: "dateofcreation",
			key: "1",
			defaultSortOrder: "descend",
            width: '25%',
		},
		{
			title: "Form name",
			dataIndex: "formname",
			key: "2",
			defaultSortOrder: "descend",
            width: '25%',
		},
		{
			title: "Creator",
			dataIndex: "creator",
			key: "3",
			defaultSortOrder: "descend",
            width: '50%'
		},
		
	]

    const Avt = () => {
        return(
            <Avatar.Group
           maxCount={3}
           maxStyle={{
             color: '#f56a00',
             backgroundColor: '#fde3cf',
           }}
         >
           {["Adfd", "Bfdger"].map((j, index) =>
           <Avatar
             style={{
               backgroundColor: "#0CE7CC",
             }}
             key={index}
           >
             {j.split("")[0]?.toUpperCase()}
           </Avatar>
           )}
          
         </Avatar.Group>
        )
    }
    const TableData = [
        {
            key: 1,
           dateofcreation: "12 Jan 2022",
           formname: "Ravi",
           creator: <Avatar.Group
           maxCount={3}
           maxStyle={{
             color: '#f56a00',
             backgroundColor: '#fde3cf',
           }}
         >
           {["Adfd", "Bfdger"].map((j, index) =>
           <Avatar
             style={{
               backgroundColor: "#0CE7CC",
             }}
             key={index}
           >
             {j.split("")[0]?.toUpperCase()}
           </Avatar>
           )}
          
         </Avatar.Group>
        },
        {
            key: 2,
            dateofcreation: "12 Mar 2022",
            formname: "Ravi",
            creator: <Avatar.Group
            maxCount={3}
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            {["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"].map((j, index) =>
            <Avatar
              style={{
                backgroundColor: "red",
              }}
              key={index}
            >
              {j.split("")[0]?.toUpperCase()}
            </Avatar>
            )}
           
          </Avatar.Group>
         },
         {
            key: 3,
           dateofcreation: "12 Jan 2022",
           formname: "Ravi",
           creator: <Avatar.Group
           maxCount={3}
           maxStyle={{
             color: '#f56a00',
             backgroundColor: '#fde3cf',
           }}
         >
           {["Adfd", "Bfdger"].map((j, index) =>
           <Avatar
             style={{
               backgroundColor: "#0CE7CC",
             }}
             key={index}
           >
             {j.split("")[0]?.toUpperCase()}
           </Avatar>
           )}
          
         </Avatar.Group>
        },
        {
            key: 4,
            dateofcreation: "12 Mar 2022",
            formname: "Ravi",
            creator: <Avatar.Group
            maxCount={3}
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            {["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"].map((j, index) =>
            <Avatar
              style={{
                backgroundColor: "red",
              }}
              key={index}
            >
              {j.split("")[0]?.toUpperCase()}
            </Avatar>
            )}
           
          </Avatar.Group>
         },
         {
            key: 5,
           dateofcreation: "12 Jan 2022",
           formname: "Ravi",
           creator: <Avatar.Group
           maxCount={3}
           maxStyle={{
             color: '#f56a00',
             backgroundColor: '#fde3cf',
           }}
         >
           {["Adfd", "Bfdger"].map((j, index) =>
           <Avatar
             style={{
               backgroundColor: "#0CE7CC",
             }}
             key={index}
           >
             {j.split("")[0]?.toUpperCase()}
           </Avatar>
           )}
          
         </Avatar.Group>
        },
        {
            key: 6,
            dateofcreation: "12 Mar 2022",
            formname: "Ravi",
            creator: <Avatar.Group
            maxCount={3}
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            {["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"].map((j, index) =>
            <Avatar
              style={{
                backgroundColor: "red",
              }}
              key={index}
            >
              {j.split("")[0]?.toUpperCase()}
            </Avatar>
            )}
           
          </Avatar.Group>
         }
    ]

  
  return (
    <Modal
			className="landing-modal"
			title="Form library"
			visible={isModalVisible}
			onCancel={handleCancel}
			width={900}
			centered
            footer={null}
		>
			<div className="main-form">
				<div className="import-modal-left">
					<p className='paragraph-text'>Select the forms your want to add to the template.</p>
				</div>

				<div className="import-modal-right">

                <Button
					className="custom-primary-btn back-button"
					// onClick={onCancel}
					id='back-btn'
				>
					Back
				</Button>
				
                <Button
					type='primary'
					className='custom-secondary-btn temp-button'
					// onClick={dssViewLoad}
					// disabled={isDisable}
					id="next-btn"
				>
					Add to template
				</Button>
				</div>
			</div>
            <div className="custom-table-card" style={{ margin: "10px 0" }}>
					<div className="table-header">
						<div className="child-2">
                            <label className='filter-label'>Filter</label>
							<Select
                                className='filter-select'
								allowClear
								value={selectedLimit || undefined}
								placeholder="Select"
								// onChange={(e, value) => { onlimitChange(e, value) }}
							>
								<Option value="Nevest first" key="100">
                                Newest first
								</Option>
								
							</Select>
                            {/* <div className="filter-btn"> */}
						<Button
							className="custom-primary-btn "
							type="primary"
							onClick={() => {
								handleFilter();
							}}
						>
							Go
						</Button>
						</div>
					</div>
					<Table
						style={{ color: "#F0F0F0" }}
						size="small"
						columns={columns}
						// dataSource={filterTable === null ? tableData : filterTable}
                        dataSource={[...new Set(data)]}
						scroll={{ y: 200 }}
                        rowSelection={rowSelection}
                        pagination={{ total: 85,
                        showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        defaultPageSize : 20,
                        defaultCurrent: 1,position:['topRight']
                    }}
                    
						// pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '50', '100', '200'] }}
                        // pagination={{defaultCurrent:1, total:`1 to ${8}`, position:['topRight'],showTotal: (total) => `${total}` }}
						bordered
					/>
				</div>
		</Modal >
  )
}

export default ImportForm
