import React from "react"

const SummaryDetails = props => {
    return (
        <div>
            <ul className="transformation-parameters-ul">
                {props.summaryParametersData.map((parameter, i) => {
                    return <li key={i}>{parameter.label} {parameter.value}</li>
                })}
            </ul>
        </div>
    )
}

export default React.memo(SummaryDetails)