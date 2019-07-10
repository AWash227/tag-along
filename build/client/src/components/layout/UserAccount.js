"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const userActions_1 = require("../../actions/userActions");
const { Title, Text } = antd_1.Typography;
class UserAccount extends react_1.Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.username);
        if (this.props.auth.user.username == this.props.match.params.username) {
            this.props.history.push("/account");
        }
    }
    handleFollowClick() {
        this.props.sendRelationshipRequest(this.props.auth.user.id, this.props.user.user);
    }
    render() {
        return style = {};
        {
            marginTop: 60;
        }
    }
}
 >
    id;
"surround-form" >
    user;
{
    this.props.user.user;
}
editable = { false:  };
buttonClick = {}();
this.handleFollowClick;
/>
    < /div>
    < /div>;
;
UserAccount.propTypes = {
    getUser: prop_types_1.default.func.isRequired,
    sendRelationshipRequest: prop_types_1.default.func.isRequired,
    user: prop_types_1.default.object.isRequired,
    auth: prop_types_1.default.object.isRequired,
    history: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps, { getUser: userActions_1.getUser, sendRelationshipRequest: userActions_1.sendRelationshipRequest })(UserAccount);
//# sourceMappingURL=UserAccount.js.map