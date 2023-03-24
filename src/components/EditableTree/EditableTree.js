import {
	PlusOutlined
} from '@ant-design/icons';
import SortableTree, { changeNodeAtPath, insertNode, removeNodeAtPath, toggleExpandedForAll } from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Button } from 'antd';
import React, { Component } from 'react';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import CustomButton from '../CustomButton/CustomButton';
export default class EditableTree extends Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		treeData: [
	// 			{ title: 'Chicken', children: [{ title: 'Egg' }] },
	// 			{ title: 'Fish', children: [{ title: 'fingerline' }] },
	// 		],
	// 	};
	// }

	// render() {
	// 	return (
	// 		<div style={{ height: 400 }}>
	// 			<SortableTree
	// 				treeData={this.state.treeData}
	// 				onChange={treeData => this.setState({ treeData })}
	// 				theme={FileExplorerTheme}
	// 			/>
	// 		</div>
	// 	);
	// }
	constructor(props) {
		super(props);

		this.state = {
			searchString: '',
			searchFocusIndex: 0,
			currentNode: {},
			treeData: [
				{ title: 'Comic Books', children: [{ title: 'Amazing Spider-Man' }, { title: 'The Incredible Hulk' }, { title: 'Action Comics' }, { title: 'Batman' }, { title: 'New Avengers' }] },
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
				depth: 0,
				minimumTreeIndex: state.treeData.length,
				newNode: { title: "", children: [] },
				getNodeKey: ({ treeIndex }) => treeIndex
			}).treeData
		}));
	}

	render() {
		const { searchString, searchFocusIndex, treeData } = this.state;
		const getNodeKey = ({ treeIndex }) => treeIndex;

		return (
			<div className="sortable-tree" style={{ height: 800 }}>
				{/* <div style={{ flex: '0 0 auto', padding: '0 15px' }}>
					<h2>React Sortable Tree</h2>
					<Button onClick={() => { this.expandAndCollapse(true); }}>Expand all</Button>
					<Button onClick={() => { this.expandAndCollapse(false); }}>Collapse all</Button>&nbsp;&nbsp;&nbsp;
					<Input placeholder='Search' value={searchString}
						onChange={event => this.setState({ searchString: event.target.value })} />
				</div> */}
				<CustomButton className="custom__btn--dashed" icon={<PlusOutlined />} type="dashed">Create new process</CustomButton>
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
							<form onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.selectThis(node, path); }}>
								<input
									style={{ fontSize: "1rem", width: 200 }}
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
								<Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.insertNewNode(path) }} >+</Button>
								<Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.removeNode(path) }} >-</Button>
							</form>
						)
					})}
				/>
			</div>
		);
	}
}