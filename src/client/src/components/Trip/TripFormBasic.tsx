import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrip } from "../../actions/tripActions";

import {
  Form,
  Input,
  Button,
  InputNumber,
  Typography,
  Icon,
  Steps
} from "antd";

const { Title, Paragraph } = Typography;
const { Step } = Steps;

class TripFormBasic extends Component {
  handleSubmit = e => {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div id="surround-form">
          <Title>Create a New Trip</Title>
          <Paragraph>
            <b>Make it awesome</b>, invite your friends!
          </Paragraph>
          {/*
          <Steps
            style={{ display: "flex" }}
            direction="horizontal"
            size="small"
            current={0}
          >
            <Step />
            <Step />
            <Step />
          </Steps>

          */}
          <br />
          <Form className="Trip-Form-Add" onSubmit={this.handleSubmit}>
            {/* This is where the user enters in the location data of the Form */}
            <Form.Item label="Where are you going?">
              {getFieldDecorator("destination", {
                rules: [
                  {
                    required: true,
                    message: "Please Type in Where You Are Going!"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="rocket" />}
                  placeholder="Destination..."
                />
              )}
            </Form.Item>
            {/* This is where the user enters in various date and times for the trip */}
            <Form.Item key={1} label="When are you leaving?">
              {getFieldDecorator("startDate", {
                rules: [
                  {
                    required: true,
                    message: "Please select the date you are leaving!"
                  }
                ]
              })(<Input prefix={<Icon type="calendar" />} type="date" />)}
            </Form.Item>
            <Form.Item key={2} label="What time are you leaving?">
              {getFieldDecorator("startTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select the time you are leaving!"
                  }
                ]
              })(<Input prefix={<Icon type="clock-circle" />} type="time" />)}
            </Form.Item>
            <Form.Item key={3} label="When are you coming back?">
              {getFieldDecorator("endDate", {
                rules: [
                  {
                    required: true,
                    message: "Please select the date you are coming back!"
                  }
                ]
              })(<Input prefix={<Icon type="calendar" />} type="date" />)}
            </Form.Item>
            <Form.Item key={4} label="What time are you coming back?">
              {getFieldDecorator("endTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select the time you will be coming back!"
                  }
                ]
              })(<Input prefix={<Icon type="clock-circle" />} type="time" />)}
            </Form.Item>
            {/* This is where the user enters in properties about the trip */}
            <Form.Item label="How many seats do you have available?">
              {getFieldDecorator("seats", {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                    message:
                      "Please input the number of seats you have available in your vehicle."
                  }
                ]
              })(<InputNumber type="number" min={1} max={100} />)}
            </Form.Item>
            <Form.Item label="How much should your friends donate to you for offering a ride?">
              {getFieldDecorator("donation", {
                initialValue: 0,
                rules: [
                  {
                    required: true,
                    message:
                      "Please decide on a recommended donation for your Trip Attendees to pay you."
                  }
                ]
              })(
                <InputNumber
                  min={0}
                  max={999999}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                />
              )}
            </Form.Item>
            <Form.Item label="What location should everyone meet at? (This is private to the Trip attendees)">
              {getFieldDecorator("meeting", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please describe the location everyone should meet at for the trip."
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="environment" />}
                  placeholder="Meeting location..."
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Create this Trip!
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const TripForm = Form.create({})(TripFormBasic);

TripForm.propTypes = {
  addTrip: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addTrip }
)(TripForm);
