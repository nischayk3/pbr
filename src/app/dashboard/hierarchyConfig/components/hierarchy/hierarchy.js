
/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 29 March, 2023
 * @Last Changed By - @Dinesh
 */
import { DeleteTwoTone, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Popconfirm, Popover, Row, Table, Tabs } from "antd";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import Banner from "../../../../../assets/images/Popup-Side.svg";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import { hideLoader, showLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { SaveProcessFoldermapping, getDrugSubstence, getProcessStepFolder, putMolecule, updateProcessStepFolder } from "../../../../../services/viewHierarchyServices";
import EditableTree from "./EditableTree/EditableTree";
import "./hierStyle.scss";
import ProcessStepMap from "./processStepMapping/processStepMap";

const { TabPane } = Tabs;

const Hierarchy = () => {
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();
	const location = useLocation();
	const params = queryString.parse(location.search);

	const [hierarchyName, setHierarchyName] = useState("");
	const [moleculeData, setMoleculeData] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [count, setCount] = useState(1);
	const [activeTab, setActiveTab] = useState("Plant and molecules");
	const [onceSaved, setOnceSaved] = useState(false);
	const [del, setDel] = useState([])
	const [deleted, setDeleted] = useState([])
	const [initTreeData, setInitTreeData] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [callbackStructure, setCallbackStructure] = useState(false);
	const [finalJson, setFinalJson] = useState({});
	const [url, setUrl] = useState('');


	const load_drug = useSelector((state) => state.viewHierarchy.drugLoad);

	useEffect(() => {
		handleAdd();
		if (Object.keys(params) && Object.keys(params).length > 0) {
			console.log("parammmmm", location);
			setUrl(location?.pathname);
			setHierarchyName(params?.drugname);
			if (params?.load) {

				LoadView(params?.drugname);
				setIsLoad(true)
			}
		}
	}, []);


	const LoadView = async (param) => {
		dispatch(showLoader())
		if (param.length > 0 && param[param.length - 1] != 'untitled_view') {
			let req = { ds_name: param }
			let res = await getDrugSubstence(req)
			let res_step = await getProcessStepFolder(req)
			if (res.status === 200) {
				let data_molecule = [...res.data]
				data_molecule = data_molecule.map((v, index) => ({ ...v, key: index + 1 }))
				setCount(Math.max(...data_molecule.map(o => o.key)) + 1)
				setMoleculeData(data_molecule)
			} else if (res.status === 400) {
				setMoleculeData([]);
				dispatch(showNotification("error", res.message));
			} else if (res.status === 404) {
				setMoleculeData([])
				dispatch(showNotification("error", res.message));
			} else {
				setMoleculeData([]);
			}

			if (res_step.status == 200) {
				setInitTreeData([res_step?.data?.process_steps]);
			} else if (res_step.status === 400) {
				setInitTreeData([]);
				dispatch(showNotification("error", res_step.message));
			} else if (res_step.status === 404) {
				setInitTreeData([]);
				dispatch(showNotification("error", res_step.message));
			} else {
				setInitTreeData([]);
			}
		}
		dispatch(hideLoader())
	}


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

	/* istanbul ignore next */
	const handleDelete = (key, record) => {
		const dataSource = [...moleculeData];
		let deleted_data = [...del]
		setMoleculeData(dataSource.filter((item) => item.key !== key));
		let obj = {}
		obj[`${record.product_num}`] = record.site_code
		deleted_data.push(obj)
		setDel(deleted_data)
	};

	const handleChangeTab = (value) => {
		setActiveTab(value);
		if (value === 'Plant and molecules') {
			if (isLoad) {
				history.push(`${match.url}/plant-molecule?drugname=${hierarchyName}&load=true`);
			} else {
				history.push(`${match.url}/plant-molecule?drugname=${hierarchyName}`);
			}
		} else if (value === 'Process steps') {
			if (isLoad) {
				history.push(`${match.url}/process-steps?drugname=${hierarchyName}&load=true`);
			} else {
				history.push(`${match.url}/process-steps?drugname=${hierarchyName}`);
			}

		} else {
			if (isLoad) {
				history.push(`${match.url}/process-steps-mapping?drugname=${hierarchyName}&load=true`);

			} else {
				history.push(`${match.url}/process-steps-mapping?drugname=${hierarchyName}`);
			}
		}
	};

	/* istanbul ignore next */
	const handleNext = () => {
		if (activeTab == "Process steps") {
			handleChangeTab("Process step mapping");
			setActiveTab("Process step mapping");
		}
		if (activeTab == "Plant and molecules") {
			handleChangeTab("Process steps");
			setActiveTab("Process steps");
		}
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
			if (response.status == 200) {
				dispatch(showNotification("success", `Drug substance ${hierarchyName} has been saved successfully.`));
				setDeleted([])
				setDel([])
				setOnceSaved(true)
			} else if (response.status === 400) {
				dispatch(showNotification("error", response.message));
			} else if (response.status === 404) {
				dispatch(showNotification("error", response.message));
			}

		}

		/* istanbul ignore next */
		if (activeTab == "Process steps") {
			setCallbackStructure(true)

		}

		/* istanbul ignore next */
		if (activeTab == "Process step mapping") {
			let _req = {
				ds_name: hierarchyName,
				process_mapping: finalJson,
			};

			await saveprocessMap(_req)
		}
	};

	const callbackTree = (treeData) => {
		const folderStructure = {
			ds_name: hierarchyName,
			process_step: treeData && treeData[0]
		}
		saveTreeStructure(folderStructure);
	}

	/**
	 * Folder Struture Save API CALL
	 */

	const saveTreeStructure = async (_payload) => {
		const apiRes = await updateProcessStepFolder(_payload)
		if (apiRes.status === 200) {
			dispatch(showNotification("success", `Drug substance ${hierarchyName} has been saved successfully.`));
		} else if (apiRes.status === 400) {
			dispatch(showNotification("error", apiRes.message));
		} else if (apiRes.status === 404) {
			dispatch(showNotification("error", apiRes.message));
		}
	}

	const saveprocessMap = async (_payload) => {
		const apiRes = await SaveProcessFoldermapping(_payload)
		if (apiRes.status === 200) {
			dispatch(showNotification("success", `Drug substance ${hierarchyName} has been saved successfully.`));
		} else if (apiRes.status === 400) {
			dispatch(showNotification("error", apiRes.message));
		} else if (apiRes.status === 404) {
			dispatch(showNotification("error", apiRes.message));
		}
	}



	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper urlName={url}
				value={hierarchyName}
				data="Untitled" />
			<div className="custom-content-layout">
				<Card
					className="hierarchy-card"
					title={<span><span>Molecule Hierarchy Configuration -</span> <span className="title-card">{hierarchyName}</span> <span className="title-button"> </span></span>}
				>
					<Tabs className="hier-tab" activeKey={activeTab} onChange={handleChangeTab} >
						<TabPane tab="Plant and molecules" key="Plant and molecules" className="hier-tab__containet">
							<div className="hier-tab__button">
								<p className="tab-title"> Enter the product and plant details for {hierarchyName}
									<Popover className="popover-hier" content={<span className="popover-content">Please save the plant and molecules or process steps before moving to process step mapping</span>} title={false} trigger="hover">
										<InfoCircleOutlined style={{ padding: "0 5px" }} />
									</Popover>
								</p>
								<div>
									<Button className="custom-primary-btn"> {activeTab == "Process step mapping" ?
										<span className="tab-button-text">Finish</span> :
										<span className="tab-button-text" onClick={() => handleNext()}>Next
										</span>}
									</Button>
									<Button className="custom-secondary-btn" onClick={() => handleSave()} >Save hierarchy</Button>
								</div>
							</div>

							<Table className='expandable-table hierarchy-table' columns={plantMoleculeColumns} dataSource={moleculeData} pagination={false} />
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

						<TabPane tab="Process steps" key="Process steps" className="hier-tab__containet">
							<div className="hier-tab__button">
								<p className="tab-title">The following processess and process steps can be left-clicked to create subsequent processess and to perform a bunch of other actions:</p>
								<div>
									<Button className="custom-primary-btn" onClick={() => handleNext()} >
										Next
									</Button>
									<Button className="custom-secondary-btn" onClick={() => handleSave()} >Save hierarchy</Button>
								</div>
							</div>
							<EditableTree drugName={hierarchyName} treeData={initTreeData} isLoad={isLoad} callbackStructure={callbackStructure} callbackData={callbackTree} />
						</TabPane>

						<TabPane tab="Process step mapping" key="Process step mapping" className="hier-tab__containet">
							<div className="hier-tab__button">
								<p className="tab-title">Enter the process step for {hierarchyName}</p>
								<Button className="custom-secondary-btn" onClick={() => handleSave()} >Save hierarchy</Button>
							</div>

							<div className="map-grid">
								<ProcessStepMap drugName={hierarchyName} activeTab={activeTab} finalJson={finalJson} setFinalJson={setFinalJson} isLoad={isLoad} />
							</div>
						</TabPane>
					</Tabs>
				</Card>

				<Modal
					className="landing-modal"
					title="Create New Dashboard"
					visible={isModalVisible}
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
