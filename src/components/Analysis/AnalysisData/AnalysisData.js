import { Collapse } from 'antd'
import { DatabaseOutlined } from '@ant-design/icons';

import SideView from '../../../components/SideView/SideView'
import DerivedParameterDetails from '../DerivedParameterDetails/DerivedParameterDetails';

const { Panel } = Collapse

const AnalysisData = props => {
    return (
        <div>
            <DatabaseOutlined />
            <p>Data</p>
            <Collapse accordion expandIconPosition="right">
                <Panel header={<div><span>{'Temperature Combined'}</span>{['Input', 'Output', 'Ignore'].map(opt => <span>{opt}</span>)}</div>} key={1}>
                    <SideView />
                    <DerivedParameterDetails parameters={props.parameters} />
                </Panel>
            </Collapse>
        </div>
    )
}

export default AnalysisData