import React from 'react';
import './block.scss';

const statusColor = status => {
	if (status == 'APRD' || status == 'approved') {
		return 'aprd';
	}
	if (status == 'DRFT') {
		return 'drft';
	}
	if (status == 'AWAP' || status == 'unapproved' || status == "Unapproved") {
		return 'awap';
	}
	if (status == 'REJECT') {
		return 'reject';
	}
};

const StatusBlock = props => {
	return (
		<div className='chart-tiles' onClick={props.handleClickTiles}>
			<div className={`tile-status ${statusColor(props.status)}`}>
				{props.status}
			</div>
			<div className='tile-name'>
				<span className='id'>{props.id}</span>
				<span className='name'>{props.name}</span>
			</div>
		</div>
	);
};

export default StatusBlock;
