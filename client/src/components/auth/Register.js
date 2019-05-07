import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';

const { Title } = Typography;
const { Paragraph } = Typography;

class Register extends Component {
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
        console.log('New user: ', values);
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if(value && this.state.confirmDirty){
      form.validateFields(['password2'], { force: true }) 
    } 

    callback();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if(value && value !== form.getFieldValue('password')){
      callback('Your passwords don\'t match!'); 
    } else {
      callback(); 
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div id="surround-form">
        <Title>Make Your Account</Title>
        <Paragraph><b>Hey there!</b> Setup your profile and we'll take it from there.</Paragraph>
        <Form onSubmit={this.onSubmit} className="register-form">
          <Form.Item label='Enter your name:'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please enter your name!' }],
            })(
              <Input 
                  prefix={<Icon type="user" />} 
                  placeholder="Name" 
                  id="name"
                
                />
            )}
          </Form.Item>
          <Form.Item label='Enter your Email:'>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Please enter a valid E-mail!',
              }, {
                required: true, message: 'Please input an E-mail', 
              }],
            })(
              <Input
                prefix={<Icon type="mail" />} 
                placeholder="email" 
                id="email"    
              />
            )}
          </Form.Item>
          <Form.Item label='Enter your password'>
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
          <Form.Item label='Confirm your password'>
            {getFieldDecorator('password2', {
              rules: [{
                required: true, message: 'Please Confirm your password!', 
              }, {
                validator: this.compareToFirstPassword, 
              }],
            })(
              <Input 
                prefix={<Icon type="lock" />} 
                type="password" 
                placeholder="Confirm Password" 
                id="password2"
                
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button"> 
            Register
          </Button>
          Or <Link to="/login">login now!</Link>
        </Form>
      </div>
    )
  }
}
const register_form = Form.create()(Register);

export default register_form;

