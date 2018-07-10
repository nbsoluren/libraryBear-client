import React, { Component } from "react";
import { TreeSelect, Row } from "antd";

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class userCheckbox extends Component {
  state = {
    value: [],
    treeData: [{
      label: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [{
        label: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      }],
    }, {
      label: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [{
        label: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      }, {
        label: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      }, {
        label: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      }],
    }]
  };

  handleCheckChange = (e, userId) => {
    if (e.target.checked) {
      this.props.checkUser(userId);
    } else {
      this.props.unCheckUser(userId);
    }
  };

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const tProps = {
      treeData: this.state.treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Select users',
      style: {
        width: '100%',
      },
    }

    return (
      <TreeSelect {...tProps} />
    );
  }
}
export default userCheckbox;
