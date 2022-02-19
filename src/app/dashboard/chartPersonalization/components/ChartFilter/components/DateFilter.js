import React, { Component } from 'react';
import { Card, Table } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';


class DateFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: this.props.visible,
          };

    }

    render() {
        console.log('hello',this.state.visible)
        return (
            <div>
              xexs
            </div>
        )
    }
}

export default DateFilter;