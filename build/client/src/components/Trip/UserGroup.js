"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const prop_types_1 = require("prop-types");
class UserGroup extends react_1.Component {
    render() {
        const userFaces = this.props.users.map((user) => {
            return trigger = "click";
            title = { user, : .name } >
                className;
            "face-group-avatar";
            src = { user, : .profilePicLink } /  >
                /Tooltip>;
        });
    }
}
 >
    { userFaces }
    < /div>
    < /div>;
UserGroup.propTypes = {
    users: prop_types_1.default.arrayOf(prop_types_1.default.object)
};
exports.default = UserGroup;
//# sourceMappingURL=UserGroup.js.map