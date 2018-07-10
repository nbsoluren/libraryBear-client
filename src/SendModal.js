import React, { Component } from "react";
import { Modal, Button, notification } from "antd";
import "./App.css";
import UserCheckbox from "./UserCheckbox";

class SendModal extends Component {
  state = {
    loading: false,
    visible: false
  };

  openNotification = () => {
    notification.config({
      top: 110
    });
    notification.open({
      placement: "topLeft",
      message: "Library Bear",
      description: "Library Bear sent your message."
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    this.props.onSubmit().then(body => {
      this.setState({ loading: false, visible: false });
      this.openNotification();
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal} id="send">
          {" "}
          Send{" "}
        </Button>

        <Modal
          visible={visible}
          title="Message your users"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={850}
          footer={[
            <Button key="back" onClick={this.handleCancel} id="return-button">
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
              id="button-color"
            >
              {!loading && "Submit"}
            </Button>
          ]}
        >
          <UserCheckbox
            users={this.props.userList}
            groups={this.props.groupList}
          />
        </Modal>
      </div>
    );
  }
}
export default SendModal;
