import React, { Component } from "react";
import { Input } from "antd";
import "./App.css";
import SendModal from "./SendModal";
import axios from "axios";
import logo from "./612394-mic-512.png";

class App extends Component {
  componentDidMount() {
    this.getUserList();
  }
  state = { text: "", users: [] };

  handleBroadcast = () => {
    return axios.post("http://localhost:8080/broadcast", {
      text: this.state.text,
      users: this.state.users
    });
  };

  checkAll = e => {
    this.setState({
      users: this.state.users.map(user => ({
        ...user,
        checked: e.target.checked
      }))
    });
    console.log(this.state.users);
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
    console.log(this.state.users);
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
      const { userList } = response.data;
      console.log(response.data);
      const userListNoCheck = userList.map(user => ({
        ...user,
        checked: false
      }));
      this.setState({ users: userListNoCheck });
    });
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { TextArea } = Input;

    return (
      <div id="body">
        <div id="notif">
          <p id="text"> Notifications </p>
        </div>
        <div id="container">
          <div id="logo">
            <img id="image" alt="example" src={logo} />
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
              checkAll={this.checkAll}
              checkUser={this.checkUser}
              unCheckUser={this.unCheckUser}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
