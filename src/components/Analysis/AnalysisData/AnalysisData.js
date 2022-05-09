import { Collapse } from 'antd'
import { DatabaseOutlined } from '@ant-design/icons';

import SideView from '../../../components/SideView/SideView'
import DerivedParameterDetails from '../DerivedParameterDetails/DerivedParameterDetails';

const { Panel } = Collapse

const AnalysisData = props => {
    return (
        <>
            <p className='cstm-txt'><DatabaseOutlined className="icon-primary" /> Data</p>
            <Collapse accordion expandIconPosition="right">
                <Panel className='cstm-twocol-panel' header={<div><span className='cstm-txt'>{'Temperature Combined'}</span>{['Input', 'Output', 'Ignore'].map(opt => <span className='cstm-btns'>{opt}</span>)}</div>} key={1}>
                    <SideView />
                    <DerivedParameterDetails parameters={props.parameters} />
                </Panel>
            </Collapse>
        </>
    )
}

export default AnalysisData