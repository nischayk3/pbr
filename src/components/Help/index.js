/**
 * @author Fahad Siddiqui <fahad.siddiqui@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 05 April, 2022
 * @Last Changed By - Fahad
 */
import { QuestionCircleFilled } from '@ant-design/icons';
import { Collapse, Drawer, Input, Popover, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { faqData } from '../../services/helpService';
import './style.scss';

const { Panel } = Collapse;
const { Search } = Input;

const Help = () => {
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState([]);
	const location = useLocation();

	const getScreenData = async (search) => {
		const screen = location.pathname.split('/');
		let params = {
			screens: screen.length > 0 ? [screen[2]] : "",
			search: search
		}
		try {
			const res = await faqData(params)
			setData(res.Data);
		} catch (error) {
			setData({});
			console.log(error)
		}
	}

	useEffect(() => {
		if (visible) {
			getScreenData("")
		}
	}, [visible])
	const showDrawers = () => {
		setVisible(true)
	}

	const onClose = () => {
		setVisible(false);
	}

	const onSearch = (value) => {
		getScreenData(value)
	}

	return (
		<>
			<Popover className='help-popover' overlayClassName="custom_style" placement="leftTop" content={
				<>
					<div className="help_item" ><a id="helptext" onClick={showDrawers}>Help</a></div>
					<div className="feedback_item" ><a id="feedbackText" onClick={showDrawers}>Feedback</a></div>
				</>
			} >
				< QuestionCircleFilled className="hepIcon" />
			</Popover>

			<Drawer
				title="Help"
				placement="right"
				width={500}
				onClose={onClose}
				visible={visible}
				className="faq_drawer"
				extra={
					<Space>
						<a id="view_all_faq" href='/#/dashboard/faq' target="_blank">View all FAQs</a>
					</Space>
				}
			>
				<div>
					<Search
						placeholder="Search"
						allowClear
						enterButton="Search"
						size="large"
						className="search-button"
						onSearch={onSearch}
					/>
				</div>

				{data && Object.keys(data).map((value, index) => {
					return (
						<>
							{data[value].length > 0 && <Collapse className='panel-text-style' >
								{data[value].map((val, i) => {
									return (
										<>
											<Panel header={val.question} key={i + 1}>
												<p>{val.answer}</p>
											</Panel>
										</>
									)
								})}
							</Collapse>}
						</>
					)
				}
				)}
			</Drawer>
		</>
	);
};

export default Help;
