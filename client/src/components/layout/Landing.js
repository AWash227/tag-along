import React, { Component } from 'react';
import { Typography, Button, Badge, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Paragraph } = Typography;

class Landing extends Component {
  render(){
    return(
      <div id='surround-landing'>
        <Title>Tag Along With Your Friends on Fun Trips!</Title>
        <Title level={3}>Make memories, Share experiences, One trip at a time.</Title>
        <br />
        <Row>
          <Col offset={3} span={18}>
          <Link to='/register'>
          <Button
            className='landing-button'
            type="primary" 
            size="large" 
            block
          >
            Make Your Account
          </Button>
          </Link>
          </Col>
        </Row>
          <Badge>or</Badge><br />
        <Row>
          <Col offset={3} span={18}>
          <Link to='/login'>
            <Button 
              className='landing-button'
              type="link" 
              size="large" 
              block
            >
              Log In
            </Button>
            </Link>
          </Col>
        </Row>
      </div>
    ) 
  }
}

export default Landing;
