import React, { useEffect, useState } from 'react';
import DesignCharts from './components/reportDesignerNew';
import ReportGenerator from '../reportGenerator/components/reportGenerator';
import {useSelector,useDispatch} from 'react-redux'
import Landing from './components/reportLanding'
import ChartTable from '../../../components/ChartTable';
import ReportHead from './component/reportLanding/reportHead';

function Report()
{
    const screen = useSelector((state)=>state.reportDesignerReducer.screen)
    const [screenChange, setScreenChange] = useState(false)

    useEffect(()=>
    {

    },[])

    const changeScreen = () => {
        setScreenChange(true)
    }
    return (
        <div>
           {!screenChange ? <Landing changeScreen={changeScreen} /> : 
           <> {screen ?
           <div><ReportGenerator/></div> :
          <div><DesignCharts/></div> 

            } </> }
            

        </div>
    )
}
export default Report;