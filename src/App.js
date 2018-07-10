import React, { Component } from "react";
import { Input } from "antd";
import "./App.css";
import SendModal from "./SendModal";
import axios from "axios";


class App extends Component {
  componentDidMount() {
    this.getUserList();
    this.getGroupList();
  }
  state = { text: "", users: [], groups: [], send: ['2044645818940106'] };

  handleBroadcast = () => {
    return axios.post("http://localhost:8080/api/message-users", {
      message: this.state.text,
      id: this.state.send

    });
  };

  handleAddGroup = () => {
    return axios.post("http://localhost:8080/api/groups", {
      name: this.state.groupname,
      id: this.state.send
    });
  };

  checkAll = e => {
    this.setState({
      users: this.state.users.map(user => ({
        ...user,
        checked: e.target.checked
      }))
    });
  };

  // checkUser = userId => {
  //   this.setState({
  //     users: this.state.users.map(user => {
  //       if (userId === user.id) {
  //         return {
  //           ...user,
  //           checked: true
  //         };
  //       }
  //       return user;
  //     })
  //   });
  // };

  // unCheckUser = userId => {
  //   this.setState({
  //     users: this.state.users.map(user => {
  //       if (userId === user.id) {
  //         return {
  //           ...user,
  //           checked: false
  //         };
  //       }
  //       return user;
  //     })
  //   });
  // };

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

  render() {
    const { TextArea } = Input;
    const { GroupsArea} = Input;

    return (
      <div id="body">

        <div id="container">
  
        
        <div id="input-button">
        <h1> Create group </h1>
            <TextArea
              rows={4}
              id="group-name-area"
              onChange={this.handleGroupChange}
            />
            <SendModal
              onSubmit={this.handleAddGroup}
              userList={this.state.users}
              groupList={this.state.groups}
            />
          </div>
          
          <div id="input-button">
          <h1> Send a Broadcast </h1>
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
        </div>
      </div>
    );
  }
}
export default App;
