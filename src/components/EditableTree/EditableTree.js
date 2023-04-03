/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 29 March, 2023
 * @Last Changed By - @Dinesh
 */

import { DeleteOutlined, EditOutlined, HolderOutlined, PlusOutlined, SisternodeOutlined } from '@ant-design/icons';
import SortableTree, { changeNodeAtPath, insertNode, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { updateProcessStepFolder } from '../../services/viewHierarchyServices';
import ContextMenu from '../ContextMenu/ContextMenu';
import CustomButton from '../CustomButton/CustomButton';
import DisplayTree from './DisplayTree';
import './EditableTree.scss';
export default class EditableTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPath: [],
			searchString: '',
			searchFocusIndex: 0,
			currentNode: {},
			treeData: this.props.treeData,
			isVisible: false,
			showMenu: false,
			menuPosition: { x: 0, y: 0 },
			isEdit: true,
			items: [

				// {
				// 	value: 'Expand all',
				// 	icon: '',
				// 	eventName: 'expandAll',
				// },
				// {
				// 	value: 'Collapse all',
				// 	icon: '',
				// 	eventName: 'collapseAll',
				// }
			],
		};
	}



	// expandAndCollapse = (expanded) => {
	// 	this.setState({
	// 		treeData: toggleExpandedForAll({
	// 			treeData: this.state.treeData,
	// 			expanded,
	// 		}),
	// 	});
	// };

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

	insertNewNode = () => {
		this.setState(state => ({
			treeData: insertNode({
				treeData: state.treeData,
				depth: 2,
				minimumTreeIndex: state.treeData.length,
				newNode: { title: "", expanded: false, children: [{ title: ' ' }] },
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
					children: [
					]
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
			this.insertNewNode()
		} else if (eventName === 'deleteNode') {
			this.removeNode(this.state.currentPath)
		} else if (eventName === 'editNode') {
			this.editNode()
		}
	}

	saveFolderStructure = () => {
		const folderStructure = {
			ds_name: this.props.drugName,
			process_step: this.state.treeData[0]
		}
		this.saveTreeStructure(folderStructure)
	}


	/**
	 * Folder Struture Save API CALL
	 */

	saveTreeStructure = async (_payload) => {
		const apiRes = await updateProcessStepFolder(_payload)
		if (apiRes.status === 200) {
			// dispatch(showNotification("success", 'success msg'));
		} else if (apiRes.status === 400) {
			// dispatch(showNotification("error", 'error msg'));
		} else if (apiRes.status === 404) {
			// dispatch(showNotification("error", 'error msg'));
		} else {
			// dispatch(showNotification("error", 'error msg'));
		}
	}

	render() {
		const { searchString, searchFocusIndex, treeData, isVisible, menuPosition, showMenu, items, isEdit } = this.state;
		const { drugName } = this.props;
		const getNodeKey = ({ treeIndex }) => treeIndex;
		console.log("{treeData}", treeData);
		return (
			<>
				<div className="hier-tab__head">
					<p className="hier-tab__heading">The following processess and process steps can be left-clicked to create subsequent processess and to perform a bunch of other actions:</p>
					<Button className="custom-primary-btn" onClick={this.saveFolderStructure} disabled={!isVisible}>
						Next
					</Button>
				</div>
				<div className="sortable-tree" style={{ height: 'calc(100vh - 350px)', overflowY: 'auto' }}>
					{/* <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
					<h2>React Sortable Tree</h2>
					<Button onClick={() => { this.expandAndCollapse(true); }}>Expand all</Button>
					<Button onClick={() => { this.expandAndCollapse(false); }}>Collapse all</Button>&nbsp;&nbsp;&nbsp;
					<Input placeholder='Search' value={searchString}
						onChange={event => this.setState({ searchString: event.target.value })} />
				</div> */}

					<CustomButton className="custom__btn--dashed" icon={<PlusOutlined />} type="dashed" onClick={(e) => this.showTree()}>Create new process</CustomButton>
					<div className="sortable-tree__tree">
						{isVisible && (
							<>
								<SortableTree
									theme={FileExplorerTheme}
									// searchQuery={searchString}
									// searchFocusOffset={searchFocusIndex}
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
													{/* <Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.insertNewNode(path) }} >+</Button>
										<Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.removeNode(path) }} >-</Button> */}
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
