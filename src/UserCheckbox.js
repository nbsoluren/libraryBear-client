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

  parseListData = (userData, groupData) => {
    var users = userData.map(user => {
      return {
        label: user.name,
        value: 'id%20' + user.id,
        key: 'id%20' + user.id
      }
    });

    for(var i = 0; i < groupData.length; i++) {
      users.push({
        label: groupData[i].name,
        value: 'group%20' + groupData[i].name,
        key: 'group%20' + groupData[i].name,
        children: groupData[i].users.map(user => {
          return {
            label: user.name,
            value: groupData[i].name + '%20' + user.id,
            key: groupData[i].name + '%20' + user.id
          }
        })
      })
    }
    console.log(users)

    return users
  }

  componentDidMount = () => {
    this.setState({ treeData: this.parseListData(this.props.users, this.props.groups) });
  }

  handleCheckChange = (e, userId) => {
    if (e.target.checked) {
      this.props.checkUser(userId);
    } else {
      this.props.unCheckUser(userId);
    }
  };

  getIDs = (value) => {
    const groups = this.props.groups;
    var data = [];
    for(var i = 0; i < groups.length; i++) {
      if(groups[i].name == value) {
        for(var j = 0; j < groups[i].users.length; j++) {
          data.push(groups[i].users[j].id);
        }
        break;
      }
    }
    return data;
  }

  onChange = (value) => {
    var data = [];
    for(var i = 0; i < value.length; i++) {
      var elem = value[i].split('%20');
      if(elem[0] != 'id' && elem[0] != 'group') data.push(elem[1]);
      else if(elem[0] == 'id') data.push(elem[1]);
      else data.concat(this.getIDs(elem[1]));
    }
    console.log(data)

    this.setState({ value });

    this.props.onChange(data);
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
