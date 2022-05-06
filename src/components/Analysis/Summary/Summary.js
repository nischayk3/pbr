import { Collapse, Button } from 'antd'
import { FileTextOutlined, InfoCircleOutlined, EditOutlined } from '@ant-design/icons';

const { Panel } = Collapse

const Summary = () => {

    const getPanels = () => {
        if (![].length) {
            return (
                <Panel header={<div><span>{'Temperature Combined'}</span> <span><EditOutlined /> Edit transformation</span></div>} key="1">
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
        <div>
            <FileTextOutlined />
            <p>Summary</p>
            <Button>Preview</Button>
            <Collapse expandIconPosition="right">
                {getPanels()}
            </Collapse>
        </div>
    )
}

export default Summary