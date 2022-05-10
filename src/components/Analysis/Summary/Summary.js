import { Fragment } from 'react'
import { Collapse, Button } from 'antd'
import { FileTextOutlined, EditOutlined } from '@ant-design/icons';

import NoData from '../NoData/NoData'
import SummaryDetails from '../SummaryDetails/SummaryDetails'

const { Panel } = Collapse

const Summary = props => {

    const getPanels = () => {
        if ([].length) {
            return (
                <Panel header={<div>{props.summaryParametersDetails.map((summaryParameters, i) => {
                    return <Fragment key={i}>
                        <span className='cstm-bordered-txt'>{summaryParameters.label}</span>
                        <span className='cstm-icn-txt'><EditOutlined /> Edit transformation</span>
                    </Fragment>
                })}</div>} key="1">
                    {props.summaryParametersDetails.map((summaryParameters, i) => {
                        return <SummaryDetails summaryParametersData={summaryParameters.data} key={i} />
                    })}
                </Panel>
            )
        }
        return <NoData text="You will see the summary of the functions you added here." />
    }

    return (
        <>
            <p><FileTextOutlined className="icon-primary" /> Summary</p>
            <Button className='button-bordered__primary'>Preview</Button>
            <Collapse expandIconPosition="right">
                {getPanels()}
            </Collapse>
        </>
    )
}

export default Summary