/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */
import { PlusOutlined } from "@ant-design/icons";
import SortableTree, { changeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Card, Input, Tag } from "antd";
import React, { useState } from "react";
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import SelectSearchField from "../../../../../../components/SelectSearchField/SelectSearchField";
import "./processHierarchy.scss";

const ProcessHierarchy = () => {
	const [currentPath, setCurrentPath] = useState([]);
	const [currentNode, setCurrentNode] = useState({});
	const [treeData, setTreeData] = useState([{
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
	}]);




	const updateTreeData = (treeData) => {
		console.log("treeData 1", treeData);
		setTreeData(treeData);
	}

	const selectThis = (node, path) => {
		console.log("treeData 2", node, path);
		setCurrentNode({ currentNode: node, path: path });
	}

	const getNodeKey = ({ treeIndex }) => treeIndex;

	console.log("tree dataa", treeData);
	return (
		<div>
			<Card title='Parameter Lookup' className='custom__card'>
				<div className='parameter__wraper'>
					<div className="parameter__wraper--select">
						<p>Molecule</p>

						<SelectSearchField
							id="filter-molecule"
							showSearch
							//placeholder='Search Molecule'
							onChangeSelect={e => onChangeMolecule(e)}
						//onSearchSelect={type => onSearchParam(type)}
						// handleClearSearch={e => clearSearch(e)}
						//options={optionsMolecule}
						//selectedValue={filterValue}
						/>
					</div>
					<div className="parameter__wraper--select">
						<p>Filters</p>

						<SelectSearchField
							id="filter-molecule"
							showSearch
							//placeholder='Search Molecule'
							onChangeSelect={e => onChangeParam(e)}
							onSearchSelect={type => onSearchParam(type)}
						// handleClearSearch={e => clearSearch(e)}
						//options={optionsMolecule}
						//selectedValue={filterValue}
						/>
					</div>
				</div>
			</Card>
			<Card title='Process hierarchy' className='custom__card'>
				<div className="hiearchy-tree__wrapper">
					<div className="sortable-tree__tree">
						<SortableTree
							canDrag={false}
							theme={FileExplorerTheme}
							treeData={treeData}
							onChange={treeData => {
								setTreeData(treeData);
								updateTreeData(treeData)
							}}
							generateNodeProps={({ node, path }) => ({
								title: (
									<>
										<form onClick={(e) => { e.preventDefault(); e.stopPropagation(); selectThis(node, path); }}>
											{node.children.length === 0 ? (
												<div className="sortable-tree__tree--node">
													<Tag color="geekblue">
														{node.title}
													</Tag>
													<PlusOutlined />
												</div>) : (
												<Input
													readOnly
													id='input-node'
													className='sortable-tree__tree--input--disabled'
													placeholder="Enter process name"
													value={node.title}
													onChange={event => {
														const title = event.target.value;
														setTreeData(() => ({
															treeData: changeNodeAtPath({
																treeData: treeData,
																path,
																getNodeKey,
																newNode: { ...node, title }
															})
														}))
													}} />
											)}


										</form>
									</>
								)
							})}
						/>
					</div>
				</div>
			</Card >
			<Card title='Files' className='custom__card'></Card>
		</div >
	)
}

export default ProcessHierarchy;