/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 29 March, 2023
 * @Last Changed By - @Dinesh
 */

import { InfoCircleOutlined } from '@ant-design/icons';
import SortableTree, { changeNodeAtPath, toggleExpandedForAll } from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Input } from 'antd';
import React, { Component } from 'react';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import './EditableTree.scss';

export default class DisplayTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPath: [],
			searchString: '',
			searchFocusIndex: 0,
			currentNode: {},
			treeData: [
				{
					expanded: true,
					title: "This is a drug name",
					children: [
						{
							expanded: true,
							title: 'This is a process',
							children: [
								{
									title: 'This is a sub-process',
									children: [{
										title: 'This is a sub-process',
										children: [],

									}],
									expanded: false
								},
								{
									title: 'This is another sub-process',
									expanded: true,
									children: [
										{
											title: 'This is a process step',
											children: [{
												title: 'This is a process step',
												children: [],
												expanded: false,
											}],
											expanded: false,
										}
									]
								}
							]
						},
					]
				}],
			isVisible: false,
			showMenu: false,
			menuPosition: { x: 0, y: 0 },
			isEdit: true,
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



	selectThis = (node, path) => {
		this.setState({ currentNode: node, path: path });
	}



	render() {
		const { treeData, isEdit } = this.state;
		const getNodeKey = ({ treeIndex }) => treeIndex;

		return (
			<div className="display-tree">
				<div className="sortable-tree__tree">
					<p className="sortable-tree__tree--head"><InfoCircleOutlined /> &nbsp; Nomenclature</p>
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
											readOnly
											id='input-node'
											className={isEdit ? 'sortable-tree__tree--input--disabled' : 'sortable-tree__tree--input--edit'}
											placeholder="Enter process name"
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
											}} />
									</form>
								</>
							)
						})}
					/>
				</div>
			</div>
		);
	}
}