import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addTrip,
} from "../../actions/tripActions";

import {
  Form,
  Steps,
  Input,
  Button,
  InputNumber,
  TimePicker,
  DatePicker,
  Icon,
  Checkbox,
  List,
  Popover,
  Typography,
  Layout,
  Collapse,
  message
} from "antd";

const Step = Steps.Step;
const { Title, Paragraph } = Typography;
const Panel = Collapse.Panel;

class DateForm extends Component {
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
    return (
      <div>
        <Form.Item key={1} label="Start date">
          {getFieldDecorator("startDate", {
            rules: [
              {
                required: true,
                message: "Please select a starting date."
              }
            ]
          })(<Input type="date" />)}
        </Form.Item>
        <Form.Item key={2} label="Start time">
          {getFieldDecorator("startTime", {
            rules: [
              {
                required: true,
                message: "Please choose a time for the trip to start."
              }
            ]
          })(<Input type="time" />)}
        </Form.Item>
        <Form.Item key={3} label="End date">
          {getFieldDecorator("endDate", {
            rules: [
              {
                required: true,
                message: "Please select an ending date."
              }
            ]
          })(<Input type="date" />)}
        </Form.Item>
        <Form.Item key={4} label="End time">
          {getFieldDecorator("endTime", {
            rules: [
              {
                required: true,
                message: "Please choose a time for the trip to end."
              }
            ]
          })(<Input type="time" />)}
        </Form.Item>
      </div>
    );
  }
}

class PropertyForm extends Component {
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
    return (
      <div>
        <Form.Item label="How many seats do you have available? (Enter '0' if you don't have a vehicle)">
          {getFieldDecorator("Available_Seats", {
            rules: [
              {
                required: true,
                message:
                  "Please input the number of seats you have available in your vehicle."
              }
            ]
          })(<InputNumber type="number" min={0} max={100} />)}
        </Form.Item>
        <Form.Item label="What is the recommended donation for trip attendees?">
          {getFieldDecorator("Donation", {
            rules: [
              {
                required: true,
                message:
                  "Please decide on a recommended donation for your Trip Attendees to pay you."
              }
            ]
          })(<InputNumber type="number" />)}
        </Form.Item>
        <Form.Item label="What location should everyone meet at? (This is private to the Trip attendees)">
          {getFieldDecorator("Meeting_Loc", {
            rules: [
              {
                required: true,
                message:
                  "Please describe the location everyone should meet at for the trip."
              }
            ]
          })(<Input placeholder="Meeting location..." />)}
        </Form.Item>
      </div>
    );
  }
}

class LocationForm extends Component {
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
    return (
      <div>
        <Form.Item label="Enter your First Location">
          {getFieldDecorator("location1", {
            rules: [
              {
                required: true,
                message: "Please Type in Your First Location."
              }
            ]
          })(<Input placeholder="First location..." />)}
        </Form.Item>
        <Form.Item label="Enter your Second Location">
          {getFieldDecorator("location2", {
            rules: [
              {
                required: true,
                message: "Please Type in Your Second Location."
              }
            ]
          })(<Input placeholder="Second location..." />)}
        </Form.Item>
      </div>
    );
  }
}

const LocationsForm = Form.create({})(LocationForm);
const DatesForm = Form.create({})(DateForm);
const PropertiesForm = Form.create({})(PropertyForm);

class TripForm extends Component {
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
      this.props.form.validateFieldsAndScroll(
        ["location1", "location2", "address1", "address2"],
        (err, values) => {
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
        }
      );
    }
    if (this.state.current === 1) {
      this.props.form.validateFieldsAndScroll(
        ["startDate", "startTime", "endDate", "endTime"],
        (err, values) => {
          if (!err) {
            this.props.addTrip2(values);
            console.log(values);
            const current = this.state.current + 1;
            this.setState({ current });
          }
        }
      );
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onSubmit() {
    if (this.state.current === 2) {
      this.props.form.validateFieldsAndScroll(
        ["seats", "donation", "meeting"],
        (err, values) => {
          if (!err) {
            console.log(values);
            this.props.addTrip3(values);
            this.props.addTrip(this.props.trips.trip);
          }
        }
      );
    }
  }

  render() {
    let steps = [
      {
        title: "Where?",
        content: <LocationsForm form={this.props.form} />
      },
      {
        title: "When?",
        content: <DatesForm form={this.props.form} />
      },
      {
        title: "What?",
        content: <PropertiesForm form={this.props.form} />
      }
    ];
    const { current } = this.state;
    return (
      <div id="surround-form">
        <Form>
          <Title>Create a New Trip</Title>
          <Paragraph>
            <b>Make it awesome</b>, invite your friends!
          </Paragraph>
          <br />
          <Layout style={{ backgroundColor: "#fff" }}>
            <Layout.Sider
              className="steps"
              theme="light"
              width="20px"
              style={{ marginRight: 5 }}
            >
              <Steps
                style={{ float: "left" }}
                direction="vertical"
                size="small"
                progressDot
                current={current}
              >
                {steps.map(item => (
                  <Step key={item.title} />
                ))}
              </Steps>
            </Layout.Sider>
            <Layout.Content>
              <Form>
                {steps[current].content}

                <div className="steps-action">
                  {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => this.next()}>
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => this.onSubmit()}>
                      Finish
                    </Button>
                  )}
                </div>
                {current > 0 && (
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                  </Button>
                )}
              </Form>
            </Layout.Content>
          </Layout>
        </Form>
      </div>
    );
  }
}
const TripsForm = Form.create({})(TripForm);

TripsForm.propTypes = {
  addTrip: PropTypes.func.isRequired,
  addTrip1: PropTypes.func.isRequired,
  addTrip2: PropTypes.func.isRequired,
  addTrip3: PropTypes.func.isRequired,
  trips: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trips: state.trips
});

export default connect(
  mapStateToProps,
  { addTrip }
)(TripsForm);
