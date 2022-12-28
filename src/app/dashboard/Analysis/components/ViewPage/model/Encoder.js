import { Button, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import './context.scss';
import urlJson from './urls.json';

const { Option } = Select;

const Encoder = ({
	onCreateClick,
	encoderData,
	setEncoderData,
	finalModelJson,
	setFinalModelJson,
}) => {
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [x, setX] = useState(0)
	const [y, setY] = useState(0)
	const [url, setUrl] = useState('')
	const [algorithm, setAlgorithm] = useState('')

	const handleClose = useCallback(() => (contextMenuVisible ? setContextMenuVisible(false) : null), [contextMenuVisible]);
	const handleClick = (event) => {
		console.log(event.target.innerText, 'event.target.innerText');
		event.preventDefault();
		setX(event.pageX)
		setY(event.pageY)
		setAlgorithm(event.target.innerText)
		setUrl(urlJson[event.target.innerText])
		setContextMenuVisible(true)
	};

	const style = {
		top: y + 10,
		left: x + 10,
	}
	useEffect(() => {
		document.addEventListener("click", handleClose);
		return () => {
			document.removeEventListener("click", handleClose);
		};
	});

	const onClick = () => {
		const temparr = [...encoderData.selectedObjs]
		temparr?.forEach((ele) => {
			if (ele?.id === encoderData?.encoderId) {
				ele.transformation = `t_${encoderData.encoderValue.toLowerCase()}`
			}
		})
		setEncoderData({ ...encoderData, savedValue: encoderData.encoderValue, selectedObjs: temparr })
		onCreateClick();
	};
	const handleChange = (e) => {
		setEncoderData({ ...encoderData, encoderValue: e })
	}


	return (
		<div>
			{
				contextMenuVisible ? <div className="context-menu" style={style} >
					<span onClick={() => window.open(url)}><center>About {algorithm}</center></span>
				</div> : <></>
			}
			<div className="drawer-head">
				<h3>Encoder</h3>
			</div>
			<div className="drawer-details">
				<p style={{ marginBottom: '10px' }}>You are applying Encoders</p>
				<div>
					<p>Algorithm</p>
					<Select
						allowClear
						style={{ width: "100%" }}
						placeholder="Please select"
						value={encoderData.encoderValue}
						onChange={handleChange}
					>
						{encoderData &&
							encoderData?.encoderDropDownData.map((ele) => {
								return <Option value={ele.submodule} onContextMenu={handleClick} key={ele?.submodule}>{ele?.display_name}</Option>;
							})}
					</Select>
				</div>
				<Button className="custom-primary-btn" onClick={onClick}>
					Save
				</Button>
			</div>
		</div>
	);
};

export default Encoder;
