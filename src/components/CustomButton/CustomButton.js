/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 29 March, 2023
 * @Last Changed By - @Dinesh
 */

import { Button } from 'antd';
import React from 'react';

const CustomButton = ({ children, className, type, shape, icon, size, ...rest }) => {
	return (
		<Button className={className} type={type} shape={shape} size={size} icon={icon}  {...rest}>
			{children}
		</Button>
	);
};

CustomButton.defaultProps = {
	type: 'default',
	shape: 'default',
	size: 'middle',
};


export default CustomButton;