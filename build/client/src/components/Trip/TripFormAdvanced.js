"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const tripActions_1 = require("../../actions/tripActions");
const antd_1 = require("antd");
const Step = antd_1.Steps.Step;
const { Title, Paragraph } = antd_1.Typography;
const Panel = antd_1.Collapse.Panel;
class DateForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: ""
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return key = { 1:  };
        label = "Start date" >
            { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please select a starting date.":  }] }) { } }(type, "date" /  > );
    }
}
/Form.Item>
    < antd_1.Form.Item;
key = { 2:  };
label = "Start time" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please choose a time for the trip to start.":  }] }) { } }(type, "time" /  > );
/Form.Item>
    < antd_1.Form.Item;
key = { 3:  };
label = "End date" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please select an ending date.":  }] }) { } }(type, "date" /  > );
/Form.Item>
    < antd_1.Form.Item;
key = { 4:  };
label = "End time" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please choose a time for the trip to end.":  }] }) { } }(type, "time" /  > );
/Form.Item>
    < /div>;
;
class PropertyForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            seats: 0,
            donation: 0,
            meeting: ""
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return label = "How many seats do you have available? (Enter '0' if you don't have a vehicle)" >
            { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please input the number of seats you have available in your vehicle.":  }] }) { } }(type, "number", min = { 0:  }, max = { 100:  } /  > );
    }
}
/Form.Item>
    < antd_1.Form.Item;
label = "What is the recommended donation for trip attendees?" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please decide on a recommended donation for your Trip Attendees to pay you.":  }] }) { } }(type, "number" /  > );
/Form.Item>
    < antd_1.Form.Item;
label = "What location should everyone meet at? (This is private to the Trip attendees)" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please describe the location everyone should meet at for the trip.":  }] }) { } }(placeholder, "Meeting location..." /  > );
/Form.Item>
    < /div>;
;
class LocationForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            location1: "",
            address1: "",
            location2: "",
            address2: ""
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return label = "Enter your First Location" >
            { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please Type in Your First Location.":  }] }) { } }(placeholder, "First location..." /  > );
    }
}
/Form.Item>
    < antd_1.Form.Item;
label = "Enter your Second Location" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please Type in Your Second Location.":  }] }) { } }(placeholder, "Second location..." /  > );
/Form.Item>
    < /div>;
;
const LocationsForm = antd_1.Form.create({})(LocationForm);
const DatesForm = antd_1.Form.create({})(DateForm);
const PropertiesForm = antd_1.Form.create({})(PropertyForm);
class TripForm extends react_1.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            newLocations: {},
            newProperties: {}
        };
    }
    next() {
        if (this.state.current === 0) {
            this.props.form.validateFieldsAndScroll(["location1", "location2", "address1", "address2"], (err, values) => {
                if (!err) {
                    this.props.addTrip1(values);
                    console.log(values);
                    const newLocations = {
                        location1: values.location1,
                        location2: values.location2,
                        address1: values.address1,
                        address2: values.address2
                    };
                    this.setState({ newLocations });
                    const current = this.state.current + 1;
                    this.setState({ current });
                }
            });
        }
        if (this.state.current === 1) {
            this.props.form.validateFieldsAndScroll(["startDate", "startTime", "endDate", "endTime"], (err, values) => {
                if (!err) {
                    this.props.addTrip2(values);
                    console.log(values);
                    const current = this.state.current + 1;
                    this.setState({ current });
                }
            });
        }
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    onSubmit() {
        if (this.state.current === 2) {
            this.props.form.validateFieldsAndScroll(["seats", "donation", "meeting"], (err, values) => {
                if (!err) {
                    console.log(values);
                    this.props.addTrip3(values);
                    this.props.addTrip(this.props.trips.trip);
                }
            });
        }
    }
    render() {
        let steps = [
            {
                title: "Where?",
                content: form
            }, { this: .props.form } /  >
        ];
    }
}
{
    title: "When?",
        content;
    form;
    {
        this.props.form;
    }
    />;
}
{
    title: "What?",
        content;
    form;
    {
        this.props.form;
    }
    />;
}
;
const { current } = this.state;
return id = "surround-form" >
    Create;
a;
New;
Trip < /Title>
    < Paragraph >
    Make;
it;
awesome < /b>, invite your friends!
    < /Paragraph>
    < br /  >
    style;
{
    {
        backgroundColor: "#fff";
    }
}
 >
    className;
"steps";
theme = "light";
width = "20px";
style = {};
{
    marginRight: 5;
}
    >
        style;
{
    {
        float: "left";
    }
}
direction = "vertical";
size = "small";
progressDot;
current = { current }
    >
        { steps, : .map(item => key = { item, : .title } /  >
            ) }
    < /Steps>
    < /Layout.Sider>
    < antd_1.Layout.Content >
    { steps, [current]: .content }
    < div;
className = "steps-action" >
    { : .length - 1 && type, "primary": onClick = {}(), this: .next() } >
    Next
    < /Button>;
{
    current === steps.length - 1 && type;
    "primary";
    onClick = {}();
    this.onSubmit();
}
 >
    Finish
    < /Button>;
/div>;
{
    current > 0 && style;
    {
        {
            marginLeft: 8;
        }
    }
    onClick = {}();
    this.prev();
}
 >
    Previous
    < /Button>;
/Form>
    < /Layout.Content>
    < /Layout>
    < /Form>
    < /div>;
;
const TripsForm = antd_1.Form.create({})(TripForm);
TripsForm.propTypes = {
    addTrip: prop_types_1.default.func.isRequired,
    addTrip1: prop_types_1.default.func.isRequired,
    addTrip2: prop_types_1.default.func.isRequired,
    addTrip3: prop_types_1.default.func.isRequired,
    trips: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    trips: state.trips
});
exports.default = react_redux_1.connect(mapStateToProps, { addTrip: tripActions_1.addTrip })(TripsForm);
//# sourceMappingURL=TripFormAdvanced.js.map