import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { showNotification } from "../../duck/actions/commonActions";
import { getShare, putShare } from "../../services/sharingServices";
import './sharing.scss';

const { Option } = Select;

export default function Sharing(props) {

	const { isShare, handleShareCancel } = props;
	const [shareList, setShareList] = useState([])
	const [emailList, setEmailList] = useState([])
	const [copy, setCopy] = useState(window.location.href)
	const currentUser = localStorage.getItem("user")
	const dispatch = useDispatch()

	useEffect(() => {


		getUsers()
	}, [])

	useEffect(() => {
		setCopy(window.location.href)
		if (window.location.href.includes('share')) {
			setCopy(window.location.href)
		}
		else {
			let url_postfix = props.shareSreen == 'VIEW' ? '?share=true' : '&share=true'
			setCopy(window.location.href + url_postfix)
		}
	}, [window.location.href])



	function generateRandomColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color
	}

	const addUser = (user) => {
		if (user[user.length - 1] == currentUser) {
			dispatch(showNotification('error', 'Email already added'))
		}
		else
			setShareList(user);
	};

	const getUsers = async () => {
		let usersData = await getShare();
		if (usersData.statuscode == 200) {
			let option_select = usersData.message
			setEmailList(option_select)
		}
	}

	const onCopy = () => {
		navigator.clipboard.writeText(copy)
		dispatch(showNotification('success', 'Link copied'))

	}

	const onShare = async () => {
		let shareLists = [...shareList]
		shareLists.push(currentUser)
		let shareRequest = {
			email_ids: shareLists,
			link: copy
		}
		let shareData = await putShare(shareRequest);
		if (shareData.statuscode == 200) {
			dispatch(showNotification('success', shareData.message))
		} else {
			dispatch(showNotification("error", 'Error while sharing, please try again!'));
		}
	}

	return (
		<Modal className="sharing" title={<><UserAddOutlined style={{ marginLeft: '7px' }} /><span className="sharing-modal-title">Share with people</span></>} visible={isShare} onCancel={handleShareCancel} footer={false}>
			<div className="recepients">
				<p className="recepients-text">Recipients</p>
				<div className="recepients-input">
					<Select
						mode="tags"
						allowClear
						onClear={() => setShareList([])}
						style={{ width: '540px', overflow: "auto", marginLeft: '24px' }}
						placeholder="Enter user email to share"
						bordered={true}
						value={shareList}
						onChange={addUser}
						maxTagCount='responsive'
					>
						{emailList.map((i) => (
							<Option key={i}>{i}</Option>
						))}
					</Select>
				</div>
				<Button className="send-button" onClick={() => onShare()}>Share</Button>
			</div>
			<hr style={{ borderTop: "0.5px solid #d9d9d9", marginLeft: '6px' }} />
			<div className="recepients-fixed">
				<span>

					<Avatar
						style={{
							color: "#FFFFFF",
							backgroundColor: 'red',
							// marginTop: '5px'
							marginLeft: '9px'
						}}
						size="small"
					>
						{currentUser && currentUser.substring(0, 1).toUpperCase()}
					</Avatar>
				</span>
				<p className="email-text">{currentUser}</p>
				<p className="owner" style={{ marginLeft: '62.3%' }}>Owner</p>

			</div>
			{
				shareList.length > 0 && shareList.map((e, index) =>
				(
					<div className="recepients">
						<span>
							<Avatar
								style={{
									color: "#FFFFFF",
									backgroundColor: generateRandomColor(),
									marginLeft: '9px'
									// marginTop: '5px'
								}}
								size="small"
							>
								{e ? e.substring(0, 1).toUpperCase() : ''}
							</Avatar>
						</span>
						<p className="email-text">{e}</p>
					</div>
				)
				)

			}
			<div className="copy">
				<Input className="copy-input" value={copy} onChange={(e) => setCopy(e.target.value)} />
				<Button className="copy-button" onClick={() => onCopy()}>Copy</Button>
			</div>

		</Modal >
	)
}
