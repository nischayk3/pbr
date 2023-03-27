
import React, { useState } from "react";
import './tabsList.scss';



export default function DataAccessTabs(props) {
    let {setTabsList,tabsList,preData} = props
	const handleClick = (tab_name) => {
		let items = [...tabsList]
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
	return (
		<>
			{
				tabsList.map((i, index) => {
					return (
						<div id={'approval-cards-' + index} key={index} className={i.selected ? 'approval-cards-active': i.title == 'Tablet weight and Tablet hardness' ? preData?.Atablet> 0 ? 'approval-cards-active' : 'tablet-approval' 
						: i.title == 'Turret Speed' ? preData?.Cellulose > 0 ? 'approval-cards-active' : 'tablet-approval':'approval-cards'} onClick={() => handleClick(i.title)} >
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

		</>
	)

}