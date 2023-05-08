/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 29 March, 2023
 * @Last Changed By - @Dinesh
 */

import { DeleteOutlined, EditOutlined, HolderOutlined, PlusOutlined, SisternodeOutlined } from '@ant-design/icons';
import SortableTree, { addNodeUnderParent, changeNodeAtPath, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Button, Input } from 'antd';
import queryString from 'query-string';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import ContextMenu from '../../../../../../components/ContextMenu/ContextMenu';
import CustomButton from '../../../../../../components/CustomButton/CustomButton';
import DisplayTree from './DisplayTree';
import './EditableTree.scss';
class EditableTree extends Component {
	constructor(props) {
		super(props);
		const { location } = this.props;
		const params = queryString.parse(location.search);

		this.state = {
			params: params,
			currentPath: [],
			searchString: '',
			searchFocusIndex: 0,
			currentNode: {},
			treeData: [],
			isVisible: false,
			showMenu: false,
			menuPosition: { x: 0, y: 0 },
			isEdit: true,
			items: [],
			callbackStructure: props.callbackStructure,
		};
	}

	componentWillMount() {
		const { location, treeData } = this.props;
		const params = queryString.parse(location.search);
		this.setState({ params: params });
		if (Object.keys(params) && Object.keys(params).length > 0) {
			if (params?.load) {
				this.setState({ isVisible: true, treeData: treeData });
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.callbackStructure !== this.props.callbackStructure) {
			console.log("calllll", this.state.treeData);
			this.props.callbackData(this.state.treeData);
		}
	}

	updateTreeData(treeData) {
		this.setState({ treeData });
	}

	removeNode = (path) => {
		this.setState(state => ({
			treeData: removeNodeAtPath({
				treeData: state.treeData,
				path,
				getNodeKey: ({ treeIndex }) => treeIndex,
			})
		}));
	}

	editNode = () => {
		this.setState({
			isEdit: false
		})
	}

	selectThis = (node, path) => {
		this.setState({ currentNode: node, path: path });
	}

	insertNewNode = (path) => {
		this.setState(state => ({
			treeData: addNodeUnderParent({
				treeData: state.treeData,
				parentKey: path[path.length - 1],
				expandParent: true,
				newNode: { title: "", },
				getNodeKey: ({ treeIndex }) => treeIndex
			}).treeData
		}));
	}

	showTree = () => {
		this.setState({
			isVisible: true, treeData: [
				{
					title: this.props.drugName,
					expanded: true,
					children: []
				},
			],
		});
	}

	handleContextMenu = (event, path, title) => {
		event.preventDefault();
		this.setState({
			showMenu: true,
			menuPosition: { x: event.clientX, y: event.clientY },
			currentPath: path,
			items: [{
				value: 'Add node',
				icon: <SisternodeOutlined />,
				eventName: 'addNode',
				visible: false,
			},
			{
				value: 'Edit node',
				icon: <EditOutlined />,
				eventName: 'editNode',
				visible: title === this.props.drugName ? true : false,
			}, {
				value: 'Delete node',
				icon: <DeleteOutlined />,
				eventName: 'deleteNode',
				visible: title === this.props.drugName ? true : false,
			}]
		})
	};

	handleMenuClose = () => {
		this.setState({ showMenu: false })
	};

	handleMenuClick = (eventName) => {
		if (eventName === 'addNode') {
			this.insertNewNode(this.state.currentPath)
		} else if (eventName === 'deleteNode') {
			this.removeNode(this.state.currentPath)
		} else if (eventName === 'editNode') {
			this.editNode()
		}
	}

	render() {
		const { treeData, isVisible, menuPosition, showMenu, items, isEdit, } = this.state;
		const { drugName, } = this.props;
		const getNodeKey = ({ treeIndex }) => treeIndex;
		return (
			<>
				<div className="sortable-tree" style={{ height: 'calc(100vh - 350px)', overflowY: 'auto' }}>
					<CustomButton className="custom__btn--dashed" icon={<PlusOutlined />} disabled={isVisible} type="dashed" onClick={(e) => this.showTree()}>Create new process</CustomButton>
					<div className="sortable-tree__tree">
						{isVisible && (
							<>
								<SortableTree
									theme={FileExplorerTheme}
									treeData={treeData}
									onChange={treeData => {
										this.setState({ treeData }),
											this.updateTreeData
									}}
									generateNodeProps={({ node, path }) => ({
										title: (
											<>
												<form onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.selectThis(node, path); }}>
													<Input
														id='input-node'
														className={node.title === drugName ? 'sortable-tree__tree--input--disabled' : isEdit ? 'sortable-tree__tree--input--disabled' : 'sortable-tree__tree--input--edit'}
														placeholder="Enter process name"
														value={node.title}
														disabled={node.title === drugName ? true : isEdit}
														onChange={event => {
															const title = event.target.value;
															this.setState(state => ({
																treeData: changeNodeAtPath({
																	treeData: state.treeData,
																	path,
																	getNodeKey,
																	newNode: { ...node, title }
																})
															}));
														}} />

													<Button className='context__menu--icon' type="link" icon={<HolderOutlined />} onClick={(e) => this.handleContextMenu(e, path, node.title)}></Button>
												</form>

											</>
										)
									})}
								/>
								<ContextMenu item={items} show={showMenu} x={menuPosition.x} y={menuPosition.y} onClose={this.handleMenuClose} handleClick={(val) => this.handleMenuClick(val)} />
							</>
						)}
					</div>

				</div>
				{!isVisible && (
					<DisplayTree />
				)}
			</>
		);
	}
}
export default withRouter(EditableTree);