import { Button } from 'antd';
import React from 'react';
import './ContextMenu.scss';

const ContextMenu = (props) => {
	const { x, y, show, item, } = props;

	window.onclick = function (event) {
		if (event.target.className.baseVal !== "") {
			document.getElementById("#popup").style("display", "none");
		}
	};

	return (
		<div
			id="popup"
			className='context__menu'
			style={{
				position: 'absolute',
				left: `${x}px`,
				top: `${y}px`,
				display: show ? 'block' : 'none',
			}}
		>
			<ul>
				{item.map((e, i) => {
					return <li key={i}>
						<Button key={i} className='custom-secondary-btn-link' type='link' icon={e.icon} onClick={props.handleClick(e.eventName)}>
							{e.value}
						</Button>
					</li>
				})}
			</ul>
		</div>
	);
};

export default ContextMenu;