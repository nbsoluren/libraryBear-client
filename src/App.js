import React, { Component } from "react";
import { Input } from "antd";
import "./App.css";
import SendModal from "./SendModal";
import axios from "axios";

function deleteDuplicate(userList) {
  var ids = [];
  userList.forEach(function(user) {
      ids.push(user.id);
  });

  
var uniq = ids.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
  return uniq
}

class App extends Component {
  componentDidMount() {
    this.getUserList();
    this.getGroupList();
  }
  state = { text: "", users: [], groups: [] };

  handleBroadcast = () => {
    return axios.post("http://localhost:8080/api/message-user", {
      text: this.state.text,
      users: this.state.users.map(user => ({
        id: user.id
      }))
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

  checkUser = userId => {
    this.setState({
      users: this.state.users.map(user => {
        if (userId === user.id) {
          return {
            ...user,
            checked: true
          };
        }
        return user;
      })
    });
  };

  unCheckUser = userId => {
    this.setState({
      users: this.state.users.map(user => {
        if (userId === user.id) {
          return {
            ...user,
            checked: false
          };
        }
        return user;
      })
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
    this.setState({ text: e.target.value });
  };

  render() {
    const { TextArea } = Input;

    return (
      <div id="body">

        <div id="container">
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
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
