import React from 'react';
import { JUPYTER_NOTEBOOK } from '../../../constants/apiBaseUrl';

const PythonNotebook = () => {
	return (
		<div>
			<iframe
				src={JUPYTER_NOTEBOOK}
				width='1300'
				height='900'
				frameborder='0'></iframe>
		</div>
	);
};

export default PythonNotebook;
