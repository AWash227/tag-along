import React, { Component } from "react";
import { Typography } from "antd";

const { Text } = Typography;

/*
  Props:
  Number,
  String
*/

class Statistic extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Text>
          <b>{this.props.number}</b>
        </Text>
        <br />
        <Text type="secondary">{this.props.string}</Text>
      </div>
    );
  }
}

export default Statistic;
