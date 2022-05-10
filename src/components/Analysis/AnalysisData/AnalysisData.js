import { Collapse, Button } from 'antd'
import { DatabaseOutlined } from '@ant-design/icons';

import SideView from '../../../components/SideView/SideView'
import DerivedParameterDetails from '../DerivedParameterDetails/DerivedParameterDetails';

const { Panel } = Collapse

const AnalysisData = props => {

    const getPanels = () => {
        return (
            <Panel className='cstm-twocol-panel' header={<div><span className='cstm-txt'>{'Temperature Combined'}</span>{['Input', 'Output', 'Ignore'].map((opt, i) => <span className='cstm-btns' key={i}>{opt}</span>)}</div>} key={1}>
                <SideView />
                <DerivedParameterDetails parameters={props.parameters} />
            </Panel>
        )
    }

    return (
        <>
            <p className='cstm-txt'><DatabaseOutlined className="icon-primary" /> Data</p>
            <Button className='button-bordered__primary'>Add Parameter</Button>
            <Collapse accordion expandIconPosition="right">
                {getPanels()}
            </Collapse>
        </>
    )
}

export default AnalysisData