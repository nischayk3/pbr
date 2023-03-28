import React from 'react';
import './ContextMenu.scss';

const ContextMenu = (props) => {
	const { x, y, show, item } = props;

	return (
		<div
			className='context__menu'
			style={{
				position: 'absolute',
				// left: `${x}px`,
				// top: `${y}px`,
				display: show ? 'block' : 'none',
			}}
		>
			<ul>
				{item.map((e, i) => {
					return <li key={i}>{e.label}</li>
				})}
			</ul>
		</div>
	);
};

export default ContextMenu;