/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 09 Aug, 2022
 * @Last Changed By - Dinesh
 */

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React from "react";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import InputField from '../../../../components/InputField/InputField';
import SelectSearchField from "../../../../components/SelectSearchField/SelectSearchField";
import "./style.scss";

const Profile = () => {

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				<div className='layout-jumbo-header'>
					<div className='profile-section'>
						<p className="heading-1">Profile</p>
						<p className='heading-2'>Manage your personal information, and control which information other people see and apps may access.</p>
						<Avatar size={137}
							style={{
								padding: "10px 0",
								margin: "10px 0"
							}}
							icon={<UserOutlined />} />
					</div>
					<div className="edit-form">
						<p className="heading">Basic Information</p>
						<div className="split-form">
							<div>
								<InputField
									label="First name"
								/>
								<InputField
									label="Email"
								/>
							</div>
							<div>
								<InputField
									label="Last name"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='layout-section-wrapper'>
					<div className='layout-section'>
						<p className="heading">Preferences</p>
						<p className="sub-heading">Changes to your language and time format will be reflected across all applications in BMS.</p>
						<div className="split-form">
							<div>
								<SelectSearchField
									showSearch
									label='Date format'
									placeholder='Select'
								// onChangeSelect={value => onChangeParam(value, 'plant')}
								// onSearchSelect={type => onSearchParam(type, 'plant')}
								// options={optionsPlant}
								//handleClearSearch={e => clearSearch(e, 'plant')}
								//selectedValue={selectParam['plant']}
								/>
								<SelectSearchField
									showSearch
									label='Time zone'
									placeholder='Select'
								// onChangeSelect={value => onChangeParam(value, 'plant')}
								// onSearchSelect={type => onSearchParam(type, 'plant')}
								// options={optionsPlant}
								//handleClearSearch={e => clearSearch(e, 'plant')}
								//selectedValue={selectParam['plant']}
								/>
								<SelectSearchField
									showSearch
									label='Language'
									placeholder='Select'
								// onChangeSelect={value => onChangeParam(value, 'plant')}
								// onSearchSelect={type => onSearchParam(type, 'plant')}
								// options={optionsPlant}
								//handleClearSearch={e => clearSearch(e, 'plant')}
								//selectedValue={selectParam['plant']}
								/>
							</div>
							<Button
								className="custom-secondary-btn "
								type="primary"
							>
								Save Changes
							</Button>
						</div>
					</div>
					<div className='layout-section'>
						<p className="heading">Password</p>
						<div className="split-form">
							<div>
								<InputField
									label="Current password"
								/>
								<InputField
									label="New password"
								/>
								<InputField
									label="Confirm new password"
								/>
							</div>
							<Button
								className="custom-secondary-btn "
								type="primary"
							>
								Save Changes
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile;