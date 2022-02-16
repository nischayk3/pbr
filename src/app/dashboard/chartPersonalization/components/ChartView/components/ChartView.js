import React, { Component } from 'react';
import { Card, Select, Tag, Divider } from 'antd';
import InputField from '../../../../../../components/InputField/InputField';
import { WarningOutlined } from '@ant-design/icons';
import SelectField from '../../../../../../components/SelectField/SelectField';
import './ChartViewStyles.scss';

class ChartView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewType: [''],
			selectedViewType: '',
		};
	}

	onChangeViewType = (value, field) => {
		if (value !== null) {
			if (field === 'view_type') {
				this.setState({
					selectedViewType: value,
				});
			}
		}
	};

	render() {
		const { viewType, selectedViewType } = this.state;
		return (
			<div>
				<Card title='View' style={{ width: 450 }}>
					<div>
						<div className='chartview-select'>
							<SelectField label='View Type' />
						</div>
						<div className='chartview-input'>
							<InputField label='View ID' vlaue='' />
							<InputField label='View Name' vlaue='' />
							<InputField label='Status' vlaue='' />
							<InputField label='Version' vlaue='' />
						</div>
					</div>
				</Card>
				<Card title='Parameter' style={{ width: 450 }}>
					<div className='alert-tags'>
						<div className='alert-tags_block'>
							<Tag className='alert-tags-label'>Temperature</Tag>
							<Tag className='alert-progress'>100%</Tag>
						</div>
						<div className='alert-tags_error'>
							<Tag className='alert-tags-label' color='magenta'>
								Pressure
							</Tag>
							<WarningOutlined style={{ color: '#FA541C' }} />
							<Tag className='alert-progress-error'>80%</Tag>
						</div>
						<div className='alert-tags_error'>
							<Tag className='alert-tags-label' color='magenta'>
								PH
							</Tag>
							<WarningOutlined style={{ color: '#FA541C' }} />
							<Tag className='alert-progress-error'>90%</Tag>
						</div>
						<div className='alert-tags_block'>
							<Tag className='alert-tags-label'>Temparature</Tag>
							<Tag className='alert-progress'>100%</Tag>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}

export default ChartView;
