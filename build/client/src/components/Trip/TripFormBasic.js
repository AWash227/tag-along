"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const prop_types_1 = require("prop-types");
const react_redux_1 = require("react-redux");
const tripActions_1 = require("../../actions/tripActions");
const antd_1 = require("antd");
const { Title, Paragraph } = antd_1.Typography;
const { Step } = antd_1.Steps;
class TripFormBasic extends react_1.Component {
    constructor() {
        super(...arguments);
        this.handleSubmit = e => {
            e.preventDefault();
            const that = this;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    let tripData = {
                        destination: values.destination,
                        startDate: values.startDate,
                        startTime: values.startTime,
                        endDate: values.endDate,
                        endTime: values.endTime,
                        seats: values.seats,
                        donation: values.donation,
                        meeting: values.meeting,
                        owner: that.props.auth.user.id
                    };
                    console.log(that.props.auth.user.id);
                    this.props.addTrip(tripData);
                }
            });
        };
        this.placeholder = "Destination..."
            /  >
        ;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return id = "surround-form" >
            Create;
        a;
        New;
        Trip < /Title>
            < Paragraph >
            Make;
        it;
        awesome < /b>, invite your friends!
            < /Paragraph>;
        {
        }
        />
            < antd_1.Form;
        className = "Trip-Form-Add";
        onSubmit = { this: .handleSubmit } >
            {}
            < antd_1.Form.Item;
        label = "Where are you going?" >
            { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please Type in Where You Are Going!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "rocket" /  > );
    }
}
/Form.Item>;
{ }
key;
{
    1;
}
label = "When are you leaving?" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please select the date you are leaving!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "calendar" /  > , type = "date" /  > );
/Form.Item>
    < antd_1.Form.Item;
key = { 2:  };
label = "What time are you leaving?" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please select the time you are leaving!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "clock-circle" /  > , type = "time" /  > );
/Form.Item>
    < antd_1.Form.Item;
key = { 3:  };
label = "When are you coming back?" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please select the date you are coming back!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "calendar" /  > , type = "date" /  > );
/Form.Item>
    < antd_1.Form.Item;
key = { 4:  };
label = "What time are you coming back?" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please select the time you will be coming back!":  }] }) { } }(prefix, {} < antd_1.Icon, type = "clock-circle" /  > , type = "time" /  > );
/Form.Item>;
{ }
label;
"How many seats do you have available?" >
    { getFieldDecorator(, { initialValue: , 1: , rules: [{ required: , true: , message: , "Please input the number of seats you have available in your vehicle.":  }] }) { } }(type, "number", min = { 1:  }, max = { 100:  } /  > );
/Form.Item>
    < antd_1.Form.Item;
label = "How much should your friends donate to you for offering a ride?" >
    { getFieldDecorator(, { initialValue: , 0: , rules: [{ required: , true: , message: , "Please decide on a recommended donation for your Trip Attendees to pay you.":  }] }) { } }(min, { 0:  }, max = { 999999:  }, formatter = { value } `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","), parser = { value, value, : .replace(/\$\s?|(,*)/g, "") }
        /  >
    );
/Form.Item>
    < antd_1.Form.Item;
label = "What location should everyone meet at? (This is private to the Trip attendees)" >
    { getFieldDecorator(, { rules: [{ required: , true: , message: , "Please describe the location everyone should meet at for the trip.":  }] }) { } }(prefix, {} < antd_1.Icon, type = "environment" /  > , placeholder = "Meeting location..."
        /  >
    );
/Form.Item>
    < antd_1.Form.Item >
    htmlType;
"submit";
type = "primary" >
    Create;
this;
Trip
    < /Button>
    < /Form.Item>
    < /Form>
    < /div>
    < /div>;
;
const TripForm = antd_1.Form.create({})(TripFormBasic);
TripForm.propTypes = {
    addTrip: prop_types_1.default.func.isRequired,
    trip: prop_types_1.default.object.isRequired,
    auth: prop_types_1.default.object.isRequired
};
const mapStateToProps = state => ({
    trip: state.trip,
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps, { addTrip: tripActions_1.addTrip })(TripForm);
//# sourceMappingURL=TripFormBasic.js.map