import { Collapse, Button } from 'antd'
import { FileTextOutlined, InfoCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Panel } = Collapse

const Summary = () => {

    const getPanels = () => {
        if (![].length) {
            return (
                <Panel header={<div><span className='cstm-bordered-txt'>{'Temperature Combined'}</span> <span className='cstm-icn-txt'><EditOutlined /> Edit transformation</span></div>} key="1">
                    <p>{'text'}</p>
                </Panel>
            )
        }
        return <div>
            <InfoCircleOutlined />
            <p>You will see th summary of the functions you added here.</p>
        </div>
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