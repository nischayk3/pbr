import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Input, Table } from "antd";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import illustrations from "../../../../../assets/images/ViewCreation_bannerillustration.png";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../duck/actions/commonActions";
import {
	isLoadView,
	isNewView,
	resetView,
	sendSelectedParamData
} from "../../../../../duck/actions/viewAction";
import { getViews } from "../../../../../services/viewCreationPublishing";
import "./styles.scss";

const ScreenHeader = lazy(() =>
	import("../../../../../components/ScreenHeader/screenHeader")
);
const StatusBlock = lazy(() =>
	import("../../../../../components/StatusBlock/statusBlock")
);



export default function Landing() {
	const [searched, setSearched] = useState(false);
	const [viewList, setViewList] = useState([]);
	const [filterTable, setFilterTable] = useState(null);
	const [lastEightView, setLastEightView] = useState([]);
	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();
	const columns = [
		{
			title: "View",
			dataIndex: "view",
			key: "view",
			id: "view",
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
			title: "View Name",
			dataIndex: "view_name",
			key: "view_name",
			id: "view_name",
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
			title: "View Status",
			dataIndex: "view_status",
			key: "rep_status",
			id: "view_status",
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
			title: "View Version",
			dataIndex: "view_version",
			key: "view_version",
			id: "view_version",
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
			id: "created_by",
			render: (text, index) => {
				return (
					<div>
						<Avatar
							className="avatar-icon"
							style={{ backgroundColor: getRandomColor(index + 1) }}
						>
							{text.split("")[0].toUpperCase()}{" "}
						</Avatar>
						<span className="avatar-text">{text}</span>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		getViewsList();
		dispatch(isNewView(true));
	}, []);

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
			obj["view_disp_id"] = el.view_disp_id;
			obj["view"] = el.view;
			obj["view_name"] = el.view_name;
			obj["view_status"] = el.view_status;
			obj["view_version"] = el.view_version;
			obj["created_by"] = el.created_by;
			return arr.push(obj);
		});

		const filterTableSearch = arr.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterTable(filterTableSearch);
	};

	const getViewsList = async () => {
		let req = {};
		try {
			dispatch(showLoader());
			const getViewRes = await getViews(req);
			const viewRes = getViewRes["Data"];
			const viewResRev = viewRes != undefined ? viewRes.reverse() : [];
			const lastEight = viewResRev && viewResRev.slice(Math.max(viewResRev.length - 8, 0));
			setViewList(viewResRev);
			setLastEightView(lastEight && lastEight.reverse());
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	};

	return (
		<div>
			<ScreenHeader
				bannerbg={{
					background:
						"linear-gradient(180deg, rgba(224, 145, 15, 0.35) 0%, rgba(255, 208, 123, 0.42) 100%)",
				}}
				title={`Howdy ${sessionStorage.getItem("username")},`}
				description="Let’s get configuring some Views!"
				source={illustrations}
				sourceClass="geanealogy-image"
			/>

			<div className="landing-search-wrapper">
				<div className="landing-card">
					<Input.Search
						placeholder="Search by view ID or name"
						allowClear
						className="landing-btn"
						enterButton="Search"
						size="large"
						onSearch={search}
					/>
					{searched && (
						<Table
							className="landing-table"
							columns={columns}
							dataSource={filterTable === null ? viewList : filterTable}
							onRow={(record) => ({
								onClick: () => {
									history.push({
										pathname: `${match.url}/${record.view_disp_id}&${record.view_version}`,
										state: {
											viewId: record.view_disp_id,
											viewVersion: record.view_version,
										},
									});
								},
							})}
						/>
					)}
					<div
						className="create-new"
						onClick={() => {
							history.push(`${match.url}/0`);
							dispatch(resetView(true));
							dispatch(isLoadView(false));
							dispatch(sendSelectedParamData([]));
						}}
					>
						<PlusOutlined />
						<p>Create new view</p>
					</div>

					<div className="card-legends" id="legends-container">
						<h3 className="recent" id="rec-closed">
							Recently created views
						</h3>
						<div className="legends" id="legends-status">
							<p>
								<span className="drft" id="draft"></span>Draft
							</p>
							<p>
								<span className="await" id="awaiting"></span>Awaiting approval
							</p>
							<p>
								<span className="aprv" id="approved"></span>Approved
							</p>
							<p>
								<span className="reject" id="reject"></span>Reject
							</p>
						</div>
					</div>

					<div className="tile">
						{lastEightView.length > 0 &&
							lastEightView.map(
								(i, index) =>
									index < 8 && (
										<Link
											key={i.view_disp_id}
											to={{
												pathname: `${match.url}/${i.view_disp_id}&${i.view_version}`,
												state: {
													viewId: i.view_disp_id,
													viewVersion: i.view_version,
												},
											}}

										>
											<StatusBlock
												key={index}
												id={i.view}
												status={i.view_status}
											/>
										</Link>
									)
							)}
					</div>
				</div>
			</div>
		</div>
	);
}
