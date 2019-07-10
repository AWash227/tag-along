import React, { Component } from "react";
import { Typography, Button, Badge, Col, Row } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

class Landing extends Component {
  render() {
    return (
      <div id="surround-landing">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12}>
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                marginBottom: 15
              }}
              src={"automobile.jpg"}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Title level={2}>
              To the student without a car, who <i>just</i> wants to go
              somewhere
            </Title>
            <Paragraph>
              Feel like you're <i>stuck</i> on campus?
            </Paragraph>
            <Paragraph>
              Your options <u>crippled</u>, because you don't have a car.
            </Paragraph>
            <Paragraph>
              Imagine the car is no longer an issue. You can go anywhere. Do
              anything.
            </Paragraph>
            <Paragraph> Where would you go? What would you see?</Paragraph>
            <Paragraph>
              <i>Who</i> would you go with?
            </Paragraph>
            <Paragraph>
              What if there <u>is</u> a way to get around?{" "}
            </Paragraph>
            <Paragraph>
              A way for you to <i>finally</i> get off campus and go have fun?
            </Paragraph>
            <Paragraph>You just found your opportunity.</Paragraph>
            <Paragraph>
              You can connect with your friends. See where <i>they're</i> going.
            </Paragraph>
            <Paragraph>
              Make an account below, and start your journey!
            </Paragraph>

            <Link to="/register">
              <Button
                className="landing-button"
                type="primary"
                size="large"
                block
              >
                Make Your Account
              </Button>
            </Link>
          </Col>
        </Row>
        {/* PUT IN NAVBAR */}
        <Link to="/login">
          <Button className="landing-button" type="ghost" size="large" block>
            Log In
          </Button>
        </Link>
        <br />
        <Row>
          <Col offset={3} span={18} />
        </Row>
        <br />
        <Row>
          <Col offset={3} span={18} />
        </Row>
      </div>
    );
  }
}

export default Landing;
