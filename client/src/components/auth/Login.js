import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

const { Title } = Typography;
const { Paragraph } = Typography;
class Login extends Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    // If user is logged in, redirect them back to dashboard
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); 
    } 
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard'); // Redirect user to dashboard after login
    } 

    if(nextProps.errors) {
      console.log("THERE WERE ERRORS!");
      this.setState({
        errors: nextProps.errors 
      }); 
    }
  }


  onSubmit = e => {
    e.preventDefault(); 

    this.props.form.validateFields((err, values) => {
      if(!err){
        const userData = {
          email: values.email,
          password: values.password
        }
        console.log(userData)
        this.props.loginUser(userData);
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

const LoginForm = Form.create({name: 'login_form'})(Login)

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);

