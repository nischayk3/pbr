import { Button, Card, Input } from "antd";
import React, { useState } from "react";
import BMS_LOGO from '../../../assets/bms-log.png';
import './login.scss';

const CustomerLogin = () => {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	return (
		<div className="p-28">
			<Card bordered={false}>
				<div className="electronic">
					<img style={{ width: 304 }} src={BMS_LOGO} />
					<div className="cardText"><p>This resource is restricted to authorised users.</p></div>
					<div>
						<Input
							className="cardInput"
							placeholder="BMS User ID"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<Input
							className="cardInput1"
							type="password"
							value={password}
							placeholder="BMS Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="authenticte_button">
						<Button
							className="customer-button"
							key="3"
						//onClick={() => handleLogin()}
						// disabled={username == '' || password == ''}
						>
							Sign In
						</Button>
					</div>
				</div>
			</Card>
		</div >
	)
}

export default CustomerLogin