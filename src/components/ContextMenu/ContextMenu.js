/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 29 March, 2023
 * @Last Changed By - @Dinesh
 */

import { Button } from 'antd';
import React from 'react';
import './ContextMenu.scss';

const ContextMenu = (props) => {
	const { x, y, show, item, handleClick } = props;
	const contextMenu = document.getElementById("popup")
	window.onclick = function (event) {
		if (event.target.contextMenu !== contextMenu) {
			props.onClose(false)
		}
	};

	return (
		<div
			id="popup"
			className='context__menu'
			style={{
				position: 'fixed',
				zIndex: 10000,
				left: `${x}px`,
				top: `${y}px`,
				display: show ? 'block' : 'none',
			}}
		>
			<ul>
				{item.map((e, i) => {
					return <li key={e.eventName}>
						<Button disabled={e.visible} key={e.eventName} className='custom-secondary-btn-link' type='link' icon={e.icon} onClick={() => handleClick(e.eventName)}>
							{e.value}
						</Button>
					</li>
				})}
			</ul>
		</div>
	);
};

export default ContextMenu;