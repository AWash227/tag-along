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
class Register extends react_1.Component {
    constructor() {
        super();
        this.onSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const userData = {
                        name: values.name,
                        username: values.username,
                        profilePicLink: values.profilePicLink,
                        email: values.email,
                        password: values.password,
                        password2: values.password2
                    };
                    console.log(userData);
                    this.props.registerUser(userData, this.props.history);
                }
            });
        };
        this.validateToNextPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
                form.validateFields(["password2"], { force: true });
            }
            callback();
        };
        this.compareToFirstPassword = (rule, value, callback) => {
            const form = this.props.form;
            if (value && value !== form.getFieldValue("password")) {
                callback("Your passwords don't match!");
            }
            else {
                callback();
            }
        };
        this.placeholder = "Name";
        this.id = "name"
            /  >
        ;
        this.state = {
            confirmDirty: false,
            name: "",
            username: "",
            profilePicLink: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return id = "surround-form" >
            Make;
        Your;
        Account < /Title>
            < Paragraph >
            Hey;
        there < /b> Setup your profile and we'll take it from there.
            < /Paragraph>
            < antd_1.Form;
        onSubmit = { this: .onSubmit };
        className = "register-form" >
            label;
        "Enter your name:" >
            { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please enter your name!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "user" /  > );
    }
}
/Form.Item>
    < antd_1.Form.Item;
label = "Pick a username:" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please choose a username!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "at" /  > , addonBefore = "@", placeholder = "Username...", id = "username"
        /  >
    );
/Form.Item>
    < antd_1.Form.Item;
label = "Enter the URL to your profile picture" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please enter the link to your profile picture!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "file-image" /  > , placeholder = "http://facebook.com", id = "profilePicLink"
        /  >
    );
/Form.Item>
    < antd_1.Form.Item;
label = "Enter your Email:" >
    { getFieldDecorator(, { rules: [{ type: , "email": , message: , "Please enter a valid E-mail!":  }, { required: , true: , message: , "Please input an E-mail":  }] }) { } }(prefix, {} < antd_1.Icon, type = "mail" /  > , placeholder = "email", id = "email"
        /  >
    );
/Form.Item>
    < antd_1.Form.Item;
label = "Enter your password" >
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
    < antd_1.Form.Item;
label = "Confirm your password" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please Confirm your password!":  }, { validator: , this:  }] }) { }, : .compareToFirstPassword
    };
prefix = {} < antd_1.Icon;
type = "lock" /  > ;
type = "password";
placeholder = "Confirm Password";
id = "password2"
    /  >
;
/Form.Item>
    < antd_1.Form.Item >
    Remember;
me < /Checkbox>
    < /Form.Item>
    < antd_1.Button;
type = "primary";
htmlType = "submit";
className = "register-form-button"
    >
        Register
    < /Button>;
Or < react_router_dom_1.Link;
to = "/login" > login;
now < /Link>
    < /Form>
    < /div>
    < /div>;
;
const register_form = antd_1.Form.create()(Register);
register_form.propTypes = {
    registerUser: prop_types_1.default.func.isRequired,
    auth: prop_types_1.default.object.isRequired,
    errors: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
exports.default = react_redux_1.connect(mapStateToProps, { registerUser: authActions_1.registerUser })(react_router_dom_1.withRouter(register_form));
//# sourceMappingURL=Register.js.map