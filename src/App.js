import React, { Component } from "react";
import { Layout, Menu, Icon, Button, Input, notification } from "antd";
import "./App.css";
import SendModal from "./SendModal";
import axios from "axios";
import logo from './bear.gif';

const { Header, Sider, Content } = Layout;


class App extends Component {
  componentDidMount() {
    this.getUserList();
    this.getGroupList();
  }
  
  state = {
    groupname: '',
    text: "",
    users: [],
    groups: [],
    send: [],
    collapsed: false
  };

  handleBroadcast = () => {
    return axios.post("http://localhost:8080/api/message-users", {
      message: this.state.text,
      id: this.state.send
    });
  };

  handleAddGroup = () => {
    return axios.post("http://localhost:8080/api/groups", {
      name: this.state.groupname,
      users: this.state.send
    }).then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })
  };

  handleDeleteGroup = () => {
    const string = 'http://localhost:8080/api/groups/' + this.state.groupname;
    return axios.delete(string, {
    }).then(() => {
      this.openNotification();
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })
  };

  checkAll = e => {
    this.setState({
      users: this.state.users.map(user => ({
        ...user,
        checked: e.target.checked
      }))
    });
  };
  
  getUserList = () => {
    axios.get("http://localhost:8080/api/users").then(response => {
      const userList  = response.data.data;
      const userListNoCheck = userList.map(user => ({
        ...user,
        checked: false
      }));
      this.setState({ users: userListNoCheck });
    });
  };

  getGroupList = () => {
    axios.get("http://localhost:8080/api/groups").then(response => {
      const groupList  = response.data.data;
      this.setState({ groups: groupList });
    });
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value});
  };
  handleGroupsChange = e => {
    this.setState({ groupname: e.target.value});
  };
  handleUsersChange = value => {
    // console.log('onChange', value)
    this.setState({ send: value });
  }

  openNotification = () => {
    notification.config({
      top: 110
    });
    notification.open({
      placement: "topLeft",
      message: "Library Bear",
      description: "Library Bear deleted a group"
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { TextArea } = Input;
    const { GroupsArea} = Input;

    return (
      <Layout style={{height:"100vh"}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <img id="logo" src={logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <Icon type="team" />
              <span>Add or Delete Groups</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="message" />
              <span>Broadcast</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 0 0 1' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: '24px', background: '#fff' }}>
            <div id="input-button">
              <TextArea
                rows={4}
                id="group-name-area"
                onChange={this.handleGroupsChange}
              />
              <SendModal
                onSubmit={this.handleAddGroup}
                userList={this.state.users}
                groupList={this.state.groups}
                onChange={this.handleUsersChange}
              />
              <Button type="primary" onClick={this.handleDeleteGroup} id="send">Delete</Button>
            </div>
            
            <div id="input-button">
              <TextArea
                rows={10}
                id="text-area"
                onChange={this.handleTextChange}
              />
              <SendModal
                onSubmit={this.handleBroadcast}
                userList={this.state.users}
                groupList={this.state.groups}
                onChange={this.handleUsersChange}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
