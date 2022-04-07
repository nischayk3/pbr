/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */
import React from 'react';
import { Tree } from 'antd';
const { DirectoryTree } = Tree;
const treeData = [
  {
    title: 'Viral thaw/T-flask',
    key: '0-0',
    children: [
      {
        title: 'Material 1',
        key: '0-0-0',
        isLeaf: true,
      },
      {
        title: 'Material 2',
        key: '0-0-1',
        isLeaf: true,
      },
    ],
  },
];
const MaterialTree = (props) => {
  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };
  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default MaterialTree;
