import React, { useState, useEffect } from "react";
import './tabs.scss';
import {
    FileDoneOutlined
} from '@ant-design/icons';
import { getMoleculeList } from "../../../../../../services/viewCreationPublishing";
import { getTemplatesList } from "../../../../../../services/eLogBookService";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../../../duck/actions/commonActions";
import { showNotification } from "../../../../../../duck/actions/commonActions";
import { sendSelectedMolecule } from "../../../../../../duck/actions/eLogBook";

export default function DataEntryFormTabs(props) {

    const [tabsList, setTabsList] = useState([]);
    const dispatch = useDispatch();

    const getMoleculeTemplates = async (mol) => {
        dispatch(showLoader())
        let req = {
            molecule: mol,
            limit: 6
        }
        let templates_list = await getTemplatesList(req)
        if (templates_list.statuscode == 200) {
            dispatch(sendSelectedMolecule(mol))
            if (templates_list.Data) {
                props.setTemplateData(templates_list.Data)
                dispatch(hideLoader())
            }
        }
        else {
            dispatch(showNotification('error', 'No data present for selected molecule'))
            dispatch(hideLoader())
        }
    }

    const handleClick = (tab_name) => {
        getMoleculeTemplates(tab_name)
        let items = [...tabsList]
        props.setId(tab_name)
        items.forEach((element, index) => {
            if (element.title === tab_name) {
                items[index].selected = true;
            }
            else {
                items[index].selected = false;
            }
        });
        setTabsList(items)
    }

    const getMoleculeLists = async () => {
        let req = {
            data: {},
            parameters: {}
        }
        let molecule_list = await getMoleculeList(req)
        if (molecule_list.Data && molecule_list.Data.hierarchy) {
            let tabs_list_data = molecule_list.Data.hierarchy
            tabs_list_data.forEach(v => {
                v.title = v.ds_name;
                v.icon = <FileDoneOutlined style={{ color: "#162154" }} />;
                v.selected = false;
            });
            setTabsList(tabs_list_data)
        }
    }

    useEffect(() => {
        getMoleculeLists()
    }, [])

    return (
        <div >
            {
                tabsList.map((i, idx) => {
                    return (
                        <div className={i.selected ? 'approval-cards-active' : 'approval-cards'} key={idx} onClick={() => handleClick(i.title)} >
                            <div className={'circle_icon'} >
                                {i.icon}
                            </div>
                            <div className={'card_desc'}>
                                <p className={'approve-desc'}>{i.title}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}