import { Collapse, Button } from 'antd'
import { FileTextOutlined } from '@ant-design/icons';

import NoData from '../NoData/NoData'
import SummaryDetails from '../SummaryDetails/SummaryDetails'

const { Panel } = Collapse

const Summary = props => {

    const getPanels = () => {
        if (![].length) {
            return (
                <Panel header={<div>Summary</div>} key="1">
                    <div className="cstm-summary-wrapper">
                        {props.summaryParametersDetails.map((summaryParameters, i) => {
                            return <SummaryDetails summaryParameters={summaryParameters} key={i} />
                        })}
                    </div>
                </Panel>
            )
        }
        return <NoData text="You will see the summary of the functions you added here." />
    }

    return (
        <>
            <p><FileTextOutlined className="icon-primary" /> Summary</p>
            <Button className='button-bordered__primary'>Preview</Button>
            <Collapse expandIconPosition="right" accordion>
                {getPanels()}
            </Collapse>
        </>
    )
}

export default Summary