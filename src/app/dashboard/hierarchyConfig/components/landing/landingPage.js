
/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 29 March, 2023
 * @Last Changed By - @Dinesh
 */

import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Banner from "../../../../../assets/images/Popup-Side.svg";
import illustrations from "../../../../../assets/images/ViewCreation_bannerillustration.png";
import ScreenHeader from "../../../../../components/ScreenHeader/screenHeader";
import StatusBlock from "../../../../../components/StatusBlock/statusBlock";
import { showNotification } from "../../../../../duck/actions/commonActions";
import {
	loadDrug, sendDrugSub
} from "../../../../../duck/actions/viewHierarchyAction";
import { getDrugSubstence } from "../../../../../services/viewHierarchyServices";
import "./landingStyle.scss";

export default function LandingPage() {
	const [searched, setSearched] = useState(false);
	const [viewList, setViewList] = useState([]);
	const [filterTable, setFilterTable] = useState(null);
	const [lastEightView, setLastEightView] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [hierarchyName, setHierarchyName] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		getViews();
	}, []);

	const loadHier = async (ds_name) => {
		dispatch(sendDrugSub(ds_name));
		dispatch(loadDrug(true));
		history.push(`/dashboard/molecule_hierarchy_configuration/tabs/plant-molecule?drugname=${ds_name}`);
	};


	const checkUnique = async (hierarchyName) => {
		const checkUnique = await uniqueDrug(hierarchyName, viewList, 'ds_name');
		console.log("checkUnique", checkUnique);
		if (checkUnique) {
			dispatch(showNotification('error', 'Drug substance name already present, please enter unique name'))
		} else {
			history.push(`/dashboard/molecule_hierarchy_configuration/tabs/plant-molecule?drugname=${hierarchyName}`);
		}
	}

	const uniqueDrug = (value, array, property) => {
		return array.some((item) => item[property] === value);
	}

	const getViews = async () => {
		let req = { limit: 8 };
		let reqs = {};
		let response = await getDrugSubstence(req);
		let response_two = await getDrugSubstence(reqs);

		if (response?.status == 200) {
			setLastEightView(response?.data);
		}

		if (response_two?.status == 200) {
			setViewList(response_two?.data);
		}
	};

	const columns = [
		{
			title: "Drug Substance",
			dataIndex: "ds_name",
			key: "ds_name",
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: "Product Number",
			dataIndex: "product_num",
			key: "product_num",
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: "Site Code",
			dataIndex: "site_code",
			key: "site_code",
			render: (text, record) => {
				return {
					props: {
						style: { background: record.color },
					},
					children: <div>{text}</div>,
				};
			},
		},
		{
			title: "Created By",
			dataIndex: "created_by",
			key: "created_by",
			render: (text, row, index) => {
				return (
					<div>
						<Avatar

							className="avatar-icon"
							style={{ backgroundColor: getRandomColor(index + 1), marginRight: '8px' }}
						>
							{text && text.split("")[0] && text.split("")[0].toUpperCase()}{" "}
						</Avatar>
						<span className="avatar-text">{text}</span>
					</div>
				);
			},
		},
	];

	const getRandomColor = (index) => {
		let colors = ["#56483F", "#728C69", "#c04000", "#c19578"];
		return colors[index % 4];
	};

	const search = (value) => {
		let arr = [];
		setSearched(true);
		const tableData = [...viewList];

		tableData.map((el) => {
			let obj = {};
			obj["created_by"] = el.created_by;
			obj["created_on"] = el.created_on;
			obj["view_name"] = el.view_name;
			obj["ds_name"] = el.ds_name;
			obj["product_num"] = el.product_num;
			obj["site_code"] = el.site_code;
			return arr.push(obj);
		});

		const filterTableSearch = arr.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterTable(filterTableSearch);
	};

	return (
		<div>
			<ScreenHeader
				bannerbg={{
					background:
						"linear-gradient(180deg, rgba(252, 192, 166, 0.65) 0%, #F5CACA 100%), linear-gradient(180deg, #FFFFFF 0%, #FFC7C7 100%)",
				}}
				title={`Howdy ${localStorage.getItem("username")},`}
				description="Let’s get configuring some Views!"
				source={illustrations}
				sourceClass="geanealogy-image"
			/>

			<div className="landing-search-wrapper">
				<div className="landing-card">
					<div className="landing-input">
						<Input.Search
							placeholder="Search by drug substance name"
							allowClear
							className="landing-btn"
							enterButton="Search"
							size="large"
							onSearch={search}
						/>
					</div>
					{searched ? (
						<Table
							className="landing-table"
							columns={columns}
							dataSource={filterTable === null ? viewList : filterTable}
							onRow={(record) => ({
								onClick: (e) => {
									loadHier(record.ds_name);
								},
							})}

							size="small"
						/>
					) : (
						<></>
					)}
					<div
						className="create-new"
						onClick={() => {
							setIsModalVisible(true);
						}}
					>
						<PlusOutlined />
						<p>Create new hierarchy</p>
					</div>

					<div className="card-legends">
						<h3 className="recent">Recently created views</h3>
					</div>


					<div className="tile">
						{lastEightView?.length > 0 ? (
							lastEightView?.map((i, index) => (
								<div
									key={i.created_on}
									onClick={() => {
										loadHier(i.ds_name);
									}}
								>
									<StatusBlock
										key={i.created_on}
										id={i.ds_name}
										status={i.view_status}
									// handleClickTiles={e => handleClickView(e, i)}
									/>
								</div>
							))
						) : (
							<></>
						)}
					</div>

				</div>
			</div>
			<div>
				<Modal
					className="landing-modal"
					title="Create New Hierarchy"
					visible={isModalVisible}
					onCancel={handleCancel}
					footer={[
						<Button
							key={hierarchyName}
							disabled={!hierarchyName.length > 0}
							className="custom-primary-button"
							onClick={() => checkUnique(hierarchyName)}
						>
							Let's Go!
						</Button>,
					]}
				>
					<div>
						<Row>
							<Col span={12}>
								<img src={Banner} />
							</Col>
							<Col span={12}>
								<Row>
									<p>Name of the drug you want to add</p>
									<div className="input-ant">
										<Input
											placeholder="Enter Name"
											onChange={(e) => {
												setHierarchyName(e.target.value);
												dispatch(sendDrugSub(e.target.value));
												dispatch(loadDrug(false));
											}}
											value={hierarchyName}
										/>
									</div>
								</Row>
							</Col>
						</Row>
					</div>
				</Modal>
			</div>
		</div>
	);
}
