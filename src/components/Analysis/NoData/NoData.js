import { InfoCircleOutlined } from '@ant-design/icons'

const NoData = props => {
    return (
        <div className="cstm-no-summary">
            <InfoCircleOutlined className="cstm-no-summary--icon" />
            <p>{props.text}</p>
        </div>
    )
}

export default NoData