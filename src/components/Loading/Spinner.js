import React from 'react';
import { Spin } from 'antd';
import './style.scss';

const DEFAULT_LOADING_TEXT = 'Please wait...';

const Spinner = ({ text }) => {
    return (
        <div className="loading-wrapper">
            <Spin tip={text || DEFAULT_LOADING_TEXT} />
        </div>
    );
};

export default Spinner;
