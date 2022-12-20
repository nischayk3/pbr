import React,{useState, useEffect} from 'react';
import {
	Button, Modal, Select,Table,Avatar, Divider, Tooltip
} from 'antd';
import './importForms.scss';
import { getFormList } from '../../../../../../../src/services/eLogBookService';
import * as moment from 'moment'

function ImportForm({isTemplateModal, sendDataToParent}) {
    const [formList, setFormList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Option } = Select;
	const [selectedLimit, setSelectedLimit] = useState("Nevest first");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
		getFormLists()
	}, [])

	const getFormLists = async () => {
		let req = {
			data: {},
			parameters: {}
		}
		let form_list = await getFormList(req)
		
			setFormList(form_list.Data)
	
		console.log(form_list.Data);
	}

        const JJ =[
        {
            key: 11,
            sticky: "New form",
            title: "New form",
           dateofcreation: "12 Jan 2022",
           formname: "Ravi",
           creator: ["Adfd", "Bfdger"]
        },
        {
            key: 12,
            sticky: "New form",
            title: "New form",
            dateofcreation: "13 Mar 2022",
            formname: "Ravii",
            creator: ["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"]
         },
         {
            key: 13,
            sticky: "New form",
            title: "New form",
           dateofcreation: "14 Jan 2022",
           formname: "Raviii",
           creator: ["Adfd", "Bfdger"]
        },
        {
            key: 14,
            sticky: "New form",
            title: "New form",
            dateofcreation: "15 Mar 2022",
            formname: "Raviiii",
            creator: ["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"]
         },
         {
            key: 15,
            sticky: "New form",
            title: "New form",
           dateofcreation: "16 Jan 2022",
           formname: "Raviiiii",
           creator: ["Adfd", "Bfdger"]
        },
        {
            key: 16,
            sticky: "New form",
            title: "New form",
            dateofcreation: "17 Mar 2022",
            formname: "Raviiiiii",
            creator:["Ardtfu", "Brdytfuyg", "Krdtfugy", "Hzxcv", "Pdfg"]
         
         }
    ]

    const [data, setData] = useState([])
 

    useEffect(() => {
		setIsModalVisible(isTemplateModal)
	},[isTemplateModal])

    useEffect(()=>{

    },[data])

    console.log(data);
    
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
            render: (text, record) =>{
				return (<p>{moment(record.created_on).format("DD MMM YYYY")}</p>)
				}
		},
		{
			title: "Form name",
			dataIndex: "form_name",
			key: "2",
			defaultSortOrder: "descend",
            width: '25%',
		},
		{
			title: "Creator",
			dataIndex: "creator",
			key: "3",
			defaultSortOrder: "descend",
            width: '50%',
            render: (text, record) =>{
				return (
					<Avatar
                              style={{
                                backgroundColor: "#0CE7CC",
                              }}
                            
                            >
                              {record.created_by.split("")[0]?.toUpperCase()}
                            </Avatar>
				)
				}
            // render: (text, record) =>{
            //     console.log(record);
			// 	return (<Avatar.Group
            //                 maxCount={3}
            //                 maxStyle={{
            //                   color: '#f56a00',
            //                   backgroundColor: '#fde3cf',
            //                 }}
            //               >
            //                 {record.creator.map((j, index) =>
                            
            //                 <Avatar
            //                   style={{
            //                     backgroundColor: "#0CE7CC",
            //                   }}
            //                   key={index}
            //                 >
            //                   {j.split("")[0]?.toUpperCase()}
            //                 </Avatar>
            //                 )}
                           
            //               </Avatar.Group>)
				// }
		},
		
	]
   
    const handleTemplate = () => {
        var filteredArray = formList.filter(function (item) {
            return selectedRowKeys.indexOf(item.form_disp_id) !== -1;
          });
          sendDataToParent(filteredArray);
          setIsModalVisible(false)
          console.log(filteredArray);
    }
  
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
					onClick={handleTemplate}
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
                        dataSource={formList}
						scroll={{ y: 200 }}
                        rowKey="form_disp_id"
                        rowSelection={rowSelection}
                        pagination={{ total: 85,
                        showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        defaultPageSize : 20,
                        defaultCurrent: 1,position:['topRight']
                    }}
                    
						bordered
					/>
				</div>
		</Modal >
  )
}

export default ImportForm
