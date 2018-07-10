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

function deleteUnchecked(userList) {
  var checked = [];
  for (let i = 0; i < userList.length; i++) {
    if (req.body.users[i].checked === true) {
      let num = parseInt(req.body.users[i].id, 10);
      approvedUsers.push(num);
    }
  }
  
}

class App extends Component {
  componentDidMount() {
    this.getUserList();
    this.getGroupList();
  }
  state = { text: "", users: [], groups: [] };

  handleBroadcast = () => {
    return axios.post("http://localhost:8080/api/message-users", {
      text: this.state.text,
      users: this.state.users.map(user => {
        if(user.checked == true) return user.id;
      })

    });
  };

  handleAddGroup = () => {
    return axios.post("http://localhost:8080/api/groups", {
      name: this.state.groupname,
      users: this.state.users.map(user => {
        if(user.checked == true) return user.id;
      })
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
    axios.get("http://localhost:8080/api/users").then(response => {
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

  render() {
    const { TextArea } = Input;
    const { GroupsArea} = Input;

    return (
      <div id="body">

        <div id="container">
        
        <h1> Create group </h1>
        <div id="input-button">
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
          
        <h1> Send a Broadcast </h1>
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
