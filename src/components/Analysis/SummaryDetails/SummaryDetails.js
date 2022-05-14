import React from "react"
import { EditOutlined } from '@ant-design/icons';

const SummaryDetails = props => {
    return (
        <div className="cstm-summary-box">
            <span className='cstm-bordered-txt'>{props.summaryParameters.label}</span>
            <span className='cstm-icn-txt'><EditOutlined /> Edit transformation</span>

            {<ul className="transformation-parameters-ul">
                {props.summaryParameters.data.map((parameter, i) => {
                    return <li key={i}><label>{parameter.label}</label> <span>{parameter.value}</span></li>
                })}
            </ul>}

        </div>
    )
}

export default React.memo(SummaryDetails)