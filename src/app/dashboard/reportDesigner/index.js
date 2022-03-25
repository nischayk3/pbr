import React, { useEffect } from 'react';
import DesignCharts from './components/reportDesignerNew';
import ReportGenerator from '../reportGenerator/components/reportGenerator';
import {useSelector,useDispatch} from 'react-redux'
import Landing from './components/reportLanding'

function Report()
{
    const screen = useSelector((state)=>state.reportDesignerReducer.screen)

    useEffect(()=>
    {

    },[])
    return (
        <div>
            {/* <Landing/> */}
            {screen ?
           <div><ReportGenerator/></div> :
          <div><DesignCharts/></div> 
            }

        </div>
    )
}
export default Report;