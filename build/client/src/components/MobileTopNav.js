"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const antd_1 = require("antd");
const { Title } = antd_1.Typography;
class MobileTopNav extends react_1.Component {
    render() {
        return className = "mobile-top-nav";
        mode = "horizontal";
        style = {};
        {
            textAlign: "center";
        }
    }
}
    >
        key;
"back";
onClick = {}();
{
    window.history.back();
}
style = {};
{
    float: "left", textAlign;
    "center";
}
    >
        type;
"left" /  >
    /Menu.Item>
    < antd_1.Menu.Item;
key = "Title" >
    to;
"/dashboard" >
    style;
{
    {
        paddingLeft: 0, marginLeft;
        0;
    }
}
level = { 4:  } >
    Tag;
Along
    < /Title>
    < /Link>
    < /Menu.Item>
    < antd_1.Menu.Item;
key = "account";
style = {};
{
    float: "right", textAlign;
    "center";
}
    >
        to;
{
    "/account";
}
 >
    src;
{
    this.props.auth.user.profilePicLink;
}
/>
    < /Link>
    < /Menu.Item>
    < /Menu>;
;
MobileTopNav.propTypes = {
    auth: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps)(MobileTopNav);
//# sourceMappingURL=MobileTopNav.js.map