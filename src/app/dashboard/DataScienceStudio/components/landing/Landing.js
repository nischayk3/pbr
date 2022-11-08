import { PlusOutlined } from "@ant-design/icons";
import React, { lazy, useState } from "react";
import illustrations from "../../../../../assets/images/dss-landing.png";
import jupyter_logo from "../../../../../assets/images/jupyter.png";
import LoadDataSet from "../loadDataSet/LoadDataSet";
import Viewset from "../viewSet/Viewset";
import "./styles.scss";
const ScreenHeader = lazy(() =>
	import("../../../../../components/ScreenHeader/screenHeader")
);

export default function Landing() {
	const [isViewsetVisible, setIsViewsetVisible] = useState(false);
	const [isDatasetVisible, setIsDatasetVisible] = useState(false);

	const onCancel = () => {
		setIsViewsetVisible(false)
		setIsDatasetVisible(false)
	}

	const login_response = JSON.parse(localStorage.getItem("login_details"));
	console.log("login_response", login_response?.firstname?.toLowerCase(), login_response?.lastname?.toLowerCase());
	return (
		<div>
			<ScreenHeader
				bannerbg={{
					background:
						"linear-gradient(180deg, #FFC3C3 0%, #FFF4F4 100%)",
				}}
				title={`Howdy ${localStorage.getItem("username")},`}
				description="Welcome to Data Science Studio!"
				source={illustrations}
				sourceClass="geanealogy-image"
			/>
			<div className="landing-card-wrapper">
				<div className="card-center">
					<div
						className="create-new"
						onClick={() => {
							setIsDatasetVisible(true)
						}}
					>
						<PlusOutlined />
						<p>Load dataset</p>
					</div>
					<div
						className="create-new"
						onClick={() => {
							setIsViewsetVisible(true)
						}}
					>
						<PlusOutlined />
						<p>Select a view</p>
					</div>
					<div
						className="jupyter-card"
						onClick={
							() => window.open("https://jupyterhub-dev.mareana.com", "_blank")
						}
					>
						<img src={jupyter_logo} />
						<p>Explore on your own</p>
						<span>RECOMMENDED FOR POWER USERS</span>
					</div>
				</div>
			</div>
			<Viewset isVisible={isViewsetVisible} onCancel={onCancel} />
			<LoadDataSet isVisibleDataset={isDatasetVisible} onCancel={onCancel} />
		</div >
	);
}
