
/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir
 */
import { DeleteTwoTone, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Popconfirm, Popover, Row, Select, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../../../../assets/images/Popup-Side.svg";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import { hideLoader, showLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { sendDrugSub } from '../../../../../duck/actions/viewHierarchyAction';
import { getAllViews, getProcessStep, getProcessStepMap, putMolecule, putProcessStep, putProcessStepMap } from "../../../../../services/viewHierarchyServices";
import "./hierStyle.scss";

const { TabPane } = Tabs;

function Hierarchy() {
	const [hierarchyName, setHierarchyName] = useState("Untitled");
	const { Option } = Select;
	const [moleculeData, setMoleculeData] = useState([]);
	const [stepData, setStepData] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [stepArray, setStepArray] = useState([]);
	const [count, setCount] = useState(1);
	const [stepCount, setStepCount] = useState(1);
	const [tableData, setTableData] = useState([]);
	const [activeTab, setActiveTab] = useState("Plant and molecules");
	const [onceSaved, setOnceSaved] = useState(false);
	const [stepSaved, setStepSaved] = useState(false);
	const [del, setDel] = useState([])
	const [deleted, setDeleted] = useState([])
	const dispatch = useDispatch();
	const hier_name = useSelector((state) => state.viewHierarchy.drugName);
	const load_drug = useSelector((state) => state.viewHierarchy.drugLoad);

	useEffect(() => {
		handleAdd();
		handleStepAdd();
		if (hier_name) {
			let name = hier_name.replace(/%20/g, " ");
			setHierarchyName(name);
		}
	}, []);

	useEffect(() => {
		const url = window.location.href
		let param = url.split('/')
		if (param.length > 0)
			LoadView(param)
	}, []
	);

	useEffect(() => {
		if (stepData && stepData.length > 0 && moleculeData && moleculeData.length > 0 && activeTab == "Process step mapping") {
			getStepMapping();
		}
	}, [activeTab]);

	const LoadView = async (param) => {
		dispatch(showLoader())
		if (param.length > 0 && param[param.length - 1] != 'untitled_view') {
			param = param[param.length - 1]
			let name = param.replace(/%20/g, " ");
			dispatch(sendDrugSub(name))
			setHierarchyName(name)
			let req = { ds_name: name }
			let res = await getAllViews(req)
			let res_step = await getProcessStep(req)
			/* istanbul ignore next */
			if (res['status-code'] == 200) {
				let data_molecule = [...res.Data]
				data_molecule = data_molecule.map((v, index) => ({ ...v, key: index + 1 }))
				setCount(Math.max(...data_molecule.map(o => o.key)) + 1)
				setMoleculeData(data_molecule)
			} else if (res?.Status === 403) {
				/* istanbul ignore next */
				dispatch(showNotification("error", 'You are not authorized', "It seems like you don't have permission to use this service."));
			}
			/* istanbul ignore next */
			if (res_step['statuscode'] == 200) {
				let data_step = [...res_step.data]
				data_step = data_step.map((v, index) => ({ ...v, key: index + 1 }))
				setStepCount(Math.max(...data_step.map(o => o.key)) + 1)
				setStepData(data_step)
			} else if (res_step?.Status === 403) {
				/* istanbul ignore next */
				dispatch(showNotification("error", 'You are not authorized', "It seems like you don't have permission to use this service."));
			}
		}
		dispatch(hideLoader())
	}

	const getStepMapping = async () => {
		dispatch(showLoader());
		let req = { ds_name: hierarchyName };
		let mapResponse = await getProcessStepMap(req);
		if (mapResponse["status-code"] == 200) {
			let data_response = mapResponse.Data.data && mapResponse.Data.data[0] ? mapResponse.Data.data[0] : []
			if (data_response) {
				data_response.forEach(function (row, index) {
					row.index = index;
				});
			}
			setTableData(data_response ? data_response : []);
			setStepArray(mapResponse.Data.options);
		} else if (mapResponse?.Status === 403) {
			/* istanbul ignore next */
			dispatch(showNotification("error", 'You are not authorized', "It seems like you don't have permission to use this service."));
		}
		dispatch(hideLoader());
	};

	const validate = (keyCount, keyData, keyName, currentStep) => {
		let data = [...keyData]
		let latest_data = data[data.length - 1]
		if (!data.length > 0) {
			return true
		}
		else {
			if (latest_data && latest_data[keyName] != '')
				return true
			else
				return false
		}
	}

	const plantMoleculeColumns =
		[
			{
				title: "Action",
				dataIndex: "action",
				width: "10%",
				render: (_, record) => (
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => handleDelete(record.key, record)}
					>
						<DeleteTwoTone twoToneColor="red" />
					</Popconfirm>
				)
			},
			{
				title: "Molecule",
				dataIndex: "product_num",
				key: "product_num",
				width: "20%",
				render: (text, record) =>
					moleculeData.map((data, index) => {
						if (record.key === data.key) {
							return (
								<Input
									type="text"
									name="product_num"
									value={data.product_num}
									onChange={(e) => handleChange(index, e)}
								/>
							);
						}
					})
			},
			{
				title: "Plant",
				dataIndex: "site_code",
				key: "site_code",
				width: "80%",
				render: (text, record) =>
					moleculeData.map((data, index) => {
						if (record.key === data.key) {
							return (
								<Input
									type="text"
									name="site_code"
									value={data.site_code}
									onChange={(e) => handleChange(index, e)}

								/>
							);
						}
					})
			}
		];

	const stepMapColumns =
		[
			{
				title: "Action",
				dataIndex: "action",
				width: "10%",
				render: (_, record) => (
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => handleStepDelete(record.key, record)}
					>
						<DeleteTwoTone twoToneColor="red" />
					</Popconfirm>
				)
			},
			{
				title: "Sequence No",
				dataIndex: "seq_no",
				key: "seq_no",
				width: "20%",
				render: (text, record) =>
					stepData.map((data, index) => {
						if (record.key === data.key) {
							return (
								<Input
									type="text"
									name="seq_no"
									value={data.seq_no}
									onChange={(e) => handleStepChange(index, e)}

								/>
							);
						}
					})
			},
			{
				title: "Process Step",
				dataIndex: "process_step",
				key: "process_step",
				width: "70%",
				render: (text, record) =>
					stepData.map((data, index) => {
						if (record.key === data.key) {
							return (
								<Input
									type="text"
									name="process_step"
									value={data.process_step}
									onChange={(e) => handleStepChange(index, e)}
								/>
							);
						}
					})
			}
		];

	/* istanbul ignore next */
	const handleProcessStepChange = (text, index, rec) => {
		dispatch(showLoader());
		let newAggrValue = [...tableData];
		newAggrValue[rec.index].process_step = text ? text.value : "";
		setTableData(newAggrValue);
		dispatch(hideLoader());
	};

	const mappingColumns = [
		{
			title: "Product",
			dataIndex: "parent_product_num",
			key: "parent_product_num",
			width: "200"
		},
		{
			title: "Plant",
			dataIndex: "site_num",
			key: "site_num",
			width: "200"
		},
		{
			title: "Level1",
			dataIndex: "l1_product",
			key: "l1_product",
			width: "200"
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: "200"
		},
		{
			title: "Process Step",
			dataIndex: "process_step",
			key: "process_step",
			width: "200",
			align: "left",
			render: (text, record, index) => {
				return (
					<Select
						row={1}
						className="filter-button"
						allowClear
						dropdownStyle={{ border: "10" }}
						// value={ }
						onChange={(e, value) => {
							handleProcessStepChange(value, index, record);
						}}
						{...(text && { value: text })}
						placeholder="Select Step"
						style={{ width: "100%", borderRadius: "4px", right: "15px" }}
					>
						{stepArray && stepArray.length > 0 ? stepArray.map((item, i) => (

							<Option value={item.process_step} key={i}>
								{item.process_step}
							</Option>
						)) : <Option >

						</Option>
						}
					</Select>
				);
			}
		}

	];


	const handleAdd = () => {
		let is_add = count <= 1 ? true : validate(count - 2, moleculeData, 'product_num', 'mol')
		if (is_add) {
			const newData = {
				key: count,
				site_code: "",
				product_num: ""
			};
			setMoleculeData([...moleculeData, newData]);
			setCount(count + 1);
		}
		else {
			dispatch(showNotification('error', 'Previous Row is empty'))
		}
	};

	const handleStepAdd = () => {
		let is_add = stepCount <= 1 ? true : validate(stepCount - 2, stepData, 'seq_no', 'step')
		if (is_add) {
			const newData = {
				key: stepCount,
				seq_no: "",
				process_step: ""
			};
			setStepData([...stepData, newData]);
			setStepCount(stepCount + 1);
		}
		else {
			dispatch(showNotification('error', 'Previous Row is empty'))
		}
	};

	const handleChange = (index, event) => {
		const { name, value } = event.target;
		const rowsInput = [...moleculeData];
		rowsInput[index][name] = value;
		setMoleculeData(rowsInput);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleStepChange = (index, event) => {

		const { name, value } = event.target;
		const rowsInput = [...stepData];
		rowsInput[index][name] = value;
		setStepArray(rowsInput.map(function (el) { return el.process_step; }));
		setStepData(rowsInput);
	};

	const handleDelete = (key, record) => {
		const dataSource = [...moleculeData];
		let deleted_data = [...del]
		setMoleculeData(dataSource.filter((item) => item.key !== key));
		// setCount(count - 1);
		let obj = {}
		obj[`${record.product_num}`] = record.site_code
		deleted_data.push(obj)
		setDel(deleted_data)
	};

	/* istanbul ignore next */
	const handleStepDelete = (key, record) => {
		const dataSource = [...stepData];
		let deleted_data = [...deleted]
		let obj = {}
		obj[`${record.seq_no}`] = record.process_step
		deleted_data.push(obj)
		setDeleted(deleted_data)
		setStepData(dataSource.filter((item) => item.key !== key));
		// setStepCount(stepCount - 1);
	};

	const handleChangeTab = (value) => {
		setActiveTab(value);
	};

	const handleNext = () => {
		if (activeTab == "Process steps")
			setActiveTab("Process step mapping");
		if (activeTab == "Plant and molecules")
			setActiveTab("Process steps");
	};

	const handleSave = async () => {
		if (activeTab == "Plant and molecules") {
			let req = {
				ds_name: hierarchyName,
				product_num: moleculeData.map((i) => { return parseInt(i.product_num); }),
				site_code: moleculeData.map((i) => { return i.site_code; }),
				delete_row: !onceSaved && !load_drug ? [] : del.length > 0 ? del : []
			};
			let response = await putMolecule(req);
			/* istanbul ignore next */
			if (response["statuscode"] == 200) {
				dispatch(showNotification('success', "Saved"))
				setDeleted([])
				setDel([])
				setOnceSaved(true)
			}
			else {
				dispatch(showNotification('error', response.message))
			}
		}
		if (activeTab == "Process steps") {
			let req = {
				ds_name: hierarchyName,
				seq_no: stepData.map((i) => { return parseInt(i.seq_no); }),
				process_step: stepData.map((i) => { return i.process_step; }),
				delete_row: !stepSaved && !load_drug ? [] : deleted.length > 0 ? deleted : []
			};
			let response = await putProcessStep(req);
			/* istanbul ignore next */
			if (response["statuscode"] == 200) {
				dispatch(showNotification('success', "Saved"))
				setDeleted([])
				setDel([])
				setStepSaved(true)
			}
			else {
				dispatch(showNotification('error', response.message))
			}
		}
		if (activeTab == "Process step mapping") {
			let req = {
				ds_name: hierarchyName,
				l1_product: tableData.map((i) => { return i.l1_product ? parseInt(i.l1_product) : ""; }),
				process_step: tableData.map((i) => { return i.process_step ? i.process_step : ""; }),
				site_num: tableData.map((i) => { return i.site_num ? i.site_num : ""; }),
				molecule_num: tableData.map((i) => { return i.parent_product_num ? i.parent_product_num : ""; }),
				delete_row: false
			};

			let response = await putProcessStepMap(req);
			/* istanbul ignore next */
			if (response["statuscode"] == 200) {
				dispatch(showNotification('success', "Saved"))
				setOnceSaved(true)

			}
			else {
				dispatch(showNotification('error', response.message))
			}
		}
	};

	return (

		<div className="custom-wrapper">
			<BreadCrumbWrapper urlName={
				`/dashboard/molecule_hierarchy_configuration/${hierarchyName}`}
				value={hierarchyName}
				data="Untitled" />
			<div className="custom-content-layout">
				{/* {!show ? */}
				<Card
					className="hierarchy-card"
					title={<span><span>Molecule Hierarchy Configuration -</span> <span className="title-card">{hierarchyName}</span> <span className="title-button"> </span></span>}
				>
					<Tabs className="hier-tab" activeKey={activeTab} onChange={handleChangeTab} tabBarExtraContent={<Button className="tab-button-two" onClick={() => handleSave()} >Save</Button>}>
						<TabPane tab="Plant and molecules" key="Plant and molecules">
							<p className="tab-title"> Enter the product and plant details for {hierarchyName} <Button className="data-button-one"> {activeTab == "Process step mapping" ? <span className="tab-button-text">Finish</span> : <span className="tab-button-text" onClick={() => handleNext()}>Next </span>} </Button><Popover className="popover-hier" content={<span className="popover-content">Please save the plant and molecules or process steps before moving to process step mapping</span>} title={false} trigger="hover">
								<InfoCircleOutlined style={{ padding: "0 5px" }} />
							</Popover> </p>
							<Table className="hierarchy-table" columns={plantMoleculeColumns} dataSource={moleculeData} pagination={false} />
							<div className="add-button">
								<Button
									onClick={() => handleAdd()}
									className="add-row-button"
								>
									<PlusOutlined />
									Add new row
								</Button>
							</div>
						</TabPane>
						<TabPane tab="Process steps" key="Process steps">
							<p className="tab-title">Enter the process step for {hierarchyName} <Button className="data-button"> {activeTab == "Process step mapping" ? <span className="tab-button-text">Finish</span> : <span className="tab-button-text" onClick={() => handleNext()}>Next</span>}</Button><Popover className="popover-hier" content={<span className="popover-content">Please save the plant and molecules or process steps before moving to process step mapping</span>} title={false} trigger="hover">
								<InfoCircleOutlined style={{ padding: "0 5px" }} />
							</Popover></p>
							<Table className="hierarchy-table" columns={stepMapColumns} dataSource={stepData} pagination={false} />
							<div className="add-button">
								<Button
									onClick={() => handleStepAdd()}
									className="add-row-button"
								>
									<PlusOutlined />
									Add new row
								</Button>
							</div>

						</TabPane>
						<TabPane tab="Process step mapping" key="Process step mapping">
							<p className="tab-title">Enter the process step for {hierarchyName}</p>
							<div className="map-grid">
								<Table className="hierarchy-map-table" columns={mappingColumns} dataSource={tableData} />
							</div>
						</TabPane>

					</Tabs>
				</Card>

				<Modal
					className="landing-modal"
					title="Create New Dashboard"
					visible={isModalVisible}
					//onOk={handleOk}
					onCancel={handleCancel}
					footer={[
						<Button className="custom-secondary-button" onClick={() =>
							handleOk()
						}>Let's Go!</Button>
					]}>
					<div>
						<Row>
							<Col span={12}>
								<img src={Banner} alt="Banner" />
							</Col>
							<Col span={12}>
								<Row>
									<p>Name of the drug you want to add</p>
									<Input
										placeholder="Enter Name"
										onChange={(e) => setHierarchyName(e.target.value)}
										value={hierarchyName}
									/>
								</Row>

							</Col>
						</Row>
					</div>

				</Modal>
			</div>
		</div>
	);
}


export default Hierarchy;
