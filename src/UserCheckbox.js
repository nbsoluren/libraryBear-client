import React, { Component } from "react";
import { Checkbox, Row } from "antd";

class userCheckbox extends Component {
  state = {
    indeterminate: true,
    checkAll: false
  };

  handleCheckChange = (e, userId) => {
    if (e.target.checked) {
      this.props.checkUser(userId);
    } else {
      this.props.unCheckUser(userId);
    }
  };

  render() {
    return (
      <div>
        <div style={{ borderBottom: "1px solid #E9E9E9" }}>
          <Checkbox onChange={this.props.checkAll}>Check all</Checkbox>
        </div>
        <br />
        {this.props.users ? (
          this.props.users.map(user => {
            return (
              <Row>
                <Checkbox
                  checked={user.checked}
                  className="users"
                  onChange={e => this.handleCheckChange(e, user.id)}
                >
                  {" "}
                  {user.name}
                </Checkbox>
              </Row>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}
export default userCheckbox;
