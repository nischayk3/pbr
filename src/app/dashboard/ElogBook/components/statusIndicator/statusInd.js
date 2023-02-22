import React from 'react';
import './statusInd.scss';

function StatusInd({ className, label }) {
	return (
		<div>
			<span className={className}></span>
			{label ? <span> <label className='labeltext'>{label}</label> </span> : ''}
		</div>
	)
}

export default StatusInd
