import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';

const { Title } = Typography;
const { Paragraph } = Typography;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
    };
  }

  onSubmit = e => {
    e.preventDefault(); 
  
    this.props.form.validateFields((err, values) => {
      if(!err){
        console.log('User: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div id="surround-form">
        <Title>Log In With Your Account</Title>
        <Paragraph><b>Welcome back!</b> Let's get you up and running.</Paragraph>
        <Form onSubmit={this.onSubmit} className="register-form">
          <Form.Item label="Enter your email:">
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Please enter a valid E-mail!',
              }, {
                required: true, message: 'Please input an E-mail', 
              }],
            })(
              <Input
                prefix={<Icon type="mail" />} 
                placeholder="Email" 
                id="email"    
              />
            )}
          </Form.Item>
          <Form.Item label="Enter your password:">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please Choose a Secure Password!', 
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input
                prefix={<Icon type="lock" />} 
                type="password" 
                placeholder="Password" 
                id="password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"> 
              Login
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
          <Form.Item>
            <Link to='/forgot'>
              Forgot your password?
            </Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const login_form = Form.create()(Login);

export default login_form;

