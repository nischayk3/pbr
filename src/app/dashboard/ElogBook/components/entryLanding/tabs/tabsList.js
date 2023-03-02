import { InboxOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../../duck/actions/commonActions";
import {
	sendSelectedMolecule,
	sendTemplateTiles
} from "../../../../../../duck/actions/eLogBook";
import { getTemplatesList } from "../../../../../../services/eLogBookService";
import { getMoleculeList } from "../../../../../../services/viewCreationPublishing";
import "./tabs.scss";

export default function DataEntryFormTabs(props) {
	const [tabsList, setTabsList] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(sendSelectedMolecule(""));
		dispatch(sendTemplateTiles([]));
	}, []);

	const getMoleculeTemplates = async (mol) => {
		dispatch(showLoader());
		let req = {
			molecule: mol,
			limit: 100,
		};
		let templates_list = await getTemplatesList(req);
		if (templates_list?.statuscode == 200) {
			dispatch(sendSelectedMolecule(mol));
			if (templates_list.Data) {
				dispatch(sendTemplateTiles(templates_list.Data));
			}
		} else {
			dispatch(
				showNotification("error", "No data present for selected product")
			);
			dispatch(hideLoader());
		}
	};

	const handleClick = (tab_name) => {
		getMoleculeTemplates(tab_name);
		let items = [...tabsList];
		props.setId(tab_name);
		items.forEach((element, index) => {
			if (element.title === tab_name) {
				items[index].selected = true;
			} else {
				items[index].selected = false;
			}
		});
		setTabsList(items);
	};

	const getMoleculeLists = async () => {
		let req = {
			data: {},
			parameters: {},
		};
		let molecule_list = await getMoleculeList(req);
		if (molecule_list.Data && molecule_list.Data.hierarchy) {
			let tabs_list_data = molecule_list.Data.hierarchy;
			tabs_list_data.forEach((v) => {
				v.title = v.ds_name;
				v.icon = <InboxOutlined style={{ color: "#162154" }} />;
				v.selected = false;
			});
			setTabsList(tabs_list_data);
			setFilterData(tabs_list_data);
		}
	};
	const searchMolecule = (value) => {
		console.log(value);
		if (value) {
			const filterData = tabsList.filter((o) =>
				Object.keys(o).some((k) =>
					String(o.ds_name).toLowerCase().includes(value.toLowerCase())
				)
			);
			setFilterData(filterData);
		} else {
			setFilterData(tabsList);
		}
	};
	useEffect(() => {
		getMoleculeLists();
	}, []);

	return (
		<div>
			<Input.Search
				className="tabs-search"
				placeholder="Search a product"
				onSearch={searchMolecule}
			/>
			<div className="tab_area">
				{filterData &&
					filterData.length > 0 &&
					filterData.map((i, idx) => {
						return (
							<div
								className={
									i.selected ? "approval-cards-active" : "approval-cards"
								}
								key={idx}
								onClick={() => handleClick(i.title)}
							>
								<div className={"circle_icon"}>{i.icon}</div>
								<div className={"card_desc"}>
									<p className={"approve-desc"}>{i.title}</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
