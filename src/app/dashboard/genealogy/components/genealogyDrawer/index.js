/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 15 March, 2022
 * @Last Changed By - Dinesh Kumar
 */
import React, { useState } from 'react';
import { Drawer } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import popupicon from '../../../../../assets/images/popup.png';
import batchIcon from '../../../../../assets/images/material.png';
import GenealogyDataTable from '../genealogyDataTable';
import './style.scss';

function GenealogyDrawer(props) {
  const [visible, setVisible] = useState(true);

  const expandDrawer = () => {
    setVisible(false);
    props.isDrawer(false);
  };
  return (
    <Drawer
      className='genealogy-drawer'
      title={
        <div className='drawer-heading'>
          <img className='tree-type-icon' src={batchIcon} />
          <p>35735735 - Material</p>
          <span>
            <DownloadOutlined />
          </span>
          <span className='expand-drawer' onClick={expandDrawer}>
            <img src={popupicon} />
          </span>
        </div>
      }
      placement='right'
      closable={false}
      // onClose={this.onClose}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <GenealogyDataTable
        className={setVisible ? 'drawer-collapse' : 'popout-collapse'}
      />
    </Drawer>
  );
}

export default GenealogyDrawer;
