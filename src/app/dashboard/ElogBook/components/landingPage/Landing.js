import { Avatar, Button, Collapse, Pagination, Table, Tag } from "antd";
import React, { lazy, useState } from "react";
import illustrations from "../../../../../assets/images/elogbook-landing.png";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import SelectField from "../../../../../components/SelectField/SelectField";
import ElogForm from "../eLogbookForm/eLogbookForm";
import "./styles.scss";
const ScreenHeader = lazy(() =>
	import("../../../../../components/ScreenHeader/screenHeader")
);

export default function Landing() {
	const [isViewsetVisible, setIsViewsetVisible] = useState(false);
	const [isTemplateModal, setIsTemplateModal] = useState(false);
	const [filterData, setFilterData] = useState("");

	const { Panel } = Collapse;

	const filterList = ["Newest first"]

	const onCancel = () => {
		setIsViewsetVisible(false)
		setIsDatasetVisible(false)
	}

	const login_response = JSON.parse(localStorage.getItem("login_details"));
	console.log("login_response", login_response?.firstname?.toLowerCase(), login_response?.lastname?.toLowerCase());

	const text = (
		<p
			style={{
				paddingLeft: 24,
			}}
		>
			A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
			as a welcome guest in many households across the world.
		</p>
	);

	const columns = [
		{
			title: 'Date of creation',
			dataIndex: 'doc',
			key: 'doc',
			width: 40,

		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 10,
		},
		{
			title: 'Contributors',
			dataIndex: 'cont',
			key: 'cont',
			width: 20,
		},
		{
			title: 'Version',
			key: 'version',
			dataIndex: 'version',
			width: 20,
		},

	];
	const data = [
		{
			key: '1',
			doc: '23 June 2022',
			name: '155885001_123456_550',
			cont: <Avatar>A</Avatar>,
			version: '2.0',
		},

	];
	return (
		<div className='custom-wrapper'>
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<ScreenHeader
					bannerbg={{
						background:
							"linear-gradient(180deg, #E7E5FF 0%, #FFF4F4 100%)",
					}}
					title={`Howdy ${localStorage.getItem("username")},`}
					description="In the mood to create some templates today?"
					source={illustrations}
					sourceClass="geanealogy-image"
				/>
				<div className="landing-card-wrapper">
					<div className="panel-header">
						<Button
							className="custom-secondary-btn"
							type="primary"
							onClick={(e) => {
								setIsTemplateModal(true)
							}}
						>
							Create new template
						</Button>

						<div className="filter-tab">
							<div className="filter">
								<p>Show</p>
								<SelectField
									defaultValue="Newest first"
									selectList={filterList}
									// selectedValue={filterData}
									onChangeSelect={(e) =>
										setFilterData(e)
									}
								/>
							</div>

							<Pagination
								total={20}
								showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
								defaultPageSize={20}
								defaultCurrent={1}
							/>
						</div>
					</div>
					<Collapse bordered={false}
					// defaultActiveKey={['1']}
					>
						<Panel header={
							(<Tag color="yellow">In progress</Tag>)
						} key="1">
							<Table bordered={false} columns={columns} dataSource={data} className="elog-table" />
						</Panel>
						<Panel header={
							(<Tag color="green">Approved</Tag>)
						} key="2">
							<Table bordered={false} columns={columns} dataSource={data} className="elog-table" />
						</Panel>
						<Panel header={
							(<Tag color="red">Rejected</Tag>)
						} key="3">
							<Table bordered={false} columns={columns} dataSource={data} className="elog-table" />
						</Panel>
					</Collapse>
					<ElogForm isTemplateModal={isTemplateModal} />
				</div>
			</div>
		</div >

	);
}
