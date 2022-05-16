import React from 'react';
import {MDH_APP_PYTHON_SERVICE} from "../../../constants/apiBaseUrl"

const PythonNotebook=()=> {
    return (
        <div>
           
        <iframe
          src="https://mi-demo.mareana.com/jupyter"
          width="1300"
          height="900"
          frameborder="0"
        ></iframe>
      </div>
        
    )
}

export default PythonNotebook;
