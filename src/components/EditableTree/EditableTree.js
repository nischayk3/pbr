import {
	PlusOutlined
} from '@ant-design/icons';
import SortableTree, { changeNodeAtPath, insertNode, removeNodeAtPath, toggleExpandedForAll } from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Button } from 'antd';
import React, { Component } from 'react';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import ContextMenu from '../ContextMenu/ContextMenu';
import CustomButton from '../CustomButton/CustomButton';
import './EditableTree.scss';
export default class EditableTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: '',
			searchFocusIndex: 0,
			currentNode: {},
			treeData: [],
			isVisible: false,
			showMenu: false,
			menuPosition: { x: 0, y: 0 },
			items: [
				{
					label: '1st menu item',

				}
			],
		};
	}

	expandAndCollapse = (expanded) => {
		this.setState({
			treeData: toggleExpandedForAll({
				treeData: this.state.treeData,
				expanded,
			}),
		});
	};

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

	selectThis = (node, path) => {
		this.setState({ currentNode: node, path: path });
	}

	insertNewNode = () => {
		this.setState(state => ({
			treeData: insertNode({
				treeData: state.treeData,
				depth: 2,
				minimumTreeIndex: state.treeData.length,
				newNode: { title: "Enter process name", children: [{ title: 'Enter sub-process name' }] },
				getNodeKey: ({ treeIndex }) => treeIndex
			}).treeData
		}));
	}

	showTree = () => {
		this.setState({
			isVisible: true, treeData: [
				{
					title: 'Enter drug name',
					children: [
						{ title: 'Enter process name' },
					]
				},
			],
		});
	}

	handleContextMenu = (event) => {
		console.log("event trigger");
		event.preventDefault();
		this.setState({ showMenu: true, menuPosition: { x: event.clientX, y: event.clientY } })
	};

	handleMenuClose = () => {
		this.setState({ showMenu: false })
	};


	render() {
		const { searchString, searchFocusIndex, treeData, isVisible, menuPosition, showMenu, items } = this.state;
		const getNodeKey = ({ treeIndex }) => treeIndex;

		console.log("showmenu", showMenu);
		return (
			<div className="sortable-tree" style={{ height: 800 }}>
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
									<form onContextMenu={this.handleContextMenu} onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.selectThis(node, path); }}>
										<input
											className='sortable-tree__tree--input'
											value={node.title}
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
											}}
										/>&nbsp;&nbsp;&nbsp;
										<ContextMenu item={items} show={showMenu} x={menuPosition.x} y={menuPosition.y} onClose={this.handleMenuClose} />
										<Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.insertNewNode(path) }} >+</Button>
										<Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.removeNode(path) }} >-</Button>
									</form>
								)
							})}
						/>
					)}
				</div>
			</div>
		);
	}
}