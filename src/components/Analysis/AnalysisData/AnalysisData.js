import { Collapse, Button } from 'antd'
import { DatabaseOutlined } from '@ant-design/icons';

import SideView from '../../../components/SideView/SideView'
import DerivedParameterDetails from '../DerivedParameterDetails/DerivedParameterDetails';

const { Panel } = Collapse

const AnalysisData = props => {

    const getPanels = () => {
        return (
            <Panel className='cstm-twocol-panel' header={<div><span className='cstm-txt'>{'Temperature Combined'}</span>{['Input', 'Output', 'Ignore'].map((opt, i) => <span className='cstm-btns' key={i}>{opt}</span>)}</div>} key={1}>
                <div className="cstm-side-nav">
                    <SideView />
                </div>
                <div className="right-content">
                    <DerivedParameterDetails parameters={props.parameters} />
                </div>
            </Panel>
        )
    }

    return (
        <>
            <div className='cstm-wrap'>
                <p className='cstm-txt'><DatabaseOutlined className="icon-primary" /> Data</p>
                <Button className='button-bordered__primary'>Add Parameter</Button>
            </div>
            <Collapse accordion expandIconPosition="right">
                {getPanels()}
            </Collapse>
        </>
    )
}

export default AnalysisData