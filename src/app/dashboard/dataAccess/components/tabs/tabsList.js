import React, { useState } from "react";
import './tabs.scss';
import {
    BarChartOutlined,
    FileDoneOutlined,
    FileSyncOutlined,
    FolderOpenOutlined,
} from '@ant-design/icons';



export default function DataAccessTabs() {

    const [tabsList, setTabsList] = useState([
        {
            title: "Genealogy",
            icon: <FileDoneOutlined style={{ color: "#162154" }} />,
            selected: false
        },
        {
            title: "Auto ML Analysis",
            icon: <BarChartOutlined style={{ color: "#162154" }} />,
            selected: false
        },
        {
            title: "Roles & Access",
            icon: <FileSyncOutlined style={{ color: "#162154" }} />,
            selected: false
        },
        {
            title: "Paper Batch Records",
            icon: <FolderOpenOutlined style={{ color: "#162154" }} />,
            selected: false
        }
    ]);

    const handleClick = (tab_name) => {
        let items = [...tabsList]
        items.forEach((element, index) => {
            if (element.title === tab_name && element.title == 'Genealogy') {
                items[index].selected = true;
            }
            else {
                items[index].selected = false;
            }
        });
        setTabsList(items)
    }

    return (
        <div>
            {
                tabsList.map((i) => {
                    return (
                        <div className={i.selected ? 'approval-cards-active' : 'approval-cards'} onClick={() => handleClick(i.title)} >
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