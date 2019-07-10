"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const antd_1 = require("antd");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const authActions_1 = require("../../actions/authActions");
const { Title } = antd_1.Typography;
const { Paragraph } = antd_1.Typography;
class Login extends react_1.Component {
    constructor() {
        super();
        this.onSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const userData = {
                        email: values.email,
                        password: values.password
                    };
                    console.log(userData);
                    this.props.loginUser(userData);
                }
            });
        };
        this.placeholder = "Email";
        this.id = "email"
            /  >
        ;
        this.state = {
            confirmDirty: false,
            email: "",
            password: ""
        };
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
        if (nextProps.errors) {
            console.log("THERE WERE ERRORS!");
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return id = "surround-form" >
            Log;
        In;
        With;
        Your;
        Account < /Title>
            < Paragraph >
            Welcome;
        back < /b> Let's get you up and running.
            < /Paragraph>
            < antd_1.Form;
        onSubmit = { this: .onSubmit };
        className = "register-form" >
            label;
        "Enter your email:" >
            { getFieldDecorator(, { rules: [{ type: , "email": , message: , "Please enter a valid E-mail!":  }, { required: , true: , message: , "Please input an E-mail":  }] }) { } }(prefix, {} < antd_1.Icon, type = "mail" /  > );
    }
}
/Form.Item>
    < antd_1.Form.Item;
label = "Enter your password:" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please Choose a Secure Password!":  }, { validator: , this:  }] }) { }, : .validateToNextPassword
    };
prefix = {} < antd_1.Icon;
type = "lock" /  > ;
type = "password";
placeholder = "Password";
id = "password"
    /  >
;
/Form.Item>
    < antd_1.Form.Item >
    Remember;
me < /Checkbox>
    < /Form.Item>
    < antd_1.Form.Item >
    type;
"primary";
htmlType = "submit";
className = "login-form-button"
    >
        Login
    < /Button>;
Or < react_router_dom_1.Link;
to = "/register" > register;
now < /Link>
    < /Form.Item>
    < antd_1.Form.Item >
    to;
"/forgot" > Forgot;
your;
password ? /Link>
    < /Form.Item>
    < /Form>
    < /div>
    :
;
;
const LoginForm = antd_1.Form.create({ name: "login_form" })(Login);
LoginForm.propTypes = {
    loginUser: prop_types_1.default.func.isRequired,
    auth: prop_types_1.default.object.isRequired,
    errors: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
exports.default = react_redux_1.connect(mapStateToProps, { loginUser: authActions_1.loginUser })(LoginForm);
//# sourceMappingURL=Login.js.map