import React, { useState } from "react";
import { Card } from "antd";
import './contentArea.scss'
import TabContent from "./tabContent";

export default function DataAccessContentArea() {

    const [activeTabKey, setActiveTabKey] = useState('tab1');

    const tabList = [
        {
            key: 'tab1',
            tab: 'Genealogy Extraction',
        },
        // {
        //     key: 'tab2',
        //     tab: 'Metadata Extraction',
        // },
        // {
        //     key: 'tab3',
        //     tab: 'Bulk Data Extraction',
        // },
    ];
    const contentList = {
        tab1: <TabContent />,
        tab2: <p>content2</p>,
        tab3: <p>content3</p>,
    };
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };
    return (
        <div className="content-card">
            <Card
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    onTabChange(key);
                }}
                title={false}>
                {contentList[activeTabKey]}
            </Card>
        </div>
    )
}