import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTrip } from "../../actions/tripActions";

import {
  Form,
  Input,
  Button,
  InputNumber,
  Typography
} from "antd";

const { Title, Paragraph } = Typography;



class TripFormBasic extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const tripData = {
          location1: values.location1,
          location2: values.location2,
          startDate: values.startDate,
          endDate: values.endDate,
          seats: values.seats,
          donation: values.donation,
          meeting: values.meeting
        }
        this.props.addTrip(values);
        console.log(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="surround-form">
          <Title>Create a New Trip</Title>
          <Paragraph>
            <b>Make it awesome</b>, invite your friends!
          </Paragraph>
          <br />
        <Form className="Trip-Form-Add" onSubmit={this.handleSubmit}>
          {/* This is where the user enters in the location data of the Form */}
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
          {/* This is where the user enters in various date and times for the trip */}
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
          {/* This is where the user enters in properties about the trip */}
          <Form.Item label="How many seats do you have available? (Enter '0' if you don't have a vehicle)">
            {getFieldDecorator("seats", {
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
            {getFieldDecorator("donation", {
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
            {getFieldDecorator("meeting", {
              rules: [
                {
                  required: true,
                  message:
                    "Please describe the location everyone should meet at for the trip."
                }
              ]
            })(<Input placeholder="Meeting location..." />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Create this Trip!
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const TripForm = Form.create({})(TripFormBasic);

TripForm.propTypes = {
  addTrip: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { addTrip }
)(TripForm);
