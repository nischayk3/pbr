import { Card } from 'antd';
import React from 'react';
import { currentDate } from '../../utils/dateHelper';
import './styles.scss';

const ScreenHeader = (props) => {
	return (
		<Card className='screen_header_wrap' style={props.bannerbg}>
			<div className='screen_header_head'>
				<div>
					<p className='screen_header_username'>{props.title}</p>
					<p className='screen_header_text'>{props.description}</p>
				</div>
				<div className={props.sourceClass}>
					<img src={props.source} />
				</div>
				<div>
					<span className='screen_header_resultdate'>{currentDate()}</span>
				</div>
			</div>
		</Card>
	);
};

export default ScreenHeader;
