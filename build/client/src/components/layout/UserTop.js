"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const { Title, Text, Paragraph } = antd_1.Typography;
class UserTop extends react_1.Component {
    render() {
        return span = { 6:  } >
            style;
        {
            {
                width: "90%", height;
                "90%";
            }
        }
        src = { this: .props.user.profilePicLink }
            /  >
            /Col>
            < antd_1.Col;
        span = { 18:  } >
            span;
        {
            8;
        }
         >
            number;
        {
            this.props.user.trips.length;
        }
        string = { "trips":  }
            /  >
            /Col>
            < antd_1.Col;
        span = { 8:  } >
            number;
        {
            this.props.user.friends.length;
        }
        string = { "friends":  }
            /  >
            /Col>
            < antd_1.Col;
        span = { 8:  } >
            number;
        {
            3;
        }
        string = { "seats":  } /  >
            /Col>
            < /Row>
            < br /  >
            span;
        {
            24;
        }
         >
            { this: .props.editable ? style = {} :  };
        {
            width: "100%";
        }
    }
}
 > Edit;
Profile < /Button>;
type = "primary";
style = {};
{
    width: "100%";
}
onClick = { this: .props.buttonClick }
    >
        Add;
Friend
    < /Button>;
/Col>
    < /Row>
    < /div>
    < /Col>
    < /Row>
    < br /  >
    { this: .props.user.name } < /b>
    < /Text>
    < br /  >
    type;
"secondary" > ;
/Text>
    < /Col>
    < /Row>
    < /div>;
;
exports.default = UserTop;
//# sourceMappingURL=UserTop.js.map