import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

const { Title } = Typography;
const { Paragraph } = Typography;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If user is logged in, redirect them to the dashboard
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); 
    } 
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors 
      }) 
    } 
  }


  onSubmit = e => {
    e.preventDefault(); 

    this.props.form.validateFields((err, values) => {
      if(!err){
        const userData = {
         name: values.name,
         email: values.email,
         password: values.password,
         password2: values.password2 
        }
        console.log(userData)
        this.props.registerUser(userData, this.props.history);
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
    const { errors } = this.state;
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

register_form.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(register_form));

