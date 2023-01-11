import {
	BarChartOutlined,
	FileDoneOutlined,
	FileSyncOutlined,
	FolderOpenOutlined,
	LayoutOutlined,
	ProjectOutlined
} from '@ant-design/icons';
import React from 'react';
import './styles.scss';

const customCard = (props) => {

	return (
		<div id={'approval-cards-' + props.id} key={props.id} className={props.count === 0 ? 'approval-cards-disabled' : props.active === props.desc ? 'approval-card-active' : 'approval-card'} >
			<div className={props.count === 0 ? 'circle_icon-disabled' : 'circle_icon'} >
				{props.desc == 'View' && <LayoutOutlined />}
				{props.desc == 'Param Data' && <ProjectOutlined />}
				{props.desc == 'Chart personalization' && <BarChartOutlined />}
				{props.desc == 'Report' && <FileDoneOutlined />}
				{props.desc == 'Paper Batch Records' && <FolderOpenOutlined />}
				{props.desc == 'Data Load Screen' && <FileSyncOutlined />}
			</div>
			<div className={props.count === 0 ? 'card_desc-disabled' : 'card_desc'}>
				<p className={props.count === 0 ? 'approve-title-disabled' : 'approve-title'}>{props.count}</p>
				<p className={props.count === 0 ? 'approve-desc-disabled' : 'approve-desc'}>{props.desc}</p>
			</div>
		</div>
	)
}

export default customCard;
